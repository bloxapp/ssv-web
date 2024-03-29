import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import { useStores } from '~app/hooks/useStores';
import Typography from '@mui/material/Typography';
import WalletStore from '~app/common/stores/Abstracts/Wallet';
import BorderScreen from '~app/components/common/BorderScreen';
import PrimaryButton from '~app/components/common/Button/PrimaryButton';
import { useStyles } from '~app/components/applications/Faucet/ConnectWallet/ConnectWallet.styles';
import { useAppDispatch } from '~app/hooks/redux.hook';
import { setIsShowWalletPopup } from '~app/redux/appState.slice';
import { currentNetworkName, isMainnet } from '~root/providers/networkInfo.provider';
// TODO: reduce to single component for wallet connection
const ConnectWallet = () => {
  const stores = useStores();
  const classes = useStyles();
  const walletStore: WalletStore = stores.Wallet;
  const dispatch = useAppDispatch();

  useEffect(() => {
      if (isMainnet() && walletStore.wallet) {
        // TODO use useSetChain hook instead
          // walletStore.changeNetwork(NETWORKS.HOLESKY);
      }
  }, []);

  const connectToWallet = () => {
    if (walletStore.wallet) {
      dispatch(setIsShowWalletPopup(true));
    } else {
      // walletStore.connect();
    }
  };

  return (
    <BorderScreen
      blackHeader
      withoutNavigation
      header={`SSV Faucet ${currentNetworkName()} Testnet`}
      body={[
        <Grid container>
          <Typography className={classes.SubHeader}>Connect your wallet to receive testnet SSV for testing purposes.</Typography>
          <Grid item className={classes.Warning}>Funds received through the SSV faucet are not real funds and hold no value.</Grid>
          <PrimaryButton children={'Connect Wallet'} submitFunction={connectToWallet} disable={false} withVerifyConnection={false}/>
        </Grid>,
      ]}
    />
  );
};

export default observer(ConnectWallet);
