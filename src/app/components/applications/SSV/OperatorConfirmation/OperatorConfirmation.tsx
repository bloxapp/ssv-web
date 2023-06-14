import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStores } from '~app/hooks/useStores';
import { formatNumberToUi } from '~lib/utils/numbers';
import { longStringShorten } from '~lib/utils/strings';
import config, { translations } from '~app/common/config';
import WalletStore from '~app/common/stores/Abstracts/Wallet';
import BorderScreen from '~app/components/common/BorderScreen';
import NameAndAddress from '~app/components/common/NameAndAddress';
import SsvAndSubTitle from '~app/components/common/SsvAndSubTitle';
import AddressKeyInput from '~app/components/common/AddressKeyInput';
import PrimaryButton from '~app/components/common/Button/PrimaryButton';
import { useTermsAndConditions } from '~app/hooks/useTermsAndConditions';
import OperatorStore from '~app/common/stores/applications/SsvWeb/Operator.store';
import ApplicationStore from '~app/common/stores/applications/SsvWeb/Application.store';
import { useStyles } from '~app/components/applications/SSV/OperatorConfirmation/OperatorConfirmation.styles';
import TermsAndConditionsCheckbox from '~app/components/common/TermsAndConditionsCheckbox/TermsAndConditionsCheckbox';

const OperatorConfirmation = () => {
  const stores = useStores();
  const classes = useStyles();
  const navigate = useNavigate();
  const walletStore: WalletStore = stores.Wallet;
  const operatorStore: OperatorStore = stores.Operator;
  const applicationStore: ApplicationStore = stores.Application;
  const { checkedCondition } = useTermsAndConditions();
  const [actionButtonText, setActionButtonText] = useState('Register Operator');

  const onRegisterClick = async () => {
    try {
      applicationStore.setIsLoading(true);
      setActionButtonText('Waiting for confirmation...');
      const operatorAdded = await operatorStore.addNewOperator(false);
      if (operatorAdded) navigate(config.routes.SSV.OPERATOR.SUCCESS_PAGE);
      setActionButtonText('Register Operator');
    } catch (e: any) {
      setActionButtonText('Register Operator');
    }
    applicationStore.setIsLoading(false);
    applicationStore.showTransactionPendingPopUp(false);
  };

  return (
      <BorderScreen
          blackHeader
          withConversion
          sectionClass={classes.Section}
          header={translations.OPERATOR.CONFIRMATION.TITLE}
          body={[
            <Grid container>
              <Grid container style={{ gap: 34 }}>
                <Grid container item>
                  <Grid item className={classes.SubHeader}>Operator Key</Grid>
                  <AddressKeyInput address={walletStore.decodeKey(operatorStore.newOperatorKeys.pubKey)}/>
                </Grid>
                <Grid container item>
                  <Grid item xs={6}>
                    <NameAndAddress name={'Owner Address'}/>
                  </Grid>
                  <Grid item xs={6} className={classes.AlignRight}>
                    <NameAndAddress
                        name={`0x${longStringShorten(operatorStore.newOperatorKeys.address.substring(2), 4)}`}/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>,
            <Grid container style={{ gap: 24 }}>
              <Grid container item style={{ gap: 16 }}>
                <Grid container item>
                  <Grid item className={classes.SubHeader}>Details</Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs={6}>
                    <NameAndAddress name={'Fee'}/>
                  </Grid>
                  <Grid item xs={6} className={classes.AlignRight}>
                    <SsvAndSubTitle
                        ssv={formatNumberToUi(operatorStore.newOperatorKeys.fee)}
                        subText={'/year'}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item>
               <TermsAndConditionsCheckbox>
                 <PrimaryButton disable={!checkedCondition} text={actionButtonText} submitFunction={onRegisterClick}/>
               </TermsAndConditionsCheckbox>
              </Grid>
            </Grid>,
          ]}
      />
  );
};

export default observer(OperatorConfirmation);
