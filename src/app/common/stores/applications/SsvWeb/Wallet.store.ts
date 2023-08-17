import Web3 from 'web3';
import Notify from 'bnc-notify';
import Onboard from '@web3-onboard/core';
import { Contract } from 'web3-eth-contract';
import injectedModule from '@web3-onboard/injected-wallets';
import { action, computed, observable, makeObservable } from 'mobx';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import { getImage } from '~lib/utils/filePath';
import { roundNumber } from '~lib/utils/numbers';
import BaseStore from '~app/common/stores/BaseStore';
import Wallet from '~app/common/stores/Abstracts/Wallet';
import Application from '~app/common/stores/Abstracts/Application';
import SsvStore from '~app/common/stores/applications/SsvWeb/SSV.store';
import OperatorStore from '~app/common/stores/applications/SsvWeb/Operator.store';
import MyAccountStore from '~app/common/stores/applications/SsvWeb/MyAccount.store';
import NotificationsStore from '~app/common/stores/applications/SsvWeb/Notifications.store';
import { changeCurrentNetwork, getCurrentNetwork, NetworkDataType, NETWORKS, NETWORKS_DATA } from '~lib/utils/envHelper';

const WALLET_CONNECTED = 'WalletConnected';

const GOERLI_NETWORK_ID = 5;

const TOKEN_NAMES = {
  [NETWORKS.MAINNET]: 'ETH',
  [NETWORKS.GOERLI]: 'GoerliETH',
};

class WalletStore extends BaseStore implements Wallet {
  web3: any = null;
  wallet: any = null;
  notifySdk: any = null;
  onboardSdk: any = null;
  accountAddress: string = '';
  wrongNetwork: boolean = false;
  networkId: number | null = null;
  accountDataLoaded: boolean = false;
  private viewContract: Contract | undefined;
  private networkContract: Contract | undefined;
  private ssvStore: SsvStore = this.getStore('SSV');
  private operatorStore: OperatorStore = this.getStore('Operator');
  private notificationsStore: NotificationsStore = this.getStore('Notifications');

  constructor() {
    super();
    makeObservable(this, {
      web3: observable,
      wallet: observable,
      connected: computed,
      toWei: action.bound,
      networkId: observable,
      notifySdk: observable,
      connect: action.bound,
      fromWei: action.bound,
      onboardSdk: observable,
      decodeKey: action.bound,
      resetUser: action.bound,
      encodeKey: action.bound,
      isWrongNetwork: computed,
      wrongNetwork: observable,
      getterContract: computed,
      setterContract: computed,
      accountAddress: observable,
      initWalletHooks: action.bound,
      accountDataLoaded: observable,
      initializeUserInfo: action.bound,
      setAccountDataLoaded: action.bound,
      checkConnectedWallet: action.bound,
      onBalanceChangeCallback: action.bound,
      onNetworkChangeCallback: action.bound,
      onWalletConnectedCallback: action.bound,
      onAccountAddressChangeCallback: action.bound,
    });
    this.initWalletHooks();
  }

  BN(s: any) {
    return new this.web3.utils.BN(s);
  }

