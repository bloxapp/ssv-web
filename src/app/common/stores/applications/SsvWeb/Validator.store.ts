import Decimal from 'decimal.js';
import { KeySharesItem } from 'ssv-keys';
import { SSVKeys, KeyShares } from 'ssv-keys';
import { action, makeObservable, observable } from 'mobx';
import BaseStore from '~app/common/stores/BaseStore';
import { propertyCostByPeriod } from '~lib/utils/numbers';
import { EContractName } from '~app/model/contracts.model';
import { prepareSsvAmountToTransfer, toWei } from '~root/services/conversions.service';
import { executeAfterEvent } from '~root/services/events.service';
import { getContractByName } from '~root/services/contracts.service';
import SsvStore from '~app/common/stores/applications/SsvWeb/SSV.store';
import GoogleTagManager from '~lib/analytics/GoogleTag/GoogleTagManager';
import MyAccountStore from '~app/common/stores/applications/SsvWeb/MyAccount.store';
import OperatorStore from '~app/common/stores/applications/SsvWeb/Operator.store';
import ProcessStore from '~app/common/stores/applications/SsvWeb/Process.store';
import { store } from '~app/store';
import { setIsLoading, setIsShowTxPendingPopup, setTxHash } from '~app/redux/appState.slice';
import { IOperator } from '~app/model/operator.model';
import { getClusterData, getClusterHash, getSortedOperatorsIds } from '~root/services/cluster.service';
import { getLiquidationCollateralPerValidator, getValidator } from '~root/services/validator.service';
import { getEventByTxHash } from '~root/services/contractEvent.service';
import { translations } from '~app/common/config';
import { getOwnerNonce } from '~root/services/account.service';
import { SingleCluster, RegisterValidator } from '~app/model/processes.model';
import { setMessageAndSeverity } from '~app/redux/notifications.slice';

type ClusterDataType = {
  active: boolean;
  balance: number;
  index: number;
  networkFeeIndex: number;
  validatorCount: number;
};

const PAYLOAD_KEYS = {
  KEYSTORE_PUBLIC_KEY: 'keyStorePublicKey',
  OPERATOR_IDS: 'operatorIds',
  SHARES_DATA: 'sharesData',
  TOTAL_COST: 'totalCost',
  CLUSTER_DATA: 'clusterData',
};

const annotations = {
  isJsonFile: action.bound,
  keyStoreFile: observable,
  registerValidatorsPublicKeys: observable,
  keyShareFile: observable,
  setKeyStore: action.bound,
  registrationMode: observable,
  updateValidator: action.bound,
  addNewValidator: action.bound,
  keyStorePublicKey: observable,
  keySharePublicKey: observable,
  setKeySharePublicKey: action.bound,
  removeValidator: action.bound,
  bulkRemoveValidators: action.bound,
  exitValidator: action.bound,
  bulkExitValidators: action.bound,
  setKeyShareFile: action.bound,
  setRegisterValidatorsPublicKeys: action.bound,
  keyStorePrivateKey: observable,
  extractKeyStoreData: action.bound,
  getKeyStorePublicKey: action.bound,
  clearKeyShareFlowData: action.bound,
  clearKeyStoreFlowData: action.bound,
  bulkRegistration: action.bound,
  validatorPublicKeyExist: observable,
  isMultiSharesMode: observable,
  setMultiSharesMode: action.bound,
  validatorsCount: observable,
  processedKeyShare: observable,
  setProcessedKeyShare: action.bound,
};

class ValidatorStore extends BaseStore {
  // general
  registrationMode = 0;

  // Key Stores flow
  keyStorePublicKey: string = '';
  keyStorePrivateKey: string = '';
  keyStoreFile: File | null = null;
  validatorPublicKeyExist: boolean = false;

  // key shares flow
  // keySharePayload: any;
  keySharePublicKey: string = '';
  keyShareFile: File | null = null;

  // New key shares flow.
  isMultiSharesMode: boolean = false;
  processedKeyShare: KeyShares | null = null;
  validatorsCount: number = 0;
  registerValidatorsPublicKeys: string[] = [];

  private myAccountStore: MyAccountStore = this.getStore('MyAccount');

  constructor() {
    super();
    makeObservable(this, annotations);
  }

  setKeySharePublicKey(keySharePublicKey: string) {
    this.keySharePublicKey = keySharePublicKey;
  }

