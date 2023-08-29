import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import config, { translations } from '~app/common/config';
import Validator from '~lib/api/Validator';
import { useStores } from '~app/hooks/useStores';
import Button from '~app/components/common/Button/Button';
import IntegerInput from '~app/components/common/IntegerInput';
import BorderScreen from '~app/components/common/BorderScreen';
import SsvStore from '~app/common/stores/applications/SsvWeb/SSV.store';
import { useTermsAndConditions } from '~app/hooks/useTermsAndConditions';
import WalletStore from '~app/common/stores/applications/SsvWeb/Wallet.store';
import ClusterStore from '~app/common/stores/applications/SsvWeb/Cluster.store';
import MyAccountStore from '~app/common/stores/applications/SsvWeb/MyAccount.store';
import NewRemainingDays from '~app/components/applications/SSV/MyAccount/common/NewRemainingDays';
import ProcessStore, { SingleCluster } from '~app/common/stores/applications/SsvWeb/Process.store';
import { useStyles } from '~app/components/applications/SSV/MyAccount/components/Withdraw/Withdraw.styles';
import TermsAndConditionsCheckbox from '~app/components/common/TermsAndConditionsCheckbox/TermsAndConditionsCheckbox';

const ValidatorFlow = () => {
  const stores = useStores();
  const classes = useStyles();
  const navigate = useNavigate();
  const ssvStore: SsvStore = stores.SSV;
  const walletStore: WalletStore = stores.Wallet;
  const clusterStore: ClusterStore = stores.Cluster;
  const processStore: ProcessStore = stores.Process;
  const myAccountStore: MyAccountStore = stores.MyAccount;
  const process: SingleCluster = processStore.getProcess;
  const cluster = process.item;
  const clusterBalance = walletStore.fromWei(cluster.balance);
  const [isLoading, setIsLoading] = useState(false);
  const [userAgree, setUserAgreement] = useState(false);
  const { checkedCondition } = useTermsAndConditions();
  const [checkBoxText, setCheckBoxText] = useState('');
  const [errorButton, setErrorButton] = useState(false);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [newBalance, setNewBalance] = useState<string | number>(clusterBalance);
  const [withdrawValue, setWithdrawValue] = useState<number | string>('');
  const [buttonDisableCondition, setButtonDisableCondition] = useState(false);
  const [buttonColor, setButtonColor] = useState({ userAgree: '', default: '' });
  const [buttonText, setButtonText] = useState(translations.VALIDATOR.WITHDRAW.BUTTON.WITHDRAW);

  useEffect(() => {
    if (clusterStore.getClusterRunWay({ ...cluster, balance: walletStore.toWei(newBalance) }) > config.GLOBAL_VARIABLE.CLUSTER_VALIDITY_PERIOD_MINIMUM && userAgree) {
      setUserAgreement(false);
    }
    if (withdrawValue === clusterBalance) {
      setButtonColor({ userAgree: '#d3030d', default: '#ec1c2640' });
    } else if (buttonColor.default === '#ec1c2640') {
      setButtonColor({ userAgree: '', default: '' });
    }

    const balance = (withdrawValue ? clusterBalance - Number(withdrawValue) : clusterBalance).toFixed(18);
    const runWay = clusterStore.getClusterRunWay({ ...cluster, balance: walletStore.toWei(balance) });
    const errorConditionButton = runWay <= 0;
    const showCheckboxCondition = runWay <= config.GLOBAL_VARIABLE.CLUSTER_VALIDITY_PERIOD_MINIMUM;

    setNewBalance(balance);
    setErrorButton(errorConditionButton);
    setShowCheckBox(showCheckboxCondition);
    setButtonDisableCondition(runWay <= config.GLOBAL_VARIABLE.CLUSTER_VALIDITY_PERIOD_MINIMUM && !userAgree || Number(withdrawValue) === 0 || !checkedCondition);

    setCheckBoxText(errorConditionButton && showCheckboxCondition ? translations.VALIDATOR.WITHDRAW.CHECKBOX.LIQUIDATE_MY_CLUSTER : translations.VALIDATOR.WITHDRAW.CHECKBOX.LIQUIDATION_RISK);
    if (errorConditionButton) {
      setButtonText(translations.VALIDATOR.WITHDRAW.BUTTON.LIQUIDATE_MY_CLUSTER);
    } else if (withdrawValue === clusterBalance) {
      setButtonText(translations.VALIDATOR.WITHDRAW.BUTTON.WITHDRAW_ALL);
    } else {
      setButtonText(translations.VALIDATOR.WITHDRAW.BUTTON.WITHDRAW);
    }
  }, [withdrawValue, userAgree, checkedCondition]);

  const withdrawSsv = async () => {
    setIsLoading(true);
    const success = await ssvStore.withdrawSsv(withdrawValue.toString());
    const response = await Validator.getInstance().clusterByHash(clusterStore.getClusterHash(cluster.operators));
    const newCluster = response.cluster;
    newCluster.validator_count = newCluster.validatorCount;
    newCluster.operators = cluster.operators;
    processStore.setProcess({
      processName: 'single_cluster',
      // @ts-ignore
      item: await clusterStore.extendClusterEntity(newCluster),
    }, 2);
    await myAccountStore.getOwnerAddressClusters({});
    setIsLoading(false);
    if (clusterStore.getClusterRunWay({ ...cluster, balance: walletStore.toWei(newBalance) }) <= 0) {
      navigate(-1);
    }
    if (success) {
      setWithdrawValue(0.0);
      navigate(-1);
    }
  };

  function inputHandler(e: any) {
    const value = e.target.value;
    if (value > clusterBalance) {
      setWithdrawValue(clusterBalance);
    } else if (value < 0) {
      setWithdrawValue(0);
    } else if (value === '') {
      setWithdrawValue(value);
    } else {
      setWithdrawValue(Number(value));
    }
  }

  function maxValue() {
    // @ts-ignore
    setWithdrawValue(Number(clusterBalance));
  }

  const secondBorderScreen = [(
      <Grid item container>
        <Grid container item xs={12} className={classes.BalanceWrapper}>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <IntegerInput
                  type="number"
                  value={withdrawValue}
                  placeholder={'0.0'}
                  onChange={inputHandler}
                  className={classes.Balance}
              />
            </Grid>
            <Grid item container xs={6} className={classes.MaxButtonWrapper}>
              <Grid item onClick={maxValue} className={classes.MaxButton}>
                MAX
              </Grid>
              <Grid item className={classes.MaxButtonText}>SSV</Grid>
            </Grid>
            {/* <Grid item xs={12} className={classes.BalanceInputDollar}> */}
            {/*  ~$9485.67 */}
            {/* </Grid> */}
          </Grid>
        </Grid>
      </Grid>
  ), (
      <NewRemainingDays withdrawState isInputFilled={!!withdrawValue} cluster={{ ...cluster, newRunWay: !withdrawValue ? undefined : clusterStore.getClusterRunWay({ ...cluster, balance: walletStore.toWei(newBalance) }) }} />
  )];

  return (
      <BorderScreen
          marginTop={0}
          withoutNavigation
          header={'Withdraw'}
          body={secondBorderScreen}
          bottom={[
              <TermsAndConditionsCheckbox>
                <Button
                  text={buttonText}
                  withAllowance={false}
                  onClick={withdrawSsv}
                  errorButton={errorButton}
                  isLoading={isLoading}
                  checkboxesText={showCheckBox ? [checkBoxText] : []}
                  checkBoxesCallBack={showCheckBox ? [setUserAgreement] : []}
                  disable={buttonDisableCondition}
              />
              </TermsAndConditionsCheckbox>,
          ]}
      />
  );
};

export default observer(ValidatorFlow);
