import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import { useStores } from '~app/hooks/useStores';
import LinkText from '~app/components/common/LinkText';
import { useStyles } from './OperatorSuccessPage.styles';
import BorderScreen from '~app/components/common/BorderScreen';
import HeaderSubHeader from '~app/components/common/HeaderSubHeader';
import PrimaryButton from '~app/components/common/Button/PrimaryButton';
import OperatorStore from '~app/common/stores/applications/SsvWeb/Operator.store';
import ApplicationStore from '~app/common/stores/applications/SsvWeb/Application.store';
import OperatorId from '~app/components/applications/SSV/MyAccount/components/Operator/common/OperatorId';

const SetOperatorFee = () => {
    const stores = useStores();
    const classes = useStyles();
    const history = useHistory();
    // const walletStore: WalletStore = stores.Wallet;
    const operatorStore: OperatorStore = stores.Operator;
    const applicationStore: ApplicationStore = stores.Application;

    const moveToMyAccount = async () => {
        applicationStore.setIsLoading(true);
        setTimeout(() => {
            applicationStore.setIsLoading(false);
            history.push(config.routes.SSV.MY_ACCOUNT.DASHBOARD);
        }, 7000);
    };

    return (
      <BorderScreen
        withoutNavigation
        body={[
          <Grid className={classes.Wrapper}>
            <Grid item className={classes.BackgroundImage} />
            <HeaderSubHeader
              marginBottom={13}
              title={'Welcome to the SSV Network!'}
              subtitle={'Congrats, your operator is live and could now be discoverable by all the network validators.'}
            />
            <Grid container item style={{ marginBottom: 16 }}>
              <Typography className={classes.Text}>Your network identifier is the following:</Typography>
            </Grid>
            <Grid>
              <OperatorId successPage id={operatorStore.newOperatorKeys.id} />
            </Grid>
            <Grid container item style={{ marginBottom: 24 }}>
              <Grid className={classes.Text}>
                Jump into our documentation to learn more about how to <LinkText text={'monitor'} link={'https://docs.ssv.network/run-a-node/operator-node/maintenance/monitoring-grafana'} /> <br />
                and <LinkText text={'troubleshoot'} link={'https://docs.ssv.network/run-a-node/operator-node/maintenance/troubleshooting'} /> your node.</Grid>
            </Grid>
            <Grid container item style={{ marginBottom: 24 }}>
              <Typography className={classes.Text}>To manage your account and operator enter your account
                dashboard.</Typography>
            </Grid>
            <PrimaryButton disable={false} text={'Manage Operator'} submitFunction={moveToMyAccount} />
          </Grid>,
            ]}
        />
    );
};

export default observer(SetOperatorFee);