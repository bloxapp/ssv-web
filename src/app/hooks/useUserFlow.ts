import _ from 'underscore';
import { useHistory, useRouteMatch } from 'react-router-dom';
import config from '~app/common/config';
import { useStores } from '~app/hooks/useStores';
// import WalletStore from '~app/common/stores/Abstracts/Wallet';
// import SsvStore from '~app/common/stores/applications/SsvWeb/SSV.store';
import OperatorStore from '~app/common/stores/applications/SsvWeb/Operator.store';
import ValidatorStore from '~app/common/stores/applications/SsvWeb/Validator.store';

const { routes } = config;

export type IUserFlow = {
    name: string,
    depends?: IUserFlow[],
    whiteAppBar?: boolean,
    route: string | string[],
    condition?: () => boolean,
};

const operatorConfirmation: IUserFlow = {
    name: 'Operator Confirmation',
    route: routes.OPERATOR.CONFIRMATION_PAGE,
    condition: () => {
        const stores = useStores();
        const operatorStore: OperatorStore = stores.Operator;
        return !!operatorStore.newOperatorKeys.pubKey && !!operatorStore.newOperatorKeys.name;
    },
};

const importValidatorFlow: IUserFlow = {
    name: 'Import Validator',
    route: routes.VALIDATOR.IMPORT,
    condition: () => {
        const stores = useStores();
        const validatorStore: ValidatorStore = stores.Validator;
        return !!validatorStore.keyStoreFile;
    },
};

const slashingWarningFlow: IUserFlow = {
    name: 'Slashing Warning',
    route: routes.VALIDATOR.SLASHING_WARNING,
    condition: () => {
        const stores = useStores();
        const operatorStore: OperatorStore = stores.Operator;
        return !!operatorStore.selectedEnoughOperators;
    },
};

const validatorConfirmationFlow: IUserFlow = {
    name: 'Validator Confirmation',
    route: routes.VALIDATOR.CONFIRMATION_PAGE,
    depends: [
        slashingWarningFlow,
    ],
    condition: () => {
        const stores = useStores();
        const validatorStore: ValidatorStore = stores.Validator;
        validatorStore;
        // if (!validatorStore.validatorPrivateKey) {
        //   return false;
        // }
        return slashingWarningFlow.condition ? slashingWarningFlow.condition() : true;
    },
};

const successScreen: IUserFlow = {
    name: 'Success Screen',
    route: [
        routes.VALIDATOR.SUCCESS_PAGE,
        routes.OPERATOR.SUCCESS_PAGE,
    ],
    condition: () => {
        const stores = useStores();
        const validatorStore: ValidatorStore = stores.Validator;
        const operatorStore: OperatorStore = stores.Operator;
        return operatorStore.newOperatorRegisterSuccessfully || validatorStore.newValidatorReceipt;
    },
};

const myAccountScreen: IUserFlow = {
    name: 'My Account',
    route: routes.MY_ACCOUNT.DASHBOARD,
};

const EnableAccountScreen: IUserFlow = {
    name: 'Enable Account',
    route: routes.MY_ACCOUNT.ENABLE_ACCOUNT,
    depends: [
        myAccountScreen,
    ],
};

const SingleValidatorScreen: IUserFlow = {
    name: 'Single Validator',
    route: routes.MY_ACCOUNT.VALIDATOR,
    depends: [
        myAccountScreen,
    ],
    whiteAppBar: true,
};

const userFlows: IUserFlow[] = [
    successScreen,
    myAccountScreen,
    EnableAccountScreen,
    importValidatorFlow,
    slashingWarningFlow,
    operatorConfirmation,
    SingleValidatorScreen,
    validatorConfirmationFlow,
];

const dispatchUserFlow = (
    flows: IUserFlow[],
    currentPath: string,
    isDependency: boolean = false,
): IUserFlow | null => {
    for (let i = 0; i < flows.length; i += 1) {
        const flow = flows[i];
        const routeMatched = _.isArray(flow.route)
            ? flow.route.indexOf(currentPath) !== -1
            : currentPath === flow.route;

        if (isDependency || routeMatched) {
            if (typeof flow.condition === 'function') {
                const condition = flow.condition();
                if (!condition) {
                    if (flow.depends?.length) {
                        const requiredFlow = dispatchUserFlow(flow.depends, currentPath, true);
                        return requiredFlow ?? flow;
                    }
                    return flow;
                }
            } else if (flow.depends?.length) {
                return dispatchUserFlow(flow.depends, currentPath, true);
            } else {
                return flow;
            }
        }
    }
    return null;
};

const setUserFlow = (userFlow: string) => {
    localStorage.setItem('userFlow', userFlow);
};

const getUserFlow = () => {
    return localStorage.getItem('userFlow');
};

const useUserFlow = () => {
    const history = useHistory();
    const currentRoute = useRouteMatch();
    const requiredFlow = dispatchUserFlow(userFlows, currentRoute.path);

    let redirectUrl;
    if (requiredFlow) {
        redirectUrl = _.isArray(requiredFlow.route)
            ? requiredFlow.route[0]
            : requiredFlow.route;
    }

    return {
        setUserFlow,
        getUserFlow,
        routes,
        history,
        path: currentRoute.path,
        flows: userFlows,
        requiredFlow,
        redirectUrl,
    };
};

export default useUserFlow;
