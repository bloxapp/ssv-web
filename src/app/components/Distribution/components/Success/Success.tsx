import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStores } from '~app/hooks/useStores';
import HeaderSubHeader from '~app/common/components/HeaderSubHeader';
import SecondaryButton from '~app/common/components/Buttons/SecondaryButton';
import BorderScreen from '~app/components/MyAccount/common/componenets/BorderScreen';
import { useStyles } from '~app/components/Distribution/components/Success/Success.styles';
import DistributionStore from '~app/common/stores/applications/Distribution/Distribution.store';

const Success = () => {
    const stores = useStores();
    const classes = useStyles();
    const distributionStore: DistributionStore = stores.Distribution;

    const openMarketingSite = () => {
        window.open('https://ssv.network/');
    };

    return (
      <BorderScreen
        body={[
          <Grid container className={classes.Wrapper}>
            <HeaderSubHeader
              rewardPage
              title={'Rewards Successfully Claimed!'}
              subtitle={<span>Your tokens have been sent to your wallet. Thank you for participating in the ssv.network testnet<br /> <br />Cant find your tokens?</span>}
            />
            {/* <HeaderSubHeader subtitle={'Can\'t find your tokens?'} /> */}
            <Grid item container className={classes.AddSsvToWallet} onClick={distributionStore.registerSSVTokenInMetamask}>
              <Grid item className={classes.MetaMask} />
              <Typography component={'span'}>Add SSV to Metamask</Typography>
            </Grid>
            <SecondaryButton submitFunction={openMarketingSite} text={'Learn more about the SSV network'} />
          </Grid>,
        ]}
      />
    );
};

export default observer(Success);
