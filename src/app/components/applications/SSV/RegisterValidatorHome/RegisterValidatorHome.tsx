import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import config from '~app/common/config';
import { useStores } from '~app/hooks/useStores';
import HeaderSubHeader from '~app/components/common/HeaderSubHeader';
import ValidatorStore from '~app/common/stores/applications/SsvWeb/Validator.store';
import BorderScreen from '~app/components/common/BorderScreen';
import SecondaryButton from '~app/components/common/Button/SecondaryButton/SecondaryButton';
import { useStyles } from '~app/components/applications/SSV/RegisterValidatorHome/RegisterValidatorHome.styles';

const RegisterValidatorHome = () => {
  const classes = useStyles();
  const stores = useStores();
  const history = useHistory();
  const validatorStore: ValidatorStore = stores.Validator;

  useEffect(() => {
      validatorStore.clearValidatorData();
  });

  return (
    <BorderScreen
      body={[
        <Grid container>
          <HeaderSubHeader title={'Run Validator with the SSV Network'}
            subtitle={'Any validator can run on the SSV network: create a new validator or import your existing one to begin'}
          />
          <Grid container item justify={'space-evenly'}>
            <Grid container item className={classes.LinkButtonWrapper}>
              <Grid item xs={12}>
                <SecondaryButton text={'Create Validator'} submitFunction={() => { history.push(config.routes.SSV.VALIDATOR.CREATE); }} />
              </Grid>
            </Grid>
            <Grid container item className={classes.LinkButtonWrapper}>
              <Grid item xs={12}>
                <SecondaryButton text={'Import Validator'} submitFunction={() => { validatorStore.keyStoreFile = null; history.push(config.routes.SSV.VALIDATOR.IMPORT); }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>,
      ]}
    />
  );
};

export default observer(RegisterValidatorHome);
