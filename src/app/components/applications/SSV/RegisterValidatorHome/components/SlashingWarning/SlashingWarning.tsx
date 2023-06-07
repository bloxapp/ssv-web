import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useStores } from '~app/hooks/useStores';
import config, { translations } from '~app/common/config';
import BorderScreen from '~app/components/common/BorderScreen';
import Checkbox from '~app/components/common/CheckBox/CheckBox';
import ValidatorKeyInput from '~app/components/common/AddressKeyInput';
import PrimaryButton from '~app/components/common/Button/PrimaryButton';
import ProcessStore from '~app/common/stores/applications/SsvWeb/Process.store';
import ValidatorStore from '~app/common/stores/applications/SsvWeb/Validator.store';
import NewWhiteWrapper from '~app/components/common/NewWhiteWrapper/NewWhiteWrapper';
import {
  useStyles,
} from '~app/components/applications/SSV/RegisterValidatorHome/components/SlashingWarning/SlashingWarning.styles';

const SlashingWarning = () => {
  const classes = useStyles();
  const stores = useStores();
  const navigate = useNavigate();
  const processStore: ProcessStore = stores.Process;
  const validatorStore: ValidatorStore = stores.Validator;
  const [userAgreed, setUserAgreed] = useState(false);
  const publicKey = validatorStore.keyStorePublicKey || validatorStore.keySharePublicKey;

  const goToConfirmation = () => {
    if (processStore.secondRegistration) {
      navigate(config.routes.SSV.MY_ACCOUNT.CLUSTER.CONFIRMATION_PAGE);
    } else {
      navigate(config.routes.SSV.VALIDATOR.CONFIRMATION_PAGE);
    }
  };

  const MainScreen = <BorderScreen
      blackHeader
      withoutNavigation={processStore.secondRegistration}
      header={translations.VALIDATOR.SLASHING_WARNING.TITLE}
      body={[
        <Grid container>
          <Grid item className={classes.SubHeader}>Validator Public Key</Grid>
          <Grid item xs={12} className={classes.PublicKey}>
            <ValidatorKeyInput withBeaconcha withCopy address={publicKey}/>
          </Grid>
          <Grid item xs={12} className={classes.Text}>
            Running a validator simultaneously to the SSV network will cause slashing to your validator.
          </Grid>
          <Grid item xs={12} className={classes.Text}>
            To avoid slashing, shut down your existing validator setup (if you have one) before importing your validator
            to
            run with our network.
          </Grid>
          <Checkbox
              onClickCallBack={setUserAgreed}
              text={'I understand that running my validator simultaneously in multiple setups will cause slashing to my validator'}
          />
          <PrimaryButton disable={!userAgreed} text={'Next'} dataTestId={'register-validator'}
                         submitFunction={goToConfirmation}
          />
        </Grid>,
      ]}
  />;

  if (processStore.secondRegistration) {
    return (
        <Grid container>
          <NewWhiteWrapper
              type={0}
              header={'Cluster'}
          />
          {MainScreen}
        </Grid>
    );
  }

  return MainScreen;
};

export default observer(SlashingWarning);
