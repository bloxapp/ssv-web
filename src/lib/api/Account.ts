import axios, { HttpStatusCode } from 'axios';
import { Retryable } from 'typescript-retry-decorator';
import config from '~app/common/config';
import { web3 } from 'ssv-keys/dist/tsc/src/lib/helpers/web3.helper';
import { getStoredNetwork } from '~root/providers/networkInfo.provider';

class Account {
    private static instance: Account;
    private readonly baseUrl: string = '';

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    static getInstance(): Account {
        if (!Account.instance) {
            Account.instance = new Account(getStoredNetwork().api);
        }
        return Account.instance;
    }

    async getAccountData(publicKey: string) {
        try {
            const url = `http://localhost:3001/api/v4/holesky/accounts/${web3.utils.toChecksumAddress(publicKey)}`;
            return await this.getData(url, false);
        } catch (e) {
            return null;
        }
    }

    @Retryable(config.retry.default)
    async getData(url: string, skipRetry?: boolean) {
        try {
            return (await axios.get(url)).data;
        } catch (e) {
          if (axios.isAxiosError(e) && (e?.response?.status === 400 || e?.response?.status === 500)) {
            skipRetry = true;
          }
          if (skipRetry) {
              return null;
          }
          throw e;
        }
    }
}

export default Account;
