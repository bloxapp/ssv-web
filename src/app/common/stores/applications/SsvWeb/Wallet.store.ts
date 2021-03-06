import Web3 from 'web3';
import Notify from 'bnc-notify';
import Onboard from 'bnc-onboard';
import { Contract } from 'web3-eth-contract';
import { action, computed, observable } from 'mobx';
import config from '~app/common/config';
import Operator from '~lib/api/Operator';
import Validator from '~lib/api/Validator';
import ApiParams from '~lib/api/ApiParams';
import BaseStore from '~app/common/stores/BaseStore';
import Wallet from '~app/common/stores/Abstracts/Wallet';
import { wallets } from '~app/common/stores/utilis/wallets';
import Application from '~app/common/stores/Abstracts/Application';
import SsvStore from '~app/common/stores/applications/SsvWeb/SSV.store';
import OperatorStore from '~app/common/stores/applications/SsvWeb/Operator.store';
import NotificationsStore from '~app/common/stores/applications/SsvWeb/Notifications.store';

class WalletStore extends BaseStore implements Wallet {
    @observable web3: any = null;
    @observable wallet: any = null;
    @observable notifySdk: any = null;
    @observable onboardSdk: any = null;
    @observable accountAddress: string = '';
    @observable wrongNetwork: boolean = false;
    @observable networkId: number | null = null;
    @observable accountDataLoaded: boolean = false;

    private contract: Contract | undefined;
    private ssvStore: SsvStore = this.getStore('SSV');
    private operatorStore: OperatorStore = this.getStore('Operator');
    private notificationsStore: NotificationsStore = this.getStore('Notifications');

    constructor() {
        super();
        this.initWalletHooks();
    }

    /**
     * Initialize SDK
     * @url https://docs.blocknative.com/onboard#initialization
     */
    @action.bound
    initWalletHooks() {
        if (this.onboardSdk) return;
        const connectionConfig = {
            dappId: config.ONBOARD.API_KEY,
            networkId: this.networkId || Number(config.ONBOARD.NETWORK_ID),
            walletSelect: {
                wallets,
            },
            subscriptions: {
                wallet: this.walletHandler,
                address: this.addressHandler,
                network: this.networkHandler,
                balance: this.balanceHandler,
            },
        };
        console.debug('OnBoard SDK Config:', connectionConfig);
        this.onboardSdk = Onboard(connectionConfig);
        const notifyOptions = {
            dappId: config.ONBOARD.API_KEY,
            networkId: this.networkId || Number(config.ONBOARD.NETWORK_ID),
            desktopPosition: 'topRight',
        };
        // @ts-ignore
        this.notifySdk = Notify(notifyOptions);
    }

    /**
     * Initialize Account data from contract
     */
    @action.bound
    async initializeUserInfo() {
        await this.operatorStore.validatorsPerOperatorLimit();
        if (process.env.REACT_APP_NEW_STAGE) {
            await this.ssvStore.initUser();
        }
    }

    /**
     * Check wallet cache and connect
     */
    @action.bound
    async connectWalletFromCache() {
        const selectedWallet: any = window.localStorage.getItem('selectedWallet');
        if (selectedWallet && selectedWallet !== 'undefined') {
            await this.onboardSdk.walletSelect(selectedWallet);
            await this.onboardSdk.walletCheck();
        } else {
            const applicationStore: Application = this.getStore('Application');
            applicationStore.strategyRedirect = '/';
            await this.resetUser();
            this.setAccountDataLoaded(true);
        }
    }

    /**
     * Connect wallet
     */
    @action.bound
    async connect() {
        try {
            console.debug('Connecting wallet..');
            await this.onboardSdk.walletSelect();
            await this.onboardSdk.walletCheck();
        } catch (error: any) {
            const message = error.message ?? 'Unknown errorMessage during connecting to wallet';
            this.notificationsStore.showMessage(message, 'error');
            console.error('Connecting to wallet error:', message);
            return false;
        }
    }

    /**
     * User address handler
     * @param address: string
     */
    @action.bound
    async addressHandler(address: string) {
        this.setAccountDataLoaded(false);
        const applicationStore: Application = this.getStore('Application');
        if (address === undefined || !this.wallet?.name) {
            await this.resetUser();
        } else {
            this.accountAddress = address;
            ApiParams.cleanStorage();
            await this.initializeUserInfo();
            if (process.env.REACT_APP_NEW_STAGE) {
                const operatorsResponse = await Operator.getInstance().getOperatorsByOwnerAddress(1, 5, address, true);
                const validatorsResponse = await Validator.getInstance().getValidatorsByOwnerAddress(1, 5, address, true);
                applicationStore.strategyRedirect = operatorsResponse.operators.length || validatorsResponse.validators.length ? '/dashboard' : '/';
            }
        }
        this.setAccountDataLoaded(true);
    }

    @action.bound
    async resetUser() {
        const applicationStore: Application = this.getStore('Application');
        this.accountAddress = '';
        this.ssvStore.clearSettings();
        applicationStore.strategyRedirect = '/';
        this.onboardSdk.walletReset();
        window.localStorage.removeItem('selectedWallet');
        window.localStorage.removeItem('params');
    }

    /**
     * Callback for connected wallet
     * @param wallet: any
     */
    @action.bound
    async walletHandler(wallet: any) {
        this.wallet = wallet;
        this.web3 = new Web3(wallet.provider);
        console.debug('Wallet Connected:', wallet);
        window.localStorage.setItem('selectedWallet', wallet.name);
    }

    /**
     * Fetch user balances and fees
     */
    @action.bound
    async balanceHandler(balance: any) {
        if (balance) await this.initializeUserInfo();
    }

    /**
     * User Network handler
     * @param networkId: any
     */
    @action.bound
    async networkHandler(networkId: any) {
        this.networkId = networkId;
        if (networkId !== 5 && networkId !== undefined) {
            this.wrongNetwork = true;
            this.notificationsStore.showMessage('Please change network to Goerli', 'error');
        } else {
            this.wrongNetwork = false;
        }
    }

    /**
     * encode key
     * @param key
     */
    @action.bound
    encodeKey(key?: string) {
        if (!key) return '';
        return this.web3?.eth.abi.encodeParameter('string', key);
    }

    /**
     * decode key
     * @param key
     */
    @action.bound
    decodeKey(key?: string) {
        if (!key) return '';
        return this.web3?.eth.abi.decodeParameter('string', key);
    }

    /**
     * Set Account loaded
     * @param status: boolean
     */
    @action.bound
    setAccountDataLoaded = (status: boolean): void => {
        this.accountDataLoaded = status;
    };

    @computed
    get connected() {
        return this.accountAddress;
    }

    @computed
    get isWrongNetwork(): boolean {
        return this.wrongNetwork;
    }

    @computed
    get getContract(): Contract {
        if (!this.contract) {
            const abi: any = process.env.REACT_APP_NEW_STAGE ? config.CONTRACTS.SSV_NETWORK.ABI : config.CONTRACTS.SSV_NETWORK.OLD_ABI;
            const contractAddress: string = config.CONTRACTS.SSV_NETWORK.ADDRESS;
            this.contract = new this.web3.eth.Contract(abi, contractAddress);
        }
        // @ts-ignore
        return this.contract;
    }
}

export default WalletStore;