  /**
   * Initialize SDK
   * @url https://docs.blocknative.com/onboard#initialization
   */
  initWalletHooks() {
    const injected = injectedModule();
    const theme = window.localStorage.getItem('isDarkMode') === '1' ? 'dark' : 'light';

    this.onboardSdk = Onboard({
      theme: theme,
      apiKey: config.ONBOARD.API_KEY,
      wallets: [injected],
      disableFontDownload: true,
      connect: {
        autoConnectLastWallet: true,
        showSidebar: false,
        removeIDontHaveAWalletInfoLink: true,
        removeWhereIsMyWalletWarning: true,
      },
      notify: {
        enabled: false,
      },
      accountCenter: {
        mobile: {
          enabled: false,
        },
        desktop: {
          enabled: false,
        },
      },
      chains: [
        {
          id: NETWORKS.MAINNET,
          token: TOKEN_NAMES[NETWORKS.MAINNET],
          label: 'Ethereum Mainnet',
        },
        {
          id: NETWORKS.GOERLI,
          token: TOKEN_NAMES[NETWORKS.GOERLI],
          label: 'Goerli testnet',
        },
      ],
      appMetadata: {
        name: 'SSV Network',
        icon: getImage('ssvIcons/logo.svg'),
        logo: getImage('ssvIcons/logo.svg'),
        description: 'SSV Network',
        recommendedInjectedWallets: [
          { name: 'MetaMask', url: 'https://metamask.io' },
        ],
      },
    });

    const wallets = this.onboardSdk.state.select('wallets');
    wallets.subscribe(async (update: any) => {
      if (update.length > 0) {
        const networkId = update[0]?.chains[0]?.id?.replace('0x', '');
        const balance = update[0]?.accounts[0]?.balance ? update[0]?.accounts[0]?.balance[TOKEN_NAMES[networkId]] : undefined;
        const wallet = update[0];
        const address = update[0]?.accounts[0]?.address;
        await this.onWalletConnectedCallback(wallet);
        this.onNetworkChangeCallback(Number(networkId));
        await this.onBalanceChangeCallback(balance);
        await this.onAccountAddressChangeCallback(address);
      }
      else if (this.accountAddress && update.length === 0) {
        await this.onAccountAddressChangeCallback(undefined);
      }
    });

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
  async initializeUserInfo() {
    try {
      // await this.operatorStore.validatorsPerOperatorLimit();
      await this.ssvStore.initUser();
      await this.operatorStore.initUser();
    } catch (e: any) {
      console.log(e.message);
    }
  }

  fromWei(amount?: number | string): number {
    if (!amount) return 0;
    if (typeof amount === 'number' && amount === 0) return 0;
    if (typeof amount === 'string' && Number(amount) === 0) return 0;

    return parseFloat(this.web3.utils.fromWei(amount.toString(), 'ether'));
  }

  async changeNetwork(networkId: string | number) {
    await this.onboardSdk.setChain({ chainId: `0x${networkId}` });
  }

  toWei(amount?: number | string): string {
    if (!amount) return '0';
    // eslint-disable-next-line no-param-reassign
    if (typeof amount === 'number') amount = roundNumber(amount, 16);
    // eslint-disable-next-line no-param-reassign
    if (typeof amount === 'string') amount = amount.slice(0, 16);
    return this.web3.utils.toWei(amount.toString(), 'ether');
  }
  /**
   * Check wallet cache and connect
   */
  async checkConnectedWallet() {
    const walletConnected = window.localStorage.getItem(WALLET_CONNECTED);
    if (!walletConnected || walletConnected && !JSON.parse(walletConnected)){
      await this.onAccountAddressChangeCallback(undefined);
    }
  }

  /**
   * Connect wallet
   */
  async connect() {
    try {
      console.debug('Connecting wallet..');
      const result = await this.onboardSdk.connectWallet();
      if (result?.length > 0) {
        const networkId = result[0].chains[0].id.replace('0x', '');
        const balance = result[0].accounts[0].balance[TOKEN_NAMES[networkId]];
        const wallet = result[0];
        const address = result[0].accounts[0].address;
        await this.onWalletConnectedCallback(wallet);
        this.onNetworkChangeCallback(Number(networkId));
        await this.onBalanceChangeCallback(balance);
        await this.onAccountAddressChangeCallback(address);
      }
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
  async onAccountAddressChangeCallback(address: string | undefined) {
    this.setAccountDataLoaded(false);
    const applicationStore: Application = this.getStore('Application');
    const myAccountStore: MyAccountStore = this.getStore('MyAccount');
    const ssvStore: SsvStore = this.getStore('SSV');
    window.localStorage.setItem(WALLET_CONNECTED, JSON.stringify(!!address));
    if (address === undefined || !this.wallet?.label) {
      ssvStore.clearUserSyncInterval();
      await this.resetUser();
      setTimeout(() => {
        this.setAccountDataLoaded(true);
      }, 1000);
    } else {
      this.ssvStore.clearSettings();
      myAccountStore.clearIntervals();
      this.accountAddress = address;
      ApiParams.cleanStorage();
      await Promise.all([
        this.initializeUserInfo(),
        myAccountStore.getOwnerAddressOperators({}),
        myAccountStore.getOwnerAddressClusters({}),
      ]);
      if (myAccountStore?.ownerAddressClusters?.length) {
        applicationStore.strategyRedirect = config.routes.SSV.MY_ACCOUNT.CLUSTER_DASHBOARD;
      } else if (myAccountStore?.ownerAddressOperators?.length) {
        applicationStore.strategyRedirect = config.routes.SSV.MY_ACCOUNT.OPERATOR_DASHBOARD;
      } else {
        applicationStore.strategyRedirect = config.routes.SSV.ROOT;
      }
      if (!myAccountStore?.ownerAddressOperators?.length || !myAccountStore?.ownerAddressClusters?.length) myAccountStore.forceBigList = true;
      myAccountStore.setIntervals();
      this.setAccountDataLoaded(true);
    }
  }

  async resetUser() {
    const myAccountStore: MyAccountStore = this.getStore('MyAccount');
    const applicationStore: Application = this.getStore('Application');
    this.accountAddress = '';
    this.ssvStore.clearSettings();
    this.operatorStore.clearSettings();
    myAccountStore.clearIntervals();
    window.localStorage.removeItem('params');
    window.localStorage.removeItem('selectedWallet');
    applicationStore.strategyRedirect = config.routes.SSV.ROOT;
  }

  /**
   * Callback for connected wallet
   * @param wallet: any
   */
  async onWalletConnectedCallback(wallet: any) {
    this.wallet = wallet;
    this.web3 = new Web3(wallet.provider);
    console.debug('Wallet Connected:', wallet);
  }

  /**
   * Fetch user balances and fees
   */
  async onBalanceChangeCallback(balance: any) {
    if (balance) await this.initializeUserInfo();
  }

  /**
   * User Network handler
   * @param networkId: any
   */
  onNetworkChangeCallback(networkId: any) {
    const notIncludeMainnet = NETWORKS_DATA.every((network: NetworkDataType) => network.networkId !== NETWORKS.MAINNET);
    changeCurrentNetwork(Number(networkId));
    this.networkId = networkId;
    if (notIncludeMainnet && networkId !== GOERLI_NETWORK_ID && networkId !== undefined) {
      this.wrongNetwork = true;
      this.notificationsStore.showMessage('Please change network to Goerli', 'error');
    } else {
      config.links.SSV_API_ENDPOINT = getCurrentNetwork().api;
      this.wrongNetwork = false;
    }
  }

  /**
   * encode key
   * @param key
   */
  encodeKey(key?: string) {
    if (!key) return '';
    return this.web3?.eth.abi.encodeParameter('string', key);
  }

  /**
   * decode key
   * @param key
   */
  decodeKey(key?: string) {
    if (!key) return '';
    return this.web3?.eth.abi.decodeParameter('string', key);
  }

  /**
   * Set Account loaded
   * @param status: boolean
   */
  setAccountDataLoaded = (status: boolean): void => {
    this.accountDataLoaded = status;
  };

  get connected() {
    return this.accountAddress;
  }

  get isWrongNetwork(): boolean {
    return this.wrongNetwork;
  }

  get getterContract(): Contract {
    if (!this.viewContract) {
      const abi: any = config.CONTRACTS.SSV_NETWORK_GETTER.ABI;
      const contractAddress: string = config.CONTRACTS.SSV_NETWORK_GETTER.ADDRESS;
      this.viewContract = new this.web3.eth.Contract(abi, contractAddress);
    }
    // @ts-ignore
    return this.viewContract;
  }

  get setterContract(): Contract {
    if (!this.networkContract) {
      const abi: any = config.CONTRACTS.SSV_NETWORK_SETTER.ABI;
      const contractAddress: string = config.CONTRACTS.SSV_NETWORK_SETTER.ADDRESS;
      this.networkContract = new this.web3.eth.Contract(abi, contractAddress);
    }
    // @ts-ignore
    return this.networkContract;
  }

}

export default WalletStore;
