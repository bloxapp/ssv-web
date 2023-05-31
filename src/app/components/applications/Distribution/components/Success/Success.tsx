import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import { useStores } from '~app/hooks/useStores';
import Typography from '@mui/material/Typography';
import BorderScreen from '~app/components/common/BorderScreen';
import HeaderSubHeader from '~app/components/common/HeaderSubHeader';
import GoogleTagManager from '~lib/analytics/GoogleTag/GoogleTagManager';
import SecondaryButton from '~app/components/common/Button/SecondaryButton';
import DistributionStore from '~app/common/stores/applications/Distribution/Distribution.store';
import { useStyles } from '~app/components/applications/Distribution/components/Success/Success.styles';

const Success = () => {
  const stores = useStores();
  const classes = useStyles();
  const distributionStore: DistributionStore = stores.Distribution;

  const openMarketingSite = () => {
    GoogleTagManager.getInstance().sendEvent({
      category: 'external_link',
      action: 'click',
      label: 'Learn more about the SSV network',
    });
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
          <Grid item container className={classes.AddSsvToWallet}
            onClick={distributionStore.registerSSVTokenInMetamask}>
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
