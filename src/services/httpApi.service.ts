import axios, { AxiosRequestConfig } from 'axios';
import { retryWithDelay } from '~app/decorators/retriable.decorator';
import config from '~app/common/config';

enum HttpResult {
  SUCCESS,
  FAIL,
}

interface IHttpResponse {
  error: string | null;
  data: any | null;
  result: HttpResult
}

const httpErrorMessage = (url: string, errorCode: string, errorMessage: string, customMessage?: string) => `Http request to url ${url} ${customMessage} failed with error code ${errorCode}. Error: ${errorMessage}`;

const httpGeneralErrorMessage = (url: string) => `Http request to url ${url} failed.`;

const putRequest = async (url: string, data?: any, requestConfig?: AxiosRequestConfig): Promise<IHttpResponse> => {
  try {
    const response = await axios.put(url, data, requestConfig);
    return { error: null, data: response.data, result: HttpResult.SUCCESS };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(httpErrorMessage(url, error.code!, error.message, `Data: ${JSON.stringify(data)}`));
      return { error: error.response!.data, data: null, result: HttpResult.FAIL };
    } else {
      return { error: httpGeneralErrorMessage(url), data: null, result: HttpResult.FAIL };
    }
  }
};

const getRequest = async (url: string, skipRetry?: boolean) => {
  try {
    return (await axios.get(url)).data;
  } catch (e) {
    if (skipRetry) {
      return null;
    }
    return await retryWithDelay({ caller: async () => (await axios.get(url)).data, ...config.retry.default });
  }
};

export { putRequest, getRequest };
