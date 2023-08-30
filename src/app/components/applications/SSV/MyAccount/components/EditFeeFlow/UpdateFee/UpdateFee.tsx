import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import Operator from '~lib/api/Operator';
import { useStores } from '~app/hooks/useStores';
import { formatNumberToUi } from '~lib/utils/numbers';
import WhiteWrapper from '~app/components/common/WhiteWrapper';
import { validateFeeUpdate } from '~lib/utils/validatesInputs';
import SsvStore from '~app/common/stores/applications/SsvWeb/SSV.store';
import WalletStore from '~app/common/stores/applications/SsvWeb/Wallet.store';
import OperatorStore from '~app/common/stores/applications/SsvWeb/Operator.store';
import { ErrorType } from '~app/components/common/ConversionInput/ConversionInput';
import ApplicationStore from '~app/common/stores/applications/SsvWeb/Application.store';
import OperatorId from '~app/components/applications/SSV/MyAccount/components/OperatorId';
import CancelUpdateFee from '~app/components/applications/SSV/MyAccount/components/EditFeeFlow/CancelUpdateFee';
import { useStyles } from '~app/components/applications/SSV/MyAccount/components/EditFeeFlow/UpdateFee/UpdateFee.styles';
import ChangeFee from '~app/components/applications/SSV/MyAccount/components/EditFeeFlow/UpdateFee/components/ChangeFee';
import IncreaseFlow from '~app/components/applications/SSV/MyAccount/components/EditFeeFlow/UpdateFee/components/IncreaseFlow';
import DecreaseFlow from '~app/components/applications/SSV/MyAccount/components/EditFeeFlow/UpdateFee/components/DecreaseFlow';

export type UpdateFeeProps = {
  error: ErrorType;
  nextIsDisabled: boolean;
  onNextHandler: Function;
  onChangeHandler: Function;
  newFee: number | string;
  oldFee: number | string;
  currency: string;
  setCurrency: Function;
  declareNewFeeHandler: Function
};

// eslint-disable-next-line no-unused-vars
enum FeeUpdateSteps {
  // eslint-disable-next-line no-unused-vars
  START = 'Start',
  // eslint-disable-next-line no-unused-vars
  INCREASE = 'Increase',
  // eslint-disable-next-line no-unused-vars
  DECREASE = 'Decrease',
}

const UpdateFee = () => {
  const stores = useStores();
  const navigate = useNavigate();
  const ssvStore: SsvStore = stores.SSV;
  const walletStore: WalletStore = stores.Wallet;
  const operatorStore: OperatorStore = stores.Operator;
  const [operator, setOperator] = useState<any>(null);
  const applicationStore: ApplicationStore = stores.Application;
  const [newFee, setNewFee] = useState<any>(0);
  const [nextIsDisabled, setNextIsDisabled] = useState(true);
  const { logo, id } = operator || {};
  const [oldFee, setOldFee] = useState(0);
  const classes = useStyles({ operatorLogo: logo });
  const [currency, setCurrency] = useState('SSV');
  const [currentFlowStep, setCurrentFlowStep] = useState(FeeUpdateSteps.START);
  const [error, setError] = useState({ shouldDisplay: false, errorMessage: '' });

  useEffect(() => {
    if (!operatorStore.processOperatorId) return navigate(applicationStore.strategyRedirect);
    applicationStore.setIsLoading(true);
    Operator.getInstance().getOperator(operatorStore.processOperatorId).then(async (response: any) => {
      if (response) {
        const operatorFee = ssvStore.getFeeForYear(walletStore.fromWei(response.fee));
        setOperator(response);
        setOldFee(Number(operatorFee));
        if (!operatorStore.operatorFutureFee) {
          setNewFee(Number(operatorFee));
        }
        await operatorStore.syncOperatorFeeInfo(response.id);
        if (operatorStore.operatorApprovalBeginTime && operatorStore.operatorApprovalEndTime && operatorStore.operatorFutureFee){
          setNewFee(formatNumberToUi(ssvStore.getFeeForYear(walletStore.fromWei(operatorStore.operatorFutureFee))));
          setCurrentFlowStep(FeeUpdateSteps.INCREASE);
        } else {
          setCurrentFlowStep(FeeUpdateSteps.START);
        }
      }
      applicationStore.setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (error.shouldDisplay || Number(newFee) === Number(oldFee)) {
      setNextIsDisabled(true);
    } else {
      setNextIsDisabled(false);
    }
  }, [newFee, error]);

  const declareNewFeeHandler = () => {
    setCurrentFlowStep(FeeUpdateSteps.START);
  };

  const updateFeeErrorHandler = (errorResponse: ErrorType ) => {
    setError(errorResponse);
    if (errorResponse.shouldDisplay) {
      setNextIsDisabled(true);
    } else {
      setNextIsDisabled(false);
    }
  };

  const onInputChange = ( e : any ) => {
    const { value } = e.target;
    setNewFee(value.trim());
    validateFeeUpdate(Number(formatNumberToUi(ssvStore.getFeeForYear(walletStore.fromWei(operator.fee)))), value, operatorStore.maxFeeIncrease, updateFeeErrorHandler);
  };

  const onNextHandler = () => {
    operatorStore.clearOperatorFeeInfo();
    if (Number(newFee) > oldFee) {
      setCurrentFlowStep(FeeUpdateSteps.INCREASE);
    } else {
      setCurrentFlowStep(FeeUpdateSteps.DECREASE);
    }
  };

  const components = {
    [FeeUpdateSteps.START]: ChangeFee,
    [FeeUpdateSteps.INCREASE]: IncreaseFlow,
    [FeeUpdateSteps.DECREASE]: DecreaseFlow,
  };
  const Component = components[currentFlowStep];

  return (
      <Grid container item>
        <WhiteWrapper header={'Update Operator Fee'}>
          <OperatorId id={id}/>
        </WhiteWrapper>
        <Grid className={classes.BodyWrapper}>
          <Component onNextHandler={onNextHandler}
                     declareNewFeeHandler={declareNewFeeHandler}
                     newFee={newFee}
                     onChangeHandler={onInputChange}
                     error={error}
                     nextIsDisabled={nextIsDisabled}
                     currency={currency}
                     oldFee={oldFee}
                     setCurrency={setCurrency}   />
          <CancelUpdateFee/>
        </Grid>
      </Grid>
  );
};

export default observer(UpdateFee);
