/**
 * Base store provides singe source of true
 * for keeping all stores instances in one place
 */
class BaseStore {
  protected static stores: Record<string, any> = {};
  protected static instance: BaseStore | null = null;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
  }

  /**
   * Return stores registry to use it in provider and context
   */
  getStores() {
    return BaseStore.stores;
  }

  /**
   * Capitalize store name to match the class name in folder
   * @param name
   */
  capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  applicationStrategy(): string {
      if (process.env.REACT_APP_FAUCET_PAGE) {
          return 'Faucet';
      } if (process.env.REACT_APP_CLAIM_PAGE) {
          return 'Distribution';
      }
      return 'SsvWeb';
  }

  /**
   * Get registered store by name, and if it was not registered before, register it on the fly.
   *
   * Store names should be consistent, example:
   *  contract/ContractValidator.store.ts -> this.getStore('contracts/ContractValidator')
   *  contract/ContractOperator.store.ts  -> this.getStore('contracts/ContractValidator')
   *  foo/FooBar.store.ts                 -> this.getStore('foo/FooBar')
   *
   * In case when useStores() hook is used, you can get store as following, regardless of folder prefix:
   *  const stores = useStores();
   *  const contractValidator: ContractValidator = stores.ContractValidator;
   *  const fooBar: FooBar = stores.FooBar;
   *
   * @param name
   */
  getStore(name: string): any {
    const storeNameParts = name.split('/');
    const storeName = storeNameParts[storeNameParts.length - 1];
    if (!BaseStore.stores[storeName]) {
      // @ts-ignore
      const isTest: boolean = window?.Cypress;
      try {
        const StoreClass = require(`~app/common/stores/applications/${this.applicationStrategy()}/${isTest ? 'WalletTest' : name}.store`).default;
        BaseStore.stores[storeName] = new StoreClass();
      } catch (e: any) {
        console.log('error: ', storeName, e.message);
      }
    }
    return BaseStore.stores[storeName];
  }

  /**
   * Bunch stores loading
   * @param stores
   */
  preloadStores(stores: string[]): Record<string, any> {
    stores.map((store: string) => {
      return this.getStore(store);
    });
    return this.getStores();
  }

  /**
   * Singleton guarantees single source of stores for all usages
   */
  static getInstance() {
    if (!BaseStore.instance) {
      BaseStore.instance = new BaseStore();
    }
    return BaseStore.instance;
  }
}

export default BaseStore;
