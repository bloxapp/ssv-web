import axios from 'axios';
import { Retryable } from 'typescript-retry-decorator';
import config from '~app/common/config';
import { IOperator } from '~app/common/stores/applications/SsvWeb/Operator.store';

type OperatorsListQuery = {
  page?: number,
  search?: string,
  type?: string[],
  perPage?: number
  ordering?: string,
};

type OperatorValidatorListQuery = {
  page?: number,
  perPage?: number
  operatorId: number,
};

class Operator {
  ownerAddress: string = '';
  private static instance: Operator;
  private readonly baseUrl: string = '';

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  static getInstance(): Operator {
    if (!Operator.instance) {
      Operator.instance = new Operator(config.links.SSV_API_ENDPOINT);
    }
    return Operator.instance;
  }

  static get NETWORK() {
    return 'prater';
  }

  /**
   * Get operators by owner Address
   */
  async getOperatorsByOwnerAddress(page: number = 1, perPage: number = 8, ownerAddress: string, skipRetry?: boolean) {
    const url = `${config.links.SSV_API_ENDPOINT}/operators/owned_by/${ownerAddress}?page=${page}&perPage=${perPage}&withFee=true&ts=${new Date().getTime()}&ordering=id:desc`;
    try {
      this.ownerAddress = ownerAddress;
      return await this.getData(url, skipRetry);
    } catch (e) {
      return { operators: [], pagination: {} };
    }
  }

  /**
   * Get operators
   */
  async getOperators(props: OperatorsListQuery, skipRetry?: boolean) {
    const { page, perPage, type, ordering, search } = props;
    let url = `${String(config.links.SSV_API_ENDPOINT)}/operators?`;
    if (search) url += `search=${search}&`;
    if (ordering) url += `ordering=${ordering}&`;
    if (page) url += `page=${page}&`;
    if (perPage) url += `perPage=${perPage}&`;
    if (type?.length) url += `type=${type.join(',')}&`;
    url += `ts=${new Date().getTime()}`;

    try {
      return await this.getData(url, skipRetry);
    } catch (e) {
      return { operators: [], pagination: {} };
    }
  }

  /**
   * Get operator
   */
  async getOperator(operatorId: number | string, skipRetry?: boolean) {
    const url = `${String(config.links.SSV_API_ENDPOINT)}/operators/${operatorId}?performances=24hours&withFee=true&ts=${new Date().getTime()}`;
    try {
      return await this.getData(url, skipRetry);
    } catch (e) {
      return null;
    }
  }

  async getOperatorByPublicKey(publicKey: string) {
    const url = `${String(config.links.SSV_API_ENDPOINT)}/operators/public_key/${publicKey}`;
    try {
      return await this.getData(url, true);
    } catch (e) {
      return null;
    }
  }

  async updateOperatorName(operatorId: string, signature: string, operatorName: string) {
    const url = `${String(config.links.SSV_API_ENDPOINT)}/operators/${operatorId}/metadata`;
    try {
      return (await axios.put(url, {
        operatorName,
        signature,
      })).data;
    } catch (e) {
      throw e;
    }
  }

  async updateOperatorMetadata(operatorId: string, signature: string, operatorMetadata: Record<string, any>) {
    const url = `${String(config.links.SSV_API_ENDPOINT)}/operators/${operatorId}/metadata`;
      return (await axios.put(url, {
        ...operatorMetadata,
        signature,
      })).data;
  }

  async getOperatorNodes(layer: number): Promise<[]> {
    const url = `${String(config.links.SSV_API_ENDPOINT)}/operators/nodes/${layer}`;
    try {
      return await this.getData(url, true);
    } catch (e) {
      return [];
    }
  }

  async getOperatorAvailableLocations(): Promise<[]> {
    const url = `${String(config.links.SSV_API_ENDPOINT)}/operators/locations`;
    try {
      return await this.getData(url, true);
    } catch (e) {
      return [];
    }
  }

  async getOperatorsByIds(operatorIds: number[]): Promise<IOperator[] | boolean> {
    try {
      const promises = operatorIds.map(operatorId => this.getOperator(operatorId, true));
      const responses = await Promise.all(promises);
      for (let response of responses) {
        if (!response) {
          return false;
        }
      }
      return responses;
    } catch (error) {
      return false;
    }
  }


  /**
   * Get operator validators
   */
  async getOperatorValidators(props: OperatorValidatorListQuery, skipRetry?: boolean) {
    const { page, perPage, operatorId } = props;
    const url = `${String(config.links.SSV_API_ENDPOINT)}/validators/in_operator/${operatorId}?page=${page}&perPage=${perPage}&ts=${new Date().getTime()}`;
    try {
      return await this.getData(url, skipRetry);
    } catch (e) {
      return { validators: [], pagination: {} };
    }
  }

  /**
   * Retry few times to get the data
   * @param url
   * @param skipRetry
   */
  @Retryable(config.retry.default)
  async getData(url: string, skipRetry?: boolean) {
    try {
      return (await axios.get(url)).data;
    } catch (e) {
      if (skipRetry) {
        return null;
      }
      throw e;
    }
  }
}

export default Operator;
