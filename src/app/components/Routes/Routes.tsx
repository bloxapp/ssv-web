import React from 'react';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import config from '~app/common/config';
import Welcome from '~app/components/Welcome';
import MyAccount from '~app/components/MyAccount';
import Layout from '~app/common/components/Layout';
import SuccessScreen from '~app/components/SuccessScreen';
import Deposit from '~app/components/MyAccount/components/Deposit';
import Withdraw from '~app/components/MyAccount/components/Withdraw';
import GenerateOperatorKeys from '~app/components/GenerateOperatorKeys';
import RegisterOperatorHome from '~app/components/RegisterOperatorHome';
import { useStyles } from '~app/common/components/Layout/Layout.styles';
import RegisterValidatorHome from '~app/components/RegisterValidatorHome';
import OperatorTransactionConfirmation from '~app/components/OperatorConfirmation';
import ValidatorTransactionConfirmation from '~app/components/ImportValidatorConfirmation';
import ImportValidator from '~app/components/RegisterValidatorHome/components/ImportValidator';
import CreateValidator from '~app/components/RegisterValidatorHome/components/CreateValidator';
import SlashingWarning from '~app/components/RegisterValidatorHome/components/SlashingWarning';
import FileApproval from '~app/components/RegisterValidatorHome/components/FileApproval/FileApproval';
import DepositViaLaunchpad from '~app/components/RegisterValidatorHome/components/DepositViaLaunchpad';
import SelectOperators from '~app/components/RegisterValidatorHome/components/SelectOperators/SelectOperators';

const Routes = () => {
  const classes = useStyles();

    return (
      <>
        <Switch>
          <Layout layoutClassName={classes.dashboardRoot}>
            <Route path={config.routes.MY_ACCOUNT.DASHBOARD}>
              <Switch>
                <Route exact path={config.routes.MY_ACCOUNT.DASHBOARD}>
                  <MyAccount />
                </Route>
                <Route exact path={config.routes.MY_ACCOUNT.DEPOSIT}>
                  <Deposit />
                </Route>
                <Route exact path={config.routes.MY_ACCOUNT.WITHDRAW}>
                  <Withdraw />
                </Route>
              </Switch>
            </Route>
          </Layout>
        </Switch>
        <Switch>
          <Layout>
            <Route exact path={config.routes.HOME}>
              <Welcome />
            </Route>

            <Route path={config.routes.OPERATOR.HOME}>
              <Switch>
                <Route exact path={config.routes.OPERATOR.HOME}>
                  <RegisterOperatorHome />
                </Route>
                <Route exact path={config.routes.OPERATOR.GENERATE_KEYS}>
                  <GenerateOperatorKeys />
                </Route>
                <Route exact path={config.routes.OPERATOR.CONFIRMATION_PAGE}>
                  <OperatorTransactionConfirmation />
                </Route>
                <Route exact path={config.routes.OPERATOR.SUCCESS_PAGE}>
                  <SuccessScreen />
                </Route>
              </Switch>
            </Route>

            <Route path={config.routes.VALIDATOR.HOME}>
              <Switch>
                <Route exact path={config.routes.VALIDATOR.HOME}>
                  <RegisterValidatorHome />
                </Route>
                <Route exact path={config.routes.VALIDATOR.IMPORT}>
                  <ImportValidator />
                </Route>
                <Route exact path={config.routes.VALIDATOR.SLASHING_WARNING}>
                  <SlashingWarning />
                </Route>
                <Route exact path={config.routes.VALIDATOR.CREATE}>
                  <CreateValidator />
                </Route>
                <Route exact path={config.routes.VALIDATOR.DEPOSIT_VALIDATOR}>
                  <DepositViaLaunchpad />
                </Route>
                <Route exact path={config.routes.VALIDATOR.DECRYPT}>
                  <FileApproval />
                </Route>
                <Route exact path={config.routes.VALIDATOR.SELECT_OPERATORS}>
                  <SelectOperators />
                </Route>
                <Route exact path={config.routes.VALIDATOR.CONFIRMATION_PAGE}>
                  <ValidatorTransactionConfirmation />
                </Route>
                <Route exact path={config.routes.VALIDATOR.SUCCESS_PAGE}>
                  <SuccessScreen />
                </Route>
              </Switch>
            </Route>
          </Layout>
        </Switch>
      </>
    );
};

export default observer(Routes);
