import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useStores } from '~app/hooks/useStores';
import BorderScreen from '~app/components/common/BorderScreen';
import PrimaryButton from '~app/components/common/Button/PrimaryButton';
import OperatorStore from '~app/common/stores/applications/SsvWeb/Operator.store';
import ApplicationStore from '~app/common/stores/applications/SsvWeb/Application.store';
import ChangeFeeDisplayValues from '~app/components/common/FeeUpdateTo/ChangeFeeDisplayValues';
import ReactStepper from '~app/components/applications/SSV/MyAccount/components/EditFeeFlow/UpdateFee/components/Stepper';
import { IncreaseFlowProps } from '~app/components/applications/SSV/MyAccount/components/EditFeeFlow/UpdateFee/components/IncreaseFlow';
import { useStyles, StepperSteps } from '~app/components/applications/SSV/MyAccount/components/EditFeeFlow/UpdateFee/components/index.styles';

const DeclareFee = ({ newFee, oldFee, currentCurrency, getCurrentState }: IncreaseFlowProps) => {
  const stores = useStores();
  const classes = useStyles({});
  const operatorStore: OperatorStore = stores.Operator;
  const applicationStore: ApplicationStore = stores.Application;

  const changeOperatorFee = async () => {
    applicationStore.setIsLoading(true);
    const response = await operatorStore.updateOperatorFee(operatorStore.processOperatorId, newFee);
    await operatorStore.syncOperatorFeeInfo(operatorStore.processOperatorId);
    if (response) {
      // @ts-ignore
      let savedOperator = JSON.parse(window.localStorage.getItem('expired_operators'));
      if (savedOperator && savedOperator?.includes(operatorStore.processOperatorId)) {
        savedOperator = savedOperator.filter((item: any) => item !== operatorStore.processOperatorId);
        window.localStorage.setItem('expired_operators', JSON.stringify(savedOperator));
      }
    }
    getCurrentState();
    applicationStore.setIsLoading(false);
  };

  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
  };

  const secondsToDhms = (seconds: any) => {
    // eslint-disable-next-line no-param-reassign
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    // eslint-disable-next-line no-mixed-operators
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    // eslint-disable-next-line no-mixed-operators
    const m = Math.floor(seconds % 3600 / 60);
    if (d > 0) return d + (d === 1 ? ' day' : ' days');
    if (h > 0) return h + (h === 1 ? ' hour' : ' hours');
    if (m > 0) return m + (m === 1 ? ' minute' : ' minutes');
    return '0 day';
  };

  return (
      <BorderScreen
          blackHeader
          withoutNavigation
          body={[
            <Grid container item>
              <Grid container item className={classes.HeaderWrapper}>
                <Grid item>
                  <Typography className={classes.Title}>Update Fee</Typography>
                </Grid>
                <Grid item className={classes.Step}>
                  Declare Fee
                </Grid>
              </Grid>
              <ReactStepper
                  step={StepperSteps.DECLARE_FEE}
                  subTextAlign={'left'}
                  subText={currentDate.toLocaleString('en-US', options)}
              />
              <Grid item container className={classes.TextWrapper}>
                <Grid item>
                  <Typography>Increasing your operator fee is done in a few steps:</Typography>
                </Grid>
                <Grid item>
                  <Typography>Process starts by declaring a new fee, which is followed by
                    a <b>{secondsToDhms(operatorStore.declaredOperatorFeePeriod)} waiting period</b> in which your
                    managed validators are notified. <br/>
                    Once the waiting period has past you could finalize your new fee by <br/> executing it.</Typography>
                </Grid>
              </Grid>
              <Grid item container className={classes.InputWrapper}>
                <Grid item container>
                    <ChangeFeeDisplayValues   currentCurrency={currentCurrency} newFee={newFee} oldFee={oldFee}/>
                </Grid>
                <Grid item container style={{ marginBottom: 40 }}>
                </Grid>
              </Grid>
              <Grid item className={classes.Notice}>
                <Grid item className={classes.BulletsWrapper}>
                  <ul>
                    <li>Not executing or canceling your declared fee will cause it to expire within 10 days.</li>
                    <li> You can always cancel your declared fee (your managed validators will be notified
                      accordingly).
                    </li>
                  </ul>
                </Grid>
              </Grid>
              <PrimaryButton text={'Declare New Fee'}
                             submitFunction={changeOperatorFee}/>
            </Grid>,
          ]}
      />
  );
};

export default observer(DeclareFee);