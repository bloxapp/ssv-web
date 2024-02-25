import config from '~app/common/config';
import { getRequest } from '~root/services/httpApi.service';
import NotificationsStore from '../../app/common/stores/applications/SsvWeb/Notifications.store';
import { getContractByName } from '~root/services/contracts.service';
import { EContractName } from '~app/model/contracts.model';
import { store } from '~app/store';


type ValidatorBase = {
  validators: number;

  /**
   * Exit validator
   */
  exitValidators: (validatorPublicKeys: string[], operatorIds: number[]) => Promise<boolean>;

  [key: string]: any; // Allows extending and overriding behavior.
};

const ValidatorService = (validators: number, overrides: Partial<ValidatorBase> = {}): ValidatorBase => {

  const exitValidators = async (validatorPublicKeys: string[], operatorIds: number[]) => {
    return false;
  };

  return {
    validators: 1,
    exitValidators,
    ...overrides, // This allows for overriding any base behavior
  };
};
// function ValidatorService(validators: number, overrides: Partial<ValidatorBase> = {}): ValidatorBase {
//   const exitValidator = async (publicKey: string, operatorIds: number[]) => {
//     // // const applicationStore: ApplicationStore = this.getStore('Application');
//     // const notificationsStore: NotificationsStore = this.getStore('Notifications');
//     // const contract = getContractByName(EContractName.SETTER);
//     // store.dispatch(setIsLoading(true));
//     //
//     // return new Promise(async (resolve) => {
//     //   try {
//     //     const tx = await contract.exitValidator(publicKey, operatorIds);
//     //     if (tx.hash) {
//     //       store.dispatch(setTxHash(tx.hash));
//     //       store.dispatch(setIsShowTxPendingPopup(true));
//     //     }
//     //     const receipt = await tx.wait();
//     //     if (receipt.blockHash) {
//     //       resolve(true);
//     //     }
//     //     resolve(false);
//     //   } catch (e: any) {
//     //     notificationsStore.showMessage(e.message, 'error');
//     //     resolve(false);
//     //   } finally {
//     //     store.dispatch(setIsLoading(false));
//     //     store.dispatch(setIsShowTxPendingPopup(false));
//     //   }
//     // });
//     return false;
//   };
//
//
//   return {
//     validators: 1,
//     exitValidator,
//     ...overrides, // This allows for overriding any base behavior
//   };
// }

function getValidatorService(validatorCount: number) {
  if (validatorCount > 1) {
    return getBulkValidator(validatorCount);
  } else {
    return getSingleValidator(validatorCount);
  }
}

function getBulkValidator(validators: number): ValidatorBase {

  const overrides: Partial<ValidatorBase> = {
    exitValidators: async (validatorPublicKeys: string[], operatorIds: number[]): Promise<boolean> => {
      // // const applicationStore: ApplicationStore = this.getStore('Application');
      // const notificationsStore: NotificationsStore = this.getStore('Notifications');
      // const contract = getContractByName(EContractName.SETTER);
      // store.dispatch(setIsLoading(true));
      //
      // return new Promise(async (resolve) => {
      //   try {
      //     const tx = await contract.bulkExitValidator(validators, operatorIds);
      //     if (tx.hash) {
      //       store.dispatch(setTxHash(tx.hash));
      //       store.dispatch(setIsShowTxPendingPopup(true));
      //     }
      //     const receipt = await tx.wait();
      //     if (receipt.blockHash) {
      //       resolve(true);
      //     }
      //     resolve(false);
      //   } catch (e: any) {
      //     notificationsStore.showMessage(e.message, 'error');
      //     resolve(false);
      //   } finally {
      //     store.dispatch(setIsLoading(false));
      //     store.dispatch(setIsShowTxPendingPopup(false));
      //   }
      // });
      return false;
    },

    // fetch: () => `${name} fetches the ball!`,
  };
  return ValidatorService(validators, overrides);
}

function getSingleValidator(validators: number): ValidatorBase {
  // const dogSound = 'Woof';
  const overrides: Partial<ValidatorBase> = {
    exitValidators: async (validatorPublicKeys: string[], operatorIds: number[]) => {
      // // const applicationStore: ApplicationStore = this.getStore('Application');
      // const notificationsStore: NotificationsStore = this.getStore('Notifications');
      // const contract = getContractByName(EContractName.SETTER);
      // store.dispatch(setIsLoading(true));
      //
      // return new Promise(async (resolve) => {
      //   try {
      //     const tx = await contract.exitValidator(publicKey, operatorIds);
      //     if (tx.hash) {
      //       store.dispatch(setTxHash(tx.hash));
      //       store.dispatch(setIsShowTxPendingPopup(true));
      //     }
      //     const receipt = await tx.wait();
      //     if (receipt.blockHash) {
      //       resolve(true);
      //     }
      //     resolve(false);
      //   } catch (e: any) {
      //     notificationsStore.showMessage(e.message, 'error');
      //     resolve(false);
      //   } finally {
      //     store.dispatch(setIsLoading(false));
      //     store.dispatch(setIsShowTxPendingPopup(false));
      //   }
      // });
      return false;
    },

    // fetch: () => `${name} fetches the ball!`,
  };
  return ValidatorService(validators, overrides);
}

const getOwnerAddressCost = async (ownerAddress: string, skipRetry?: boolean): Promise<any> => {
  try {
    const url = `${config.links.SSV_API_ENDPOINT}/validators/owned_by/${ownerAddress}/cost`;
    return await getRequest(url, skipRetry);
  } catch (e) {
    return null;
  }
};

const clustersByOwnerAddress = async (query: string, skipRetry?: boolean): Promise<any> => {
  try {
    const url = `${String(config.links.SSV_API_ENDPOINT)}/clusters/owner/${query}&operatorDetails=operatorDetails&ts=${new Date().getTime()}`;
    return await getRequest(url, skipRetry);
  } catch (e) {
    return { clusters: [], pagination: {} };
  }
};

const validatorsByClusterHash = async (page: number, clusterHash: string, perPage: number = 7): Promise<any> => {
  try {
    const url = `${String(config.links.SSV_API_ENDPOINT)}/validators/?&search=${clusterHash}&page=${page}&perPage=${perPage}&ts=${new Date().getTime()}`;
    return await getRequest(url, true);
  } catch (e) {
    return { clusters: [], pagination: {} };
  }
};

const clusterByHash = async (clusterHash: string): Promise<any> => {
  try {
    const url = `${String(config.links.SSV_API_ENDPOINT)}/clusters/${clusterHash}`;
    return await getRequest(url, true);
  } catch (e) {
    return { clusters: [], pagination: {} };
  }
};

const getClusterData = async (clusterHash: string): Promise<any> => {
  try {
    const url = `${String(config.links.SSV_API_ENDPOINT)}/clusters/${clusterHash}`;
    return await getRequest(url, true);
  } catch (e) {
    return null;
  }
};

const getValidator = async (publicKey: string, skipRetry?: boolean) => {
  try {
    const url = `${String(config.links.SSV_API_ENDPOINT)}/validators/${publicKey.replace('0x', '')}?ts=${new Date().getTime()}`;
    return await getRequest(url, skipRetry);
  } catch (e) {
    return null;
  }
};

export {
  getValidatorService,
  getOwnerAddressCost,
  clustersByOwnerAddress,
  validatorsByClusterHash,
  clusterByHash,
  getClusterData,
  getValidator,
};
