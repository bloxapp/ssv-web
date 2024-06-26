import { Grid } from '~app/atomicComponents';
import Typography from '@mui/material/Typography';
import BorderScreen from '~app/components/common/BorderScreen';
import ChangeFeeDisplayValues from '~app/components/common/FeeUpdateTo/ChangeFeeDisplayValues';
import ReactStepper from '~app/components/applications/SSV/MyAccount/components/EditFeeFlow/UpdateFee/components/Stepper';
import { IncreaseFlowProps } from '~app/components/applications/SSV/MyAccount/components/EditFeeFlow/UpdateFee/components/IncreaseFlow';
import { StepperSteps, useStyles } from '~app/components/applications/SSV/MyAccount/components/EditFeeFlow/UpdateFee/components/index.styles';
import { PrimaryButton } from '~app/atomicComponents';
import { ButtonSize } from '~app/enums/Button.enum';
import { useAppDispatch } from '~app/hooks/redux.hook.ts';
import { clearOperatorFeeInfo } from '~app/redux/operator.slice.ts';

const PendingExpired = ({ oldFee, newFee, currentCurrency, declareNewFeeHandler }: IncreaseFlowProps) => {
  const classes = useStyles({ step: StepperSteps.EXPIRED });
  const dispatch = useAppDispatch();

  const declareNewFee = () => {
    dispatch(clearOperatorFeeInfo());
    declareNewFeeHandler();
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
              Expired
            </Grid>
          </Grid>
          <ReactStepper step={StepperSteps.EXPIRED} subTextAlign={'center'} />
          <Grid item container className={classes.TextWrapper}>
            <Grid item>
              <Typography>Your declare fee has expired because you have not executed it.</Typography>
            </Grid>
          </Grid>
          <Grid item container className={classes.FeesChangeWrapper}>
            <ChangeFeeDisplayValues negativeArrow={true} currentCurrency={currentCurrency} newFee={newFee} oldFee={oldFee} />
          </Grid>
          <Grid item container className={classes.ButtonsWrapper}>
            <PrimaryButton text={'Declare New Fee'} onClick={declareNewFee} size={ButtonSize.XL} />
          </Grid>
        </Grid>
      ]}
    />
  );
};

export default PendingExpired;
