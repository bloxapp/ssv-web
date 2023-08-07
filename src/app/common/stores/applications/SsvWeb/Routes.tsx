import { observer } from 'mobx-react';
import React, { lazy, Suspense } from 'react';
import { Route, Routes as Wrapper } from 'react-router-dom';
import config from '~app/common/config';
import Layout from '~app/components/common/Layout';
import { SsvAppBar } from '~app/components/common/AppBar';
const Welcome = lazy(() => import('~app/components/applications/SSV/Welcome/Welcome'));
const FeeRecipient = lazy(() => import('~app/components/applications/SSV/FeeRecipient'));
const SetOperatorFee = lazy(() => import('~app/components/applications/SSV/SetOperatorFee'));
const Deposit = lazy(() => import('~app/components/applications/SSV/MyAccount/components/Deposit'));
const CountryNotSupported = lazy(() => import('~app/components/applications/SSV/CountryNotSupported'));
const OperatorSuccessPage = lazy(() => import('~app/components/applications/SSV/OperatorSuccessPage'));
const GenerateOperatorKeys = lazy(() => import('~app/components/applications/SSV/GenerateOperatorKeys'));
const RegisterOperatorHome = lazy(() => import('~app/components/applications/SSV/RegisterOperatorHome'));
const NewWithdraw = lazy(() => import('~app/components/applications/SSV/MyAccount/components/Withdraw'));
const RegisterValidatorHome = lazy(() => import('~app/components/applications/SSV/RegisterValidatorHome'));
const ValidatorSuccessScreen = lazy(() => import('~app/components/applications/SSV/ValidatorSuccessScreen'));
const SingleOperator = lazy(() => import('~app/components/applications/SSV/MyAccount/components/SingleOperator'));
const RemoveOperator = lazy(() => import('~app/components/applications/SSV/MyAccount/components/RemoveOperator'));
const UpdateFee = lazy(() => import('~app/components/applications/SSV/MyAccount/components/EditFeeFlow/UpdateFee'));
const OperatorTransactionConfirmation = lazy(() => import('~app/components/applications/SSV/OperatorConfirmation'));
const ClusterDashboard = lazy(() => import('~app/components/applications/SSV/MyAccount/components/ClusterDashboard'));
const ImportFile = lazy(() => import('~app/components/applications/SSV/RegisterValidatorHome/components/ImportFile'));
const ReactivateCluster = lazy(()=> import('~app/components/applications/SSV/MyAccount/components/ReactivateCluster'));
const OperatorDashboard = lazy(() => import('~app/components/applications/SSV/MyAccount/components/OperatorDashboard'));
const FundingPeriod = lazy(() => import('~app/components/applications/SSV/RegisterValidatorHome/components/FundingPeriod'));
const EditOperatorDetails = lazy(() => import('~app/components/applications/SSV/MyAccount/components/EditOperatorDetails'));
const SingleValidator = lazy(() => import('~app/components/applications/SSV/MyAccount/components/Validator/SingleCluster'));
const CreateValidator = lazy(() => import('~app/components/applications/SSV/RegisterValidatorHome/components/CreateValidator'));
const SlashingWarning = lazy(() => import('~app/components/applications/SSV/RegisterValidatorHome/components/SlashingWarning'));
const SelectOperators = lazy(() => import('~app/components/applications/SSV/RegisterValidatorHome/components/SelectOperators'));
const ValidatorTransactionConfirmation = lazy(() => import('~app/components/applications/SSV/ValidatorRegistrationConfirmation'));
const EditValidator = lazy(() => import('~app/components/applications/SSV/MyAccount/components/Validator/EditFlow/EditValidator'));
const GenerateKeyShares = lazy(() => import('~app/components/applications/SSV/RegisterValidatorHome/components/GenerateKeyShares'));
const UploadKeyStore = lazy(() => import('~app/components/applications/SSV/MyAccount/components/Validator/EditFlow/UploadKeyStore'));
const FundingNewValidator = lazy(() => import('~app/components/applications/SSV/MyAccount/components/Validator/FundingNewValidator'));
const DepositViaLaunchpad = lazy(() => import('~app/components/applications/SSV/RegisterValidatorHome/components/DepositViaLaunchpad'));
const RemoveValidator = lazy(() => import('~app/components/applications/SSV/MyAccount/components/Validator/RemoveFlow/RemoveValidator'));
const AccountBalanceAndFee = lazy(() => import('~app/components/applications/SSV/RegisterValidatorHome/components/AccountBalanceAndFee'));
const OfflineKeyShareGeneration = lazy(() => import('~app/components/applications/SSV/RegisterValidatorHome/components/OfflineKeyShareGeneration'));
const ConfirmOperatorsChange = lazy(() => import('~app/components/applications/SSV/MyAccount/components/Validator/EditFlow/ConfirmOperatorsChange'));
const MetadataConfirmationPage = lazy(() => import('~app/components/applications/SSV/MyAccount/components/EditOperatorDetails/MetadataConfirmationPage'));

