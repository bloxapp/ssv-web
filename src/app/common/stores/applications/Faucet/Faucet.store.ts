import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import config from '~app/common/config';
import BaseStore from '~app/common/stores/BaseStore';
import WalletStore from '~app/common/stores/applications/Faucet/Wallet.store';
import translations from '../../../config/translations';
import { getStoredNetwork } from '~root/providers/networkInfo.provider';

const { faucetApi } = getStoredNetwork();

class FaucetStore extends BaseStore {
    amountToTransfer: any;
    pendingTransaction: any;
    addressTransactions: any;

    constructor() {
        // TODO: [mobx-undecorate] verify the constructor arguments and the arguments of this automatically generated super call
        super();

        makeObservable(this, {
            amountToTransfer: observable,
            pendingTransaction: observable,
            addressTransactions: observable,
            getLatestTransactions: action.bound,
            registerNewTransaction: action.bound,
            registerSSVTokenInMetamask: action.bound,
        });
    }

    async registerNewTransaction() {
      const { networkId, apiVersion } = getStoredNetwork();
        try {
            const walletStore: WalletStore = this.getStore('Wallet');
            this.pendingTransaction = await axios.post(faucetApi, { owner_address: walletStore.accountAddress, network: networkId, version: apiVersion });
            return { status: true };
        } catch (e: any) {
            return { status: false, type: e.response.data.error.message === translations.FAUCET.REACHED_MAX_TRANSACTIONS ? translations.FAUCET.REACHED_MAX_TRANSACTIONS : translations.FAUCET.FAUCET_DEPLETED };
        }
    }

    async getLatestTransactions() {
        try {
            const walletStore: WalletStore = this.getStore('Wallet');
            this.pendingTransaction = await axios.get(faucetApi, { params: { owner_address: walletStore.accountAddress } });
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * @url https://docs.metamask.io/guide/registering-your-token.html
     */
    registerSSVTokenInMetamask() {
        return new Promise((resolve, reject) => {
            return this.getStore('Wallet').web3.currentProvider.send({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: config.CONTRACTS.SSV_TOKEN.ADDRESS,
                        symbol: 'SSV',
                        decimals: 18,
                    },
                },
            }, (error: any, success: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(success);
                }
            });
        }).then((success: any) => {
            if (!success) {
                this.getStore('Notifications')
                    .showMessage('Can not add SSV to wallet!', 'error');
            }
        }).catch((error: any) => {
            console.error('Can not add SSV token to wallet', error);
            this.getStore('Notifications')
                .showMessage(`Can not add SSV to wallet: ${error.message}`, 'error');
        });
    }
}

export default FaucetStore;
