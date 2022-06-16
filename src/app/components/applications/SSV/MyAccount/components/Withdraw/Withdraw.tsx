import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useStores } from '~app/hooks/useStores';
import { formatNumberToUi } from '~lib/utils/numbers';
import Button from '~app/components/common/Button/Button';
import IntegerInput from '~app/components/common/IntegerInput';
import BorderScreen from '~app/components/common/BorderScreen';
import SsvStore from '~app/common/stores/applications/SsvWeb/SSV.store';
import ApplicationStore from '~app/common/stores/Abstracts/Application';
import RemainingDays from '~app/components/applications/SSV/MyAccount/common/componenets/RemainingDays/RemainingDays';
import { useStyles } from './Withdrew.styles';

const Withdraw = () => {
    const classes = useStyles();
    const stores = useStores();
    const ssvStore: SsvStore = stores.SSV;
    const [inputValue, setInputValue] = useState(0.0);
    const applicationStore: ApplicationStore = stores.Application;
    const [userAgree, setUserAgreement] = useState(false);
    const [buttonColor, setButtonColor] = useState({ userAgree: '', default: '' });

    useEffect(() => {
        if (ssvStore.getRemainingDays({ newBalance }) > 30 && userAgree) {
            setUserAgreement(false);
        }
        if (inputValue === ssvStore.contractDepositSsvBalance && ssvStore.isValidatorState) {
            setButtonColor({ userAgree: '#d3030d', default: '#ec1c2640' });
        } else if (buttonColor.default === '#ec1c2640') {
            setButtonColor({ userAgree: '', default: '' });
        }
    }, [inputValue]);

    const withdrawSsv = async () => {
        applicationStore.setIsLoading(true);
        const success = await ssvStore.withdrawSsv(ssvStore.isValidatorState, inputValue.toString(), inputValue === ssvStore.contractDepositSsvBalance);
        applicationStore.setIsLoading(false);
        if (success) setInputValue(0.0);
    };

    function inputHandler(e: any) {
        const value = e.target.value;
        if (value > ssvStore.contractDepositSsvBalance) {
            setInputValue(ssvStore.contractDepositSsvBalance);
        } else if (value < 0) {
            setInputValue(0);
        } else {
            setInputValue(value);
        }
    }

    function maxValue() {
        // @ts-ignore
        setInputValue(ssvStore.toDecimalNumber(Number(ssvStore.contractDepositSsvBalance)));
    }

    const secondBorderScreen = [(
      <Grid item container>
        <Grid container item xs={12} className={classes.BalanceWrapper}>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <IntegerInput
                type="number"
                value={inputValue}
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
    )];

    const newBalance = inputValue ? ssvStore.contractDepositSsvBalance - Number(inputValue) : undefined;
    const errorButton = ssvStore.isValidatorState && ssvStore.getRemainingDays({ newBalance }) === 0;
    const showCheckBox = ssvStore.isValidatorState && ssvStore.getRemainingDays({ newBalance }) <= 30;
    const checkBoxText = errorButton ? 'I understand that withdrawing this amount will liquidate my account.' : 'I understand the risks of having my account liquidated.';
    let buttonText = 'Withdraw';
    if (errorButton) {
        buttonText = 'Liquidate my account';
    } else if (inputValue === ssvStore.contractDepositSsvBalance) {
        buttonText = 'Withdraw All';
    }

    if (ssvStore.isValidatorState) {
     secondBorderScreen.push((<RemainingDays newBalance={newBalance} />));
    }

    return (
      <>
        <BorderScreen
          header={'Available Balance'}
          wrapperClass={classes.FirstSquare}
          body={[
                    (
                      <Grid item container>
                        <Grid item xs={12} className={classes.currentBalance}>
                          {formatNumberToUi(ssvStore.toDecimalNumber(Number(ssvStore.contractDepositSsvBalance)))} SSV
                        </Grid>
                        {/* <Grid item xs={12} className={classes.currentBalanceDollar}> */}
                        {/*  ~$2,449.53 */}
                        {/* </Grid> */}
                      </Grid>
                    ),
                ]}
        />
        <BorderScreen
          withoutNavigation
          header={'Withdraw'}
          body={secondBorderScreen}
          bottom={(
            <Button
              text={buttonText}
              withAllowance={false}
              onClick={withdrawSsv}
              errorButton={errorButton}
              checkboxesText={showCheckBox ? [checkBoxText] : []}
              checkBoxesCallBack={showCheckBox ? [setUserAgreement] : []}
              disable={(ssvStore.isValidatorState && ssvStore.getRemainingDays({ newBalance }) <= 30 && !userAgree) || Number(inputValue) === 0}
            />
          )}
        />
      </>
    );
};

export default observer(Withdraw);