  setMultiSharesMode(validatorsCount: number) {
    this.isMultiSharesMode = validatorsCount > 1;
    this.validatorsCount = validatorsCount;
  }

  setRegisterValidatorsPublicKeys(validatorPublicKeys: string[]) {
    this.registerValidatorsPublicKeys = validatorPublicKeys;
  }

  setProcessedKeyShare(processedKeyShare: KeyShares) {
    this.processedKeyShare = processedKeyShare;
    this.validatorsCount = processedKeyShare.list().length;
  }

  clearKeyStoreFlowData() {
    this.setMultiSharesMode(0);
    this.keyStorePublicKey = '';
    this.keyStorePrivateKey = '';
    this.validatorPublicKeyExist = false;
  }

  clearKeyShareFlowData() {
    this.keyShareFile = null;
    this.keySharePublicKey = '';
    this.validatorPublicKeyExist = false;
    this.isMultiSharesMode = false;
    this.processedKeyShare = null;
    this.validatorsCount = 0;
  }

  async extractKeyStoreData(keyStorePassword: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const fileTextPlain: string | undefined = await this.keyStoreFile?.text();
        const ssvKeys = new SSVKeys();
        // @ts-ignore
        const { privateKey, publicKey } = await ssvKeys.extractKeys(fileTextPlain, keyStorePassword);
        this.keyStorePrivateKey = privateKey;
        this.keyStorePublicKey = publicKey;
        resolve(true);
      } catch (e: any) {
        reject(e);
      }
    });
  }

  async removeValidator(publicKey: string, operatorIds: number[]): Promise<boolean> {
    const contract = getContractByName(EContractName.SETTER);
    store.dispatch(setIsLoading(true));
    const isContractWallet = store.getState().walletState.isContractWallet;
    const accountAddress = store.getState().walletState.accountAddress;
    const ssvStore: SsvStore = this.getStore('SSV');
    const sortedOperatorIds = getSortedOperatorsIds(operatorIds);
    const clusterData = await getClusterData(getClusterHash(operatorIds, accountAddress), ssvStore.liquidationCollateralPeriod, ssvStore.minimumLiquidationCollateral);
    return new Promise(async (resolve) => {
      try {
        const tx = await contract.removeValidator(publicKey, sortedOperatorIds, clusterData);
        if (tx.hash) {
          store.dispatch(setTxHash(tx.hash));
          store.dispatch(setIsShowTxPendingPopup(true));
        }
        if (isContractWallet) {
          resolve(true);
        }
        const receipt = await tx.wait();
        if (receipt.blockHash) {
          const updatedStateGetter = async () => !await getValidator(publicKey);
          await executeAfterEvent({ updatedStateGetter, callBack: this.myAccountStore.refreshOperatorsAndClusters });
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e: any) {
        store.dispatch(setMessageAndSeverity({ message: e.message || translations.DEFAULT.DEFAULT_ERROR_MESSAGE, severity: 'error' }));
        resolve(false);
      } finally {
        if (!isContractWallet) {
          store.dispatch(setIsLoading(false));
          store.dispatch(setIsShowTxPendingPopup(false));
        }
      }
    });
  }

  /**
   * Bulk remove validators
   */
  async bulkRemoveValidators(validators: string[], operatorIds: number[]): Promise<boolean> {
    const contract = getContractByName(EContractName.SETTER);
    store.dispatch(setIsLoading(true));
    const isContractWallet = store.getState().walletState.isContractWallet;
    const accountAddress = store.getState().walletState.accountAddress;
    const ssvStore: SsvStore = this.getStore('SSV');
    const clusterData = await getClusterData(getClusterHash(operatorIds, accountAddress), ssvStore.liquidationCollateralPeriod, ssvStore.minimumLiquidationCollateral);
    return new Promise(async (resolve) => {
      try {
        const tx = await contract.bulkRemoveValidator(validators, operatorIds, clusterData);
        if (tx.hash) {
          store.dispatch(setTxHash(tx.hash));
          store.dispatch(setIsShowTxPendingPopup(true));
        }
        if (isContractWallet) {
          resolve(true);
        }
        const receipt = await tx.wait();
        if (receipt.blockHash) {
          const updatedStateGetter = async () => !await getValidator(validators[0]);
          await executeAfterEvent({ updatedStateGetter, callBack: this.myAccountStore.refreshOperatorsAndClusters });
        } else {
          resolve(false);
        }
      } catch (e: any) {
        store.dispatch(setMessageAndSeverity({ message: e.message || translations.DEFAULT.DEFAULT_ERROR_MESSAGE, severity: 'error' }));
        resolve(false);
      } finally {
        if (!isContractWallet) {
          store.dispatch(setIsLoading(false));
          store.dispatch(setIsShowTxPendingPopup(false));
        }
      }
    });
  }

  /**
   * Exit validator
   */
  async exitValidator(publicKey: string, operatorIds: number[]): Promise<boolean> {
    const isContractWallet = store.getState().walletState.isContractWallet;
    const contract = getContractByName(EContractName.SETTER);
    store.dispatch(setIsLoading(true));

    return new Promise(async (resolve) => {
      try {
        const tx = await contract.exitValidator(publicKey, operatorIds);
        if (tx.hash) {
          store.dispatch(setTxHash(tx.hash));
          store.dispatch(setIsShowTxPendingPopup(true));
        }
        if (isContractWallet) {
          resolve(true);
        }
        const receipt = await tx.wait();
        if (receipt.blockHash) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e: any) {
        store.dispatch(setMessageAndSeverity({ message: e.message || translations.DEFAULT.DEFAULT_ERROR_MESSAGE, severity: 'error' }));
        resolve(false);
      } finally {
        if (!isContractWallet) {
          store.dispatch(setIsLoading(false));
          store.dispatch(setIsShowTxPendingPopup(false));
        }
      }
    });
  }

  /**
   * Bulk exit validator
   */
  async bulkExitValidators(validators: string[], operatorIds: number[]): Promise<boolean> {
    const isContractWallet = store.getState().walletState.isContractWallet;
    const contract = getContractByName(EContractName.SETTER);
    store.dispatch(setIsLoading(true));

    return new Promise(async (resolve) => {
      try {
        const tx = await contract.bulkExitValidator(validators, operatorIds);
        if (tx.hash) {
          store.dispatch(setTxHash(tx.hash));
          store.dispatch(setIsShowTxPendingPopup(true));
        }
        if (isContractWallet) {
          resolve(true);
        }
        const receipt = await tx.wait();
        if (receipt.blockHash) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e: any) {
        store.dispatch(setMessageAndSeverity({ message: e.message || translations.DEFAULT.DEFAULT_ERROR_MESSAGE, severity: 'error' }));
        resolve(false);
      } finally {
        if (!isContractWallet) {
          store.dispatch(setIsLoading(false));
          store.dispatch(setIsShowTxPendingPopup(false));
        }
      }
    });
  }

  /**
   * Update validator
   */
  async updateValidator() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const { KEYSTORE_PUBLIC_KEY } = PAYLOAD_KEYS;
      const isContractWallet = store.getState().walletState.isContractWallet;
      const accountAddress = store.getState().walletState.accountAddress;
      const contract = getContractByName(EContractName.SETTER);
      const payload = await this.createKeystorePayload();
      if (!payload) {
        store.dispatch(setIsLoading(false));
        store.dispatch(setIsShowTxPendingPopup(false));
        resolve(false);
        return;
      }
      const validatorBefore = await getValidator(`0x${payload.get(KEYSTORE_PUBLIC_KEY)}`);
      try {
        const tx = await contract.updateValidator(...payload.values()).send({ from: accountAddress });
        if (tx.hash) {
          store.dispatch(setTxHash(tx.hash));
          store.dispatch(setIsShowTxPendingPopup(true));
        }
        if (isContractWallet) {
          resolve(true);
        }
        const receipt = await tx.wait();
        const event: boolean = receipt.hasOwnProperty('events');
        if (event) {
          this.keyStoreFile = null;
          const updatedStateGetter = async () => {
            return getValidator(`0x${payload.get(KEYSTORE_PUBLIC_KEY)}`);
          };
          await executeAfterEvent({ updatedStateGetter, prevState: validatorBefore, callBack: this.myAccountStore.refreshOperatorsAndClusters });
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e) {
        resolve(false);
      } finally {
        store.dispatch(setIsLoading(false));
        store.dispatch(setIsShowTxPendingPopup(false));
      }
    });
  }

  async bulkRegistration() {
    const isContractWallet = store.getState().walletState.isContractWallet;
    return new Promise(async (resolve) => {
      try {
        const contract = getContractByName(EContractName.SETTER);
        const payload = await this.createKeySharePayload();
        if (!payload) {
          resolve(false);
          return;
        }
        let tx = await contract.bulkRegisterValidator(...payload.values());
        if (tx.hash) {
          store.dispatch(setTxHash(tx.hash));
          store.dispatch(setIsShowTxPendingPopup(true));
        }
        if (isContractWallet) {
          resolve(true);
        }
        const receipt = await tx.wait();
        if (receipt.blockHash) {
          const event: boolean = receipt.hasOwnProperty('events');
          if (event) {
            this.keyStoreFile = null;
            GoogleTagManager.getInstance().sendEvent({
              category: 'validators_register',
              action: 'register_tx',
              label: 'success',
            });
            const updatedStateGetter = async () => !!await getEventByTxHash(receipt.transactionHash);
            await executeAfterEvent({ updatedStateGetter, callBack: this.myAccountStore.refreshOperatorsAndClusters });
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      } catch (e: any) {
        console.log(e.data);
        const isRejected: boolean = e.hasOwnProperty('code');
        GoogleTagManager.getInstance().sendEvent({
          category: 'validator_register',
          action: 'register_tx',
          label: isRejected ? 'rejected' : 'error',
        });
        store.dispatch(setMessageAndSeverity({ message: e.message || translations.DEFAULT.DEFAULT_ERROR_MESSAGE, severity: 'error' }));
        resolve(false);
      } finally {
        if (!isContractWallet) {
          store.dispatch(setIsLoading(false));
          store.dispatch(setIsShowTxPendingPopup(false));
        }
      }
    });
  }

  async addNewValidator() {
    const isContractWallet = store.getState().walletState.isContractWallet;
    return new Promise(async (resolve) => {
      try {
        const payload = this.registrationMode === 0 ? await this.createKeySharePayload() : await this.createKeystorePayload();
        const contract = getContractByName(EContractName.SETTER);
        if (!payload) {
          resolve(false);
          return;
        }
        console.debug('Add Validator Payload: ', payload);
        let tx = await contract.registerValidator(...payload.values());

        if (tx.hash) {
          store.dispatch(setTxHash(tx.hash));
          store.dispatch(setIsShowTxPendingPopup(true));
        }
        if (isContractWallet) {
          resolve(true);
        }
        const receipt = await tx.wait();
        if (receipt.blockHash) {
          const event: boolean = receipt.hasOwnProperty('events');
          if (event) {
            this.keyStoreFile = null;
            GoogleTagManager.getInstance().sendEvent({
              category: 'validator_register',
              action: 'register_tx',
              label: 'success',
            });
            const updatedStateGetter = async () =>  !!await getEventByTxHash(receipt.transactionHash);
            await executeAfterEvent({ updatedStateGetter, callBack: this.myAccountStore.refreshOperatorsAndClusters });
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
        resolve(false);
      } catch (e: any) {
        const isRejected: boolean = e.hasOwnProperty('code');
        GoogleTagManager.getInstance().sendEvent({
          category: 'validator_register',
          action: 'register_tx',
          label: isRejected ? 'rejected' : 'error',
        });
        store.dispatch(setMessageAndSeverity({ message: e.message || translations.DEFAULT.DEFAULT_ERROR_MESSAGE, severity: 'error' }));
        resolve(false);
      } finally {
        if (!isContractWallet) {
          store.dispatch(setIsLoading(false));
          store.dispatch(setIsShowTxPendingPopup(false));
        }
      }
    });
  }

  async reactivateCluster(amount: string) {
    return new Promise(async (resolve) => {
      try {
        const processStore: ProcessStore = this.getStore('Process');
        const contract = getContractByName(EContractName.SETTER);
        const process: SingleCluster = <SingleCluster>processStore.process;
        const isContractWallet = store.getState().walletState.isContractWallet;
        const accountAddress = store.getState().walletState.accountAddress;
        const ssvStore: SsvStore = this.getStore('SSV');
        const cluster = process.item;
        // @ts-ignore
        const operatorsIds = cluster.operators.map(({ id }) => Number(id)).sort((a: number, b: number) => a - b);
        const clusterData = await getClusterData(getClusterHash(cluster.operators, accountAddress), ssvStore.liquidationCollateralPeriod, ssvStore.minimumLiquidationCollateral);
        const tx = await contract.reactivate(operatorsIds, toWei(amount), clusterData);
        if (tx.hash) {
          store.dispatch(setTxHash(tx.hash));
          store.dispatch(setIsShowTxPendingPopup(true));
        }
        if (isContractWallet) {
          resolve(true);
        }
        const receipt = await tx.wait();
        if (receipt.blockHash) {
          const event: boolean = receipt.hasOwnProperty('events');
          if (event) {
            this.keyStoreFile = null;
            GoogleTagManager.getInstance().sendEvent({
              label: 'success',
              category: 'single_cluster',
              action: 'reactivate_cluster',
            });
            const updatedStateGetter = async () => !!await getEventByTxHash(receipt.transactionHash);
            await executeAfterEvent({ updatedStateGetter, callBack: this.myAccountStore.refreshOperatorsAndClusters });
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      } catch (e: any) {
        const isRejected: boolean = e.hasOwnProperty('code');
        GoogleTagManager.getInstance().sendEvent({
          category: 'single_cluster',
          action: 'reactivate_cluster',
          label: isRejected ? 'rejected' : 'error',
        });
        store.dispatch(setMessageAndSeverity({ message: e.message || translations.DEFAULT.DEFAULT_ERROR_MESSAGE, severity: 'error' }));
        resolve(false);
      } finally {
        store.dispatch(setIsLoading(false));
        store.dispatch(setIsShowTxPendingPopup(false));
      }
    });
  }

  async createKeystorePayload(): Promise<Map<string, any> | null> {
    const ssvStore: SsvStore = this.getStore('SSV');
    const accountAddress = store.getState().walletState.accountAddress;
    const processStore: ProcessStore = this.getStore('Process');
    const operatorStore: OperatorStore = this.getStore('Operator');
    const process: RegisterValidator | SingleCluster = <RegisterValidator | SingleCluster>processStore.process;
    const ownerNonce = await getOwnerNonce({ address: accountAddress });
    if (ownerNonce === null) {
      // TODO: add proper error handling
      return null;
    }
    const operators = Object.values(operatorStore.selectedOperators)
      .sort((a: any, b: any) => a.id - b.id)
      .map(item => ({ id: item.id, operatorKey: item.public_key }));
    return new Promise(async (resolve) => {
      try {
        const ssvKeys = new SSVKeys();
        // const keyShares = new KeyShares();
        const threshold = await ssvKeys.createThreshold(this.keyStorePrivateKey, operators);
        const encryptedShares = await ssvKeys.encryptShares(operators, threshold.shares);
        let totalCost = 'registerValidator' in process ? prepareSsvAmountToTransfer(toWei(process.registerValidator?.depositAmount)) : 0;
        if (process && 'fundingPeriod' in process) {
          const networkCost = propertyCostByPeriod(ssvStore.networkFee, process.fundingPeriod);
          const operatorsCost = propertyCostByPeriod(operatorStore.getSelectedOperatorsFee, process.fundingPeriod);
          let liquidationCollateralCost = new Decimal(operatorStore.getSelectedOperatorsFee).add(ssvStore.networkFee).mul(ssvStore.liquidationCollateralPeriod);
          if (Number(liquidationCollateralCost) < ssvStore.minimumLiquidationCollateral) {
            liquidationCollateralCost = new Decimal(ssvStore.minimumLiquidationCollateral);
          }
          totalCost = prepareSsvAmountToTransfer(toWei(liquidationCollateralCost.add(networkCost).add(operatorsCost).toString()));
        }
        const keysharePayload = await (new KeySharesItem()).buildPayload({
            publicKey: threshold.publicKey,
            operators,
            encryptedShares,
          }, {
            ownerAddress: accountAddress,
            ownerNonce: ownerNonce as number,
            privateKey: this.keyStorePrivateKey,
          });

        const payload = this.createPayload(this.keyStorePublicKey,
          keysharePayload.operatorIds,
          keysharePayload.sharesData || keysharePayload.shares,
          `${totalCost}`,
          await getClusterData(getClusterHash(operators.map(item => item.id), accountAddress), ssvStore.liquidationCollateralPeriod, ssvStore.minimumLiquidationCollateral));

        resolve(payload);
      } catch (e: any) {
        console.log(e.message);
        resolve(null);
      }
    });
  }

  async createKeySharePayload(): Promise<Map<string, any> | null> {
    return new Promise(async (resolve) => {
      const ssvStore: SsvStore = this.getStore('SSV');
      const processStore: ProcessStore = this.getStore('Process');
      const accountAddress = store.getState().walletState.accountAddress;
      const operatorStore: OperatorStore = this.getStore('Operator');
      const process: RegisterValidator | SingleCluster = <RegisterValidator | SingleCluster>processStore.process;
      let totalCost = 'registerValidator' in process ? prepareSsvAmountToTransfer(toWei(process.registerValidator?.depositAmount)) : 0;
      if (process && 'fundingPeriod' in process) {
        const networkCost = propertyCostByPeriod(ssvStore.networkFee, process.fundingPeriod);
        const operatorsCost = propertyCostByPeriod(operatorStore.getSelectedOperatorsFee, process.fundingPeriod);
        let liquidationCollateralCost = getLiquidationCollateralPerValidator({
          operatorsFee: operatorStore.getSelectedOperatorsFee,
          networkFee: ssvStore.networkFee,
          validatorsCount: this.validatorsCount,
          liquidationCollateralPeriod: ssvStore.liquidationCollateralPeriod,
          minimumLiquidationCollateral: ssvStore.minimumLiquidationCollateral,
        });
        totalCost = prepareSsvAmountToTransfer(toWei(liquidationCollateralCost.add(networkCost).add(operatorsCost).mul(this.isMultiSharesMode ? this.validatorsCount : 1).toString()));
      }
      try {
        const keysharePayload = this.processedKeyShare?.list().find((keyShare: any) => this.registerValidatorsPublicKeys.includes(keyShare.payload.publicKey))?.payload;
        let publicKeys;
        let sharesData;
        const operatorIds = Object.values(operatorStore.selectedOperators).map((operator: IOperator) => operator.id).sort((a: number, b: number) => a - b);

        const keyShares = this.processedKeyShare?.list();

        if (this.isMultiSharesMode && keyShares && keyShares.length > 1) {
          const filteredKeyShares = keyShares.filter((keyShare: any) => this.registerValidatorsPublicKeys.includes(keyShare.payload.publicKey));
          publicKeys = filteredKeyShares.map((keyShare) => keyShare.payload.publicKey);
          sharesData = filteredKeyShares.map((keyShare) => keyShare.payload.sharesData);
        } else if (keysharePayload) {
          publicKeys = keysharePayload?.publicKey;
          sharesData = keysharePayload.sharesData;
        } else {
          publicKeys = '';
          sharesData = [];
        }

        if (keysharePayload) {
          const payload = this.createPayload(
            publicKeys,
            operatorIds,
            sharesData, `${totalCost}`,
            await getClusterData(getClusterHash(operatorIds, accountAddress), ssvStore.liquidationCollateralPeriod, ssvStore.minimumLiquidationCollateral));
          resolve(payload);
        }
        resolve(null);
      } catch (e: any) {
        console.log(e.message);
        resolve(null);
      }
    });
  }

  /**
   * Set keystore file
   * @param keyStore
   * @param callBack
   */
  async setKeyStore(keyStore: any, callBack?: any) {
    try {
      this.keyStorePrivateKey = '';
      this.keyStoreFile = keyStore;
      this.keyStorePublicKey = await this.getKeyStorePublicKey();
      this.validatorPublicKeyExist = !!(await getValidator(this.keyStorePublicKey, true));
    } catch (e: any) {
      console.log(e.message);
    }
    !!callBack && callBack();
  }

  /**
   * Set keystore file
   * @param keyShare
   * @param callBack
   */
  async setKeyShareFile(keyShare: any, callBack?: any) {
    try {
      this.keyShareFile = keyShare;
    } catch (e: any) {
      console.log(e.message);
    }
    !!callBack && callBack();
  }

  async getKeyStorePublicKey(): Promise<string> {
    try {
      const fileJson = await this.keyStoreFile?.text();
      // @ts-ignore
      return JSON.parse(fileJson).pubkey;
    } catch (e: any) {
      return '';
    }
  }

  createPayload(publicKey: string | string[], operatorIds: number[] | number[][], sharesData: string | string[], totalCost: string | string[], clusterData: ClusterDataType) {
    const payload = new Map<string, any>();
    payload.set('keyStorePublicKey', publicKey);
    payload.set('operatorIds', operatorIds);
    payload.set('sharesData', sharesData);
    payload.set('totalCost', `${totalCost}`);
    payload.set('clusterData', clusterData);
    return payload;
  }

  isJsonFile(file: any): boolean {
    return file?.type === 'application/json';
  }
}

export default ValidatorStore;
