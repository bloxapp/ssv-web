import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import config from '~app/common/config';
import Validator from '~lib/api/Validator';
import { useStores } from '~app/hooks/useStores';
import { formatNumberToUi } from '~lib/utils/numbers';
import WalletStore from '~app/common/stores/Abstracts/Wallet';
import BorderScreen from '~app/components/common/BorderScreen';
import SsvAndSubTitle from '~app/components/common/SsvAndSubTitle';
import HeaderSubHeader from '~app/components/common/HeaderSubHeader';
import SsvStore from '~app/common/stores/applications/SsvWeb/SSV.store';
import PrimaryButton from '~app/components/common/Button/PrimaryButton/PrimaryButton';
import OperatorStore, { IOperator } from '~app/common/stores/applications/SsvWeb/Operator.store';
import OperatorDetails from '~app/components/applications/SSV/RegisterValidatorHome/components/SelectOperators/components/FirstSquare/components/OperatorDetails';
import { useStyles } from './SecondSquare.styles';

const SecondSquare = ({ editPage }: { editPage: boolean }) => {
    const stores = useStores();
    const classes = useStyles({ editPage });
    const history = useHistory();
    // @ts-ignore
    const { public_key } = useParams();
    const ssvStore: SsvStore = stores.SSV;
    const walletStore: WalletStore = stores.Wallet;
    const operatorStore: OperatorStore = stores.Operator;
    const [allSelectedOperatorsVerified, setAllSelectedOperatorsVerified] = useState(true);
    const [previousOperatorsIds, setPreviousOperatorsIds] = useState([]);
    const boxes = [1, 2, 3, 4];

    useEffect(() => {
        Validator.getInstance().getValidator(public_key).then(validator => {
            if (validator?.operators) {
                // @ts-ignore
                setPreviousOperatorsIds(validator.operators.map(({ operator_id }) => operator_id));
            }
        });
    }, [editPage]);

    const removeOperator = (index: number) => {
        operatorStore.unselectOperator(index);
    };

    const onSelectOperatorsClick = async () => {
        if (process.env.REACT_APP_NEW_STAGE) {
            if (editPage) {
                history.push(`/dashboard/validator/${public_key}/upload_key_store`);
            } else {
                history.push(config.routes.VALIDATOR.ACCOUNT_BALANCE_AND_FEE);
            }
        } else {
            history.push(config.routes.VALIDATOR.SLASHING_WARNING);
        }
    };

    const linkToNotVerified = () => {
        window.open('https://snapshot.org/#/mainnet.ssvnetwork.eth/proposal/QmbuDdbbm7Ygan8Qi8PWoGzN3NJCVmBJQsv2roUTZVg6CH');
    };

    const disableButton = (): boolean => {
        return !operatorStore.selectedEnoughOperators || !Object.values(operatorStore.selectedOperators).reduce((acc: boolean, operator: IOperator) => {
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            if (!previousOperatorsIds.includes(operator.operator_id)) acc = true;
            return acc;
        }, false);
      // if(!operatorStore.selectedEnoughOperators)
    };

    useEffect(() => {
        const notVerifiedOperators = Object.values(operatorStore.selectedOperators).filter(operator => operator.type !== 'verified_operator' && operator.type !== 'dappnode');
        setAllSelectedOperatorsVerified(notVerifiedOperators.length === 0);
    }, [JSON.stringify(operatorStore.selectedOperators)]);

    return (
      <BorderScreen
        withoutNavigation
        wrapperClass={classes.ScreenWrapper}
        body={[
          <Grid container>
            <HeaderSubHeader title={'Selected Operators'} />
            <Grid container item className={classes.BoxesWrapper}>
              {boxes.map((index: number) => {
                      if (operatorStore.selectedOperators[index]) {
                          const operator = operatorStore.selectedOperators[index];
                          return (
                            <Grid key={index} container className={classes.SelectedOperatorBox}>
                              <Grid className={classes.DeleteOperator} onClick={() => { removeOperator(index); }}><Grid className={classes.whiteLine} /></Grid>
                              <Grid item>
                                <OperatorDetails operator={operator} />
                              </Grid>
                              <Grid item>
                                <SsvAndSubTitle ssv={formatNumberToUi(ssvStore.newGetFeeForYear(walletStore.fromWei(operator.fee)))} />
                              </Grid>
                            </Grid>
                          );
                      }
                      return (
                        <Grid key={index} item className={classes.BoxPlaceHolder}>Select Operator
                          0{index}</Grid>
                      );
                  })}
            </Grid>
            {!allSelectedOperatorsVerified && (
              <Grid container item xs={12} className={classes.WarningMessage}>
                <Grid item xs={12} className={classes.WarningHeader}>
                  You have selected one or more operators that are <Grid className={classes.NotVerifiedText} onClick={linkToNotVerified}>not verified.</Grid>
                </Grid>
                <Grid item xs={12}>
                  Unverified operators that were not reviewed and their identity is not confirmed, may pose a threat to your validators’ performance.
                </Grid>
                <Grid item xs={12}>
                  Please proceed only if you know and trust these operators.
                </Grid>
              </Grid>
              )}
            {process.env.REACT_APP_NEW_STAGE && (
              <Grid container item xs={12} className={classes.TotalFeesWrapper} justify={'space-between'}>
                <Grid item className={classes.TotalFeesHeader}>
                  {editPage ? 'New total Operators Yearly Fee' : 'Total Operators Yearly Fee'}
                </Grid>
                <Grid item>
                  <SsvAndSubTitle
                    bold
                    subTextCenter={false}
                    ssv={formatNumberToUi(ssvStore.newGetFeeForYear(operatorStore.getSelectedOperatorsFee))}
                  />
                </Grid>
              </Grid>
              )}
            <PrimaryButton dataTestId={'operators-selected-button'} disable={disableButton()} text={'Next'} submitFunction={onSelectOperatorsClick} />
          </Grid>,
        ]}
      />
    );
};

export default observer(SecondSquare);
