import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import config from '~app/common/config';
import { useHistory } from 'react-router-dom';
import { useStores } from '~app/hooks/useStores';
import WalletStore from '~app/common/stores/Abstracts/Wallet';
import { useStyles } from '~app/components/Welcome/Welcome.styles';
import HeaderSubHeader from '~app/common/components/HeaderSubHeader';
import ApplicationStore from '~app/common/stores/Abstracts/Application';
import PrimaryButton from '~app/common/components/Buttons/PrimaryButton';
import SecondaryButton from '~app/common/components/Buttons/SecondaryButton';
import BorderScreen from '~app/components/MyAccount/common/componenets/BorderScreen';

const Welcome = () => {
    const stores = useStores();
    const classes = useStyles();
    const history = useHistory();
    const walletStore: WalletStore = stores.Wallet;
    const applicationStore: ApplicationStore = stores.Application;
    
    const connectToWallet = () => {
        if (walletStore.connected) {
            return applicationStore.showWalletPopUp(true);
        }
        return walletStore.connect();
    };

    return (
      <BorderScreen
        withoutNavigation
        body={[
          <Grid container>
            <HeaderSubHeader
              title={'Join the SSV Network'}
              subtitle={'Run your validator on the decentralized infrastructure of Ethereum staking or help maintain it as one of its operators'}
            />
            <Grid container item className={classes.LinkButtonsWrapper}>
              <Grid item className={classes.LinkButtonWrapper}>
                <SecondaryButton
                  withVerifyConnection
                  text={'Run Validator'}
                  submitFunction={() => { walletStore.connected && history.push(config.routes.VALIDATOR.HOME); }}
                />
              </Grid>
              <Grid item className={classes.LinkButtonWrapper}>
                <SecondaryButton
                  withVerifyConnection
                  text={'Join as Operator'}
                  submitFunction={() => { walletStore.connected && history.push(config.routes.OPERATOR.HOME); }}
                />
              </Grid>
            </Grid>
            {!walletStore.connected && false && (
              <Grid container item className={classes.OrLineWrapper}>
                <Grid item className={classes.Line} xs />
                <Grid item className={classes.Or}>OR</Grid>
                <Grid item className={classes.Line} xs />
              </Grid>
              )}
            {!walletStore.connected && false && (
            <PrimaryButton
              withVerifyConnection
              text={'Connect Wallet'}
              submitFunction={connectToWallet}
              dataTestId={'connect-to-wallet-button'}
            />
            )}
          </Grid>,
        ]}
      />
    );
};

export default observer(Welcome);
