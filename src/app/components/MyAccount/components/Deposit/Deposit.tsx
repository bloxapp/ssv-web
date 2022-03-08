import { observer } from 'mobx-react';
// import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useStores } from '~app/hooks/useStores';
import useUserFlow from '~app/hooks/useUserFlow';
import { formatNumberToUi } from '~lib/utils/numbers';
// import CTAButton from '~app/common/components/CTAButton';
import config, { translations } from '~app/common/config';
import IntegerInput from '~app/common/components/IntegerInput';
import SsvStore from '~app/common/stores/applications/SsvWeb/SSV.store';
import BorderScreen from '~app/components/MyAccount/common/componenets/BorderScreen';
import RemainingDays from '~app/components/MyAccount/common/componenets/RemainingDays';
import { useStyles } from './Deposit.styles';
import PrimaryWithAllowance from '~app/common/components/Buttons/PrimaryWithAllowance/PrimaryWithAllowance';

const Deposit = () => {
    const stores = useStores();
    const classes = useStyles();
    const ssvStore: SsvStore = stores.SSV;
    const { redirectUrl, history } = useUserFlow();
    const [inputValue, setInputValue] = useState(0.0);

    useEffect(() => {
        redirectUrl && history.push(redirectUrl);
    }, [redirectUrl]);

    const depositSsv = async () => {
        await ssvStore.deposit(inputValue.toString());
        setInputValue(0.0);
    };
    depositSsv;

    return (
      <div>
        <BorderScreen
          header={'Deposit'}
          navigationLink={config.routes.MY_ACCOUNT.DASHBOARD}
          navigationText={translations.MY_ACCOUNT.DEPOSIT.NAVIGATION_TEXT}
          body={[
                    (
                      <Grid item container>
                        <Grid container item xs={12} className={classes.BalanceWrapper}>
                          <Grid item container xs={12}>
                            <Grid item xs={6}>
                              <IntegerInput
                                type="number"
                                onChange={(e) => { // @ts-ignore
                                                setInputValue(e.target.value); }}
                                value={inputValue}
                                className={classes.Balance}
                              />
                            </Grid>
                            <Grid item container xs={6} className={classes.MaxButtonWrapper}>
                              <Grid item onClick={() => { setInputValue(ssvStore.ssvContractBalance); }} className={classes.MaxButton}>
                                MAX
                              </Grid>
                              <Grid item className={classes.MaxButtonText}>SSV</Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} className={classes.WalletBalance} onClick={() => { setInputValue(ssvStore.ssvContractBalance); }}>
                            Wallet Balance: {formatNumberToUi(ssvStore.ssvContractBalance)} SSV
                          </Grid>
                        </Grid>
                      </Grid>
                    ),
                    (
                      <>
                        <RemainingDays fromPage={'deposit'} desiredAmount={inputValue} />
                      </>
                    ),
          ]}
          bottom={(
            <PrimaryWithAllowance
              withAllowance
              text={'Deposit'}
              onClick={depositSsv}
              disable={ssvStore.ssvContractBalance === 0 || inputValue <= 0}
            />
          )}
        />
      </div>
    );
};
export default observer(Deposit);