import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useStores } from '~app/hooks/useStores';
import { useStyles } from './ChangeOperatorName.styles';
import TextInput from '~app/components/common/TextInput';
import InputLabel from '~app/components/common/InputLabel';
import BorderScreen from '~app/components/common/BorderScreen';
import PrimaryButton from '~app/components/common/Button/PrimaryButton';
import WalletStore from '~app/common/stores/applications/SsvWeb/Wallet.store';
import ApplicationStore from '~app/common/stores/applications/SsvWeb/Application.store';

const ChangeOperatorName = () => {
  const stores = useStores();
  const classes = useStyles();
  const walletStore: WalletStore = stores.Wallet;
  const applicationStore: ApplicationStore = stores.Application;
  const [readOnlyState, setReadOnlyState] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  setIsAddressValid;
  const [userInput, setUserInput] = useState('');

  const submitOperatorName = async () => {
    const signatureHash = await walletStore.web3.eth.personal.sign(userInput, walletStore.accountAddress);
    console.log(signatureHash);
    walletStore.web3.eth.personal.ecRecover(userInput, signatureHash, console.log);
    // someSignatureVerificationAPI(message, address, signatureHash)
    applicationStore.setIsLoading(true);
    applicationStore.setIsLoading(false);
  };

  const setOperatorName = async (e: any) => {
    const textInput = e.target.value.trim();
    setUserInput(textInput);
  };

  const submitDisable = userInput.length === 0;

  return (
      <BorderScreen
          blackHeader
          header={'Change Operator Name'}
          body={[
            (
                <Grid container item>
                  <Grid container style={{ gap: 24 }}>
                    <Grid item className={classes.Text}>
                      {/*Enter an Ethereum address that will receive all of your validators block proposal rewards. <LinkText text={'What are proposal rewards?'} link={'http://google.com'} />*/}
                    </Grid>
                  </Grid>
                  <Grid container gap={{ gap: 17 }}>
                    <Grid item container>
                      <InputLabel title="Operator Name" />
                      <TextInput
                          value={userInput}
                          disable={readOnlyState}
                          showError={!isAddressValid}
                          data-testid="new-operator-name"
                          onChangeCallback={setOperatorName}
                          icon={<Grid onClick={()=> setReadOnlyState(false)} className={classes.EditIcon}/>}
                      />
                      {/*<Grid className={classes.ErrorText}>{!isAddressValid ? 'Invalid address, please input a valid Ethereum wallet address' : ''}</Grid>*/}
                    </Grid>
                    <PrimaryButton disable={readOnlyState || submitDisable} text={'Update'} submitFunction={submitOperatorName}/>
                  </Grid>
                </Grid>
            ),
          ]}
      />
  );
};

export default observer(ChangeOperatorName);