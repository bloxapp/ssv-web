import { action, makeObservable, observable } from 'mobx';
import config from '~app/common/config';
import BaseStore from '~app/common/stores/BaseStore';
import WalletStore from '~app/common/stores/Abstracts/Wallet';
import { formatNumberFromBeaconcha, formatNumberToUi } from '~lib/utils/numbers';
import { getValidator as getValidatorServiceCall, clustersByOwnerAddress } from '~root/services/validator.service';
import { getOperatorsByOwnerAddress } from '~root/services/operator.service';
import { extendClusterEntity } from '~root/services/cluster.service';
import { SsvStore } from '~app/common/stores/applications/SsvWeb/index';
import { getContractByName } from '~root/services/contracts.service';
import { EContractName } from '~app/model/contracts.model';
import { fromWei } from '~root/services/conversions.service';
import { DEFAULT_PAGINATION } from '~app/common/config/config';
import { IOperator } from '~app/model/operator.model';

const INTERVAL_TIME = 30000;

class MyAccountStore extends BaseStore {
  // GLOBAL
  forceBigList: boolean = false;
  operatorsInterval: any = null;
  validatorsInterval: any = null;
  lastUpdateOperators: number | undefined;
  lastUpdateValidators: number | undefined;

  // OPERATOR
  ownerAddressOperators: IOperator[] = [];
  ownerAddressOperatorsPagination = DEFAULT_PAGINATION;

  // VALIDATOR
  ownerAddressClusters: any = [];
  ownerAddressClustersPagination = DEFAULT_PAGINATION;

  // BEACONCHAIN
  beaconChaBalances: any = {};
  beaconChaPerformances: any = {};

  constructor() {
    // TODO: [mobx-undecorate] verify the constructor arguments and the arguments of this automatically generated super call
    super();

    makeObservable(this, {
      forceBigList: observable,
      setIntervals: action.bound,
      getValidator: action.bound,
      clearIntervals: action.bound,
      beaconChaBalances: observable,
      operatorsInterval: observable,
      validatorsInterval: observable,
      lastUpdateOperators: observable,
      lastUpdateValidators: observable,
      getOperatorRevenue: action.bound,
      ownerAddressOperators: observable,
      getOperatorsRevenue: action.bound,
      beaconChaPerformances: observable,
      ownerAddressClusters: observable,
      getOwnerAddressClusters: action.bound,
      getOwnerAddressOperators: action.bound,
      ownerAddressOperatorsPagination: observable,
      ownerAddressClustersPagination: observable,
    });
  }

  clearIntervals() {
    clearInterval(this.operatorsInterval);
    clearInterval(this.validatorsInterval);
    this.ownerAddressOperators = [];
    this.ownerAddressClusters = [];
    this.ownerAddressOperatorsPagination = DEFAULT_PAGINATION;
    this.ownerAddressClustersPagination = DEFAULT_PAGINATION;
  }

  setIntervals() {
    this.validatorsInterval = setInterval(() => {
      // @ts-ignore
      const diffTime = Date.now() - this.lastUpdateValidators;
      if (Math.floor((diffTime / 1000) % 60) < INTERVAL_TIME) return;
      this.getOwnerAddressClusters({});
    }, INTERVAL_TIME);

    this.operatorsInterval = setInterval(() => {
      // @ts-ignore
      const diffTime = Date.now() - this.lastUpdateOperators;
      if (Math.floor((diffTime / 1000) % 60) < INTERVAL_TIME) return;
      this.getOwnerAddressOperators({});
    }, INTERVAL_TIME);
  }

  async getOwnerAddressOperators({ forcePage, forcePerPage }: { forcePage?: number, forcePerPage?: number }): Promise<void> {
    const { page, per_page } = this.ownerAddressOperatorsPagination;
    const walletStore: WalletStore = this.getStore('Wallet');
    if (!walletStore.accountAddress) return;
    const response = await getOperatorsByOwnerAddress(forcePage ?? page, this.forceBigList ? 10 : forcePerPage ?? per_page, walletStore.accountAddress);
    this.ownerAddressOperatorsPagination = response.pagination;
    this.ownerAddressOperators = await this.getOperatorsRevenue(response.operators);
    this.lastUpdateOperators = Date.now();
  }

  async getOperatorRevenue(operator: any) {
    try {
      const contract = getContractByName(EContractName.GETTER);
      const response = await contract.totalEarningsOf(operator.id);
      operator.revenue = fromWei(response.toString());
    } catch (e: any) {
      operator.revenue = 0;
    }
    return operator;
  }

  async getOperatorsRevenue(operatorsList: any) {
    return Promise.all(operatorsList.map((operator: any) => this.getOperatorRevenue(operator)));
  }

  async getValidator(publicKey: string, skipRetry?: boolean): Promise<any> {
    const validator = await getValidatorServiceCall(publicKey, skipRetry);
    const validatorPublicKey = `0x${validator.public_key}`;
    const validatorBalance = formatNumberFromBeaconcha(this.beaconChaBalances[validatorPublicKey]?.balance);
    // eslint-disable-next-line no-await-in-loop
    const performance7days = this.beaconChaPerformances[validator.public_key] ? formatNumberFromBeaconcha(this.beaconChaPerformances[validator.public_key].performance7d) : 0;
    // @ts-ignore
    const apr = formatNumberToUi(((performance7days / 32) * 100) * config.GLOBAL_VARIABLE.NUMBERS_OF_WEEKS_IN_YEAR);
    return {
      apr,
      status: validator.status,
      balance: validatorBalance,
      operators: validator.operators,
      public_key: validator.public_key,
    };
  }

  async getOwnerAddressClusters({ forcePage, forcePerPage }: { forcePage?: number, forcePerPage?: number }): Promise<any[]> {
    const walletStore: WalletStore = this.getStore('Wallet');
    const ssvStore: SsvStore = this.getStore('SSV');
    if (!walletStore.accountAddress) return [];
    const { page, per_page } = this.ownerAddressClustersPagination;
    const query = `${walletStore.accountAddress}?page=${forcePage ?? page}&perPage=${this.forceBigList ? 10 : (forcePerPage ?? per_page)}`;
    const response = await clustersByOwnerAddress(query, true);
    if (!response) return [];
    this.ownerAddressClustersPagination = response.pagination;
    this.ownerAddressClusters = await Promise.all(response?.clusters.map((cluster: any) => extendClusterEntity(cluster, walletStore.accountAddress, ssvStore.liquidationCollateralPeriod, ssvStore.minimumLiquidationCollateral))) || [];
    this.ownerAddressClusters = this.ownerAddressClusters.filter((cluster: any) => cluster.validatorCount > 0 || !cluster.isLiquidated);
    return this.ownerAddressClusters;
  }
}

export default MyAccountStore;
