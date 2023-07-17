import { createContext } from 'react';
import BaseStore from '~app/common/stores/BaseStore';

const stores = [
  'SSV',
  'Event',
  'Wallet',
  'Faucet',
  'Process',
  'Cluster',
  'Account',
  'Checkbox',
  'Operator',
  'Validator',
  'MyAccount',
  'Application',
  'Distribution',
  'Notifications',
  'OperatorMetadata',
];
const rootStore: Record<string, any> = BaseStore.getInstance().preloadStores(stores);
const rootStoreContext = createContext(rootStore);

export {
  rootStore,
};

export default rootStoreContext;