const Routes: any = () => {
  const ssvRoutes = config.routes.SSV;

  const dashboardRoutes: any = [
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.DEPOSIT, Component: Deposit },
    { path: ssvRoutes.MY_ACCOUNT.OPERATOR.ROOT, Component: SingleOperator },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.ROOT, Component: SingleValidator },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.WITHDRAW, Component: NewWithdraw },
    { path: ssvRoutes.MY_ACCOUNT.OPERATOR.WITHDRAW, Component: NewWithdraw },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER_DASHBOARD, Component: ClusterDashboard },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.FEE_RECIPIENT, Component: FeeRecipient },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.UPLOAD_KEY_STORE, Component: ImportFile },
    { path: ssvRoutes.MY_ACCOUNT.KEYSHARE_UPLOAD_UNSAFE, Component: ImportFile, keyShares: true  },
    { path: ssvRoutes.MY_ACCOUNT.OPERATOR.REMOVE.ROOT, Component: RemoveOperator },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.REACTIVATE, Component: ReactivateCluster },
    { path: ssvRoutes.MY_ACCOUNT.OPERATOR_DASHBOARD, Component: OperatorDashboard },
    { path: ssvRoutes.MY_ACCOUNT.OPERATOR.META_DATA, Component: EditOperatorDetails },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.SLASHING_WARNING, Component: SlashingWarning },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.ADD_VALIDATOR, Component: FundingNewValidator },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.SUCCESS_PAGE, Component: ValidatorSuccessScreen },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.VALIDATOR_REMOVE.ROOT, Component: RemoveValidator },
    { path: ssvRoutes.MY_ACCOUNT.OPERATOR.UPDATE_FEE.ROOT, Component: UpdateFee, index: true },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.UPLOAD_KEYSHARES, Component: ImportFile, keyShares: true },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.DISTRIBUTE_OFFLINE, Component: OfflineKeyShareGeneration },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.DISTRIBUTION_METHOD_START, Component: GenerateKeyShares  },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.VALIDATOR_UPDATE.ENTER_KEYSTORE, Component: UploadKeyStore },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.VALIDATOR_UPDATE.CHOOSE_OPERATORS, Component: EditValidator },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.VALIDATOR_UPDATE.SUCCESS, Component: ConfirmOperatorsChange },
    { path: ssvRoutes.MY_ACCOUNT.OPERATOR.META_DATA_CONFIRMATION, Component: MetadataConfirmationPage },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.CONFIRMATION_PAGE, Component: ValidatorTransactionConfirmation },
    { path: ssvRoutes.MY_ACCOUNT.CLUSTER.VALIDATOR_UPDATE.CONFIRM_TRANSACTION, Component: ConfirmOperatorsChange },
  ];

  const operatorRoutes = [
    { path: ssvRoutes.OPERATOR.SET_FEE_PAGE, Component: SetOperatorFee },
    { path: ssvRoutes.OPERATOR.SUCCESS_PAGE, Component: OperatorSuccessPage },
    { path: ssvRoutes.OPERATOR.GENERATE_KEYS, Component: GenerateOperatorKeys },
    { path: ssvRoutes.OPERATOR.CONFIRMATION_PAGE, Component: OperatorTransactionConfirmation },
  ];


  const validatorsRoutes = [
    { path: ssvRoutes.VALIDATOR.IMPORT, Component: ImportFile },
    { path: ssvRoutes.VALIDATOR.CREATE, Component: CreateValidator },
    { path: ssvRoutes.VALIDATOR.SELECT_OPERATORS, Component: SelectOperators },
    { path: ssvRoutes.VALIDATOR.SLASHING_WARNING, Component: SlashingWarning },
    { path: ssvRoutes.VALIDATOR.FUNDING_PERIOD_PAGE, Component: FundingPeriod },
    { path: ssvRoutes.VALIDATOR.SUCCESS_PAGE, Component: ValidatorSuccessScreen },
    { path: ssvRoutes.VALIDATOR.DEPOSIT_VALIDATOR, Component: DepositViaLaunchpad },
    { path: ssvRoutes.VALIDATOR.DISTRIBUTION_METHOD.START, Component: GenerateKeyShares },
    { path: ssvRoutes.VALIDATOR.ACCOUNT_BALANCE_AND_FEE, Component: AccountBalanceAndFee },
    { path: ssvRoutes.VALIDATOR.CONFIRMATION_PAGE, Component: ValidatorTransactionConfirmation },
    { path: ssvRoutes.VALIDATOR.DISTRIBUTION_METHOD.DISTRIBUTE_OFFLINE, Component: OfflineKeyShareGeneration },
    { path: ssvRoutes.VALIDATOR.DISTRIBUTION_METHOD.UPLOAD_KEYSHARES, Component: ImportFile, keyShares: true },
  ];

  return (
      <Layout>
        <SsvAppBar/>
        <Suspense fallback={<div className="container"></div>}>
          <Wrapper>
            <Route path={config.routes.COUNTRY_NOT_SUPPORTED} element={<CountryNotSupported />} />
            <Route path={ssvRoutes.ROOT} element={<Welcome />} />
            <Route path={ssvRoutes.MY_ACCOUNT.ROOT}>
              {dashboardRoutes.map((route: any, index: number) => {
                if (!route.keyShares) return <Route key={index} path={route.path} element={<route.Component/>}/>;
                return <Route key={index} path={route.path} element={<route.Component type={2}/>}/>;
              })}
            </Route>
            <Route path={ssvRoutes.OPERATOR.HOME}>
              <Route index element={<RegisterOperatorHome/>}/>
              {operatorRoutes.map((route, index: number) => {
                return <Route key={index} path={route.path} element={<route.Component/>}/>;
              })}
            </Route>
            <Route path={ssvRoutes.VALIDATOR.HOME}>
              <Route index element={<RegisterValidatorHome/>}/>
              {validatorsRoutes.map((route, index: number) => {
                if (!route.keyShares) return <Route key={index} path={route.path} element={<route.Component/>}/>;
                return <Route key={index} path={route.path} element={<route.Component type={2}/>}/>;
              })}
            </Route>
          </Wrapper>
        </Suspense>
      </Layout>
  );
};

export default observer(Routes);
