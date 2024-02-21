import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStores } from '~app/hooks/useStores';
import { translations } from '~app/common/config';
import { BULK_FLOWS } from '~app/common/stores/applications/SsvWeb/processes/SingleCluster';
import NewBulkActions from '~app/components/applications/SSV/MyAccount/components/Validator/BulkActions/NewBulkActions';
import ExitFinishPage from '~app/components/applications/SSV/MyAccount/components/Validator/BulkActions/ExitFinishPage';
import ConfirmationStep
  from '~app/components/applications/SSV/MyAccount/components/Validator/BulkActions/ConfirmationStep';
import {
  IOperator,
  ProcessStore,
  ValidatorStore,
  SingleCluster as SingleClusterProcess,
} from '~app/common/stores/applications/SsvWeb';
import { conditionalExecutor } from '~root/services/utils.service';

enum BULK_STEPS {
  BULK_ACTIONS = 'BULK_ACTIONS',
  BULK_CONFIRMATION = 'BULK_CONFIRMATION',
  BULK_EXIT_FINISH = 'BULK_EXIT_FINISH',
}

const BULK_FLOWS_ACTION_TITLE = {
  [BULK_FLOWS.BULK_REMOVE]: translations.VALIDATOR.REMOVE_EXIT_VALIDATOR.BULK_TITLES.SELECT_REMOVE_VALIDATORS,
  [BULK_FLOWS.BULK_EXIT]: translations.VALIDATOR.REMOVE_EXIT_VALIDATOR.BULK_TITLES.SELECT_EXIT_VALIDATORS,
};

const BULK_FLOWS_CONFIRMATION_DATA = {
  [BULK_FLOWS.BULK_REMOVE]: translations.VALIDATOR.REMOVE_EXIT_VALIDATOR.FLOW_CONFIRMATION_DATA.REMOVE,
  [BULK_FLOWS.BULK_EXIT]: translations.VALIDATOR.REMOVE_EXIT_VALIDATOR.FLOW_CONFIRMATION_DATA.EXIT,
};

const BulkComponent = () => {
  const [selectedValidators, setSelectedValidators] = useState<string[]>([]);
  const stores = useStores();
  const processStore: ProcessStore = stores.Process;
  const validatorStore: ValidatorStore = stores.Validator;
  const process: SingleClusterProcess = processStore.getProcess;
  const navigate = useNavigate();
  const currentBulkFlow = process.currentBulkFlow;
  const [currentStep, setCurrentStep] = useState(BULK_STEPS.BULK_ACTIONS);

  useEffect(() => {
    if (process.validator) {
      setSelectedValidators([process.validator.public_key]);
      setCurrentStep(BULK_STEPS.BULK_CONFIRMATION);
    }
  }, []);

  const selectUnselectAllValidators = (publicKeys: string[]) => {
    let nextState = publicKeys;
    if (selectedValidators.length === publicKeys.length || selectedValidators.length > 0) {
      nextState = [];
    }
    setSelectedValidators(nextState);
  };

  const onCheckboxClickHandler = (isChecked: boolean, publicKey: string) => {
    if (isChecked && !selectedValidators.includes(publicKey)) {
      setSelectedValidators((prevState: string[]) => [...prevState, publicKey]);
    } else {
      setSelectedValidators((prevState: string[]) => prevState.filter((key: string) => key !== publicKey));
    }
  };

  const backToSingleClusterPage = () => {
    process.validator = undefined;
    navigate(-1);
  };

  const nextStep = async () => {
    let res;
    const condition = selectedValidators.length === 1;
    if (currentStep === BULK_STEPS.BULK_ACTIONS) {
      setCurrentStep(BULK_STEPS.BULK_CONFIRMATION);
    } else if (currentStep === BULK_STEPS.BULK_CONFIRMATION && currentBulkFlow === BULK_FLOWS.BULK_EXIT) {
      res = await conditionalExecutor(condition, async () => await validatorStore.exitValidator(`0x${selectedValidators[0]}`, process.item.operators.map((operator: IOperator) => operator.id)), async () => await validatorStore.bulkExitValidators(selectedValidators.map((publicKey: string) => `0x${publicKey}`), process.item.operators.map((operator: IOperator) => operator.id)));
      if (res) {
        setCurrentStep(BULK_STEPS.BULK_EXIT_FINISH);
      }
    } else if (currentStep === BULK_STEPS.BULK_EXIT_FINISH) {
      backToSingleClusterPage();
    } else {
      res = await conditionalExecutor(condition, async () => await validatorStore.removeValidator(`0x${process?.validator?.public_key || selectedValidators[0]}`, process.item.operators), async () => await validatorStore.bulkRemoveValidators(selectedValidators.map((publicKey: string) => `0x${publicKey}`), process.item.operators.map((operator: IOperator) => operator.id)));
      if (res) {
        backToSingleClusterPage();
      }
    }
  };

  if (currentStep === BULK_STEPS.BULK_ACTIONS) {
    return <NewBulkActions nextStep={nextStep}
                           title={BULK_FLOWS_ACTION_TITLE[currentBulkFlow ?? BULK_FLOWS.BULK_REMOVE]}
                           selectUnselectAllValidators={selectUnselectAllValidators}
                           selectedValidators={selectedValidators}
                           onCheckboxClickHandler={onCheckboxClickHandler}/>;
  }

  if (currentStep === BULK_STEPS.BULK_CONFIRMATION) {
    return  <ConfirmationStep
          flowData={BULK_FLOWS_CONFIRMATION_DATA[currentBulkFlow ?? BULK_FLOWS.BULK_REMOVE]}
          selectedValidators={selectedValidators} nextStep={nextStep}/>;
  }

  // BULK_STEPS.BULK_EXIT_FINISH === currentStep
  return <ExitFinishPage nextStep={nextStep} selectedValidators={selectedValidators}/>;
};

export default BulkComponent;