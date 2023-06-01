import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStores } from '~app/hooks/useStores';
import LinkText from '~app/components/common/LinkText';
import config, { translations } from '~app/common/config';
import BorderScreen from '~app/components/common/BorderScreen';
import Checkbox from '~app/components/common/CheckBox/CheckBox';
import PrimaryButton from '~app/components/common/Button/PrimaryButton';
import GoogleTagManager from '~lib/analytics/GoogleTag/GoogleTagManager';
import ProcessStore from '~app/common/stores/applications/SsvWeb/Process.store';
import NewWhiteWrapper from '~app/components/common/NewWhiteWrapper/NewWhiteWrapper';
import {
  useStyles,
} from '~app/components/applications/SSV/RegisterValidatorHome/components/AccountBalanceAndFee/AccountBalanceAndFee.styles';

const AccountBalanceAndFee = () => {
  const classes = useStyles();
  const stores = useStores();
  const navigate = useNavigate();
  const processStore: ProcessStore = stores.Process;
  const [firstCheckBox, setFirstCheckBox] = useState(false);
  const [secondCheckBox, setSecondCheckBox] = useState(false);

  const sendAnalytics = (link: string) => {
    GoogleTagManager.getInstance().sendEvent({
      category: 'validator_register',
      action: 'link',
      label: link,
    });
  };

  const MainScreen = <BorderScreen
      blackHeader
      withoutNavigation={processStore.secondRegistration}
      header={translations.VALIDATOR.BALANCE_AND_FEE.TITLE}
      body={[
        <Grid container>
          <Grid item container className={classes.bodyTextWrapper}>
            {translations.VALIDATOR.BALANCE_AND_FEE.BODY_TEXT.map((text: string) => {
              return (
                  <Grid item className={classes.bodyText} key={text}>
                    {text}
                  </Grid>
              );
            })}
          </Grid>

          <Grid item container className={classes.ErrorTextWrapper}>
            <Grid className={classes.ErrorText}>
              Clusters with insufficient balance are at risk of being <LinkText style={{ fontSize: 14 }}
                                                                                onClick={() => sendAnalytics('https://docs.ssv.network/learn/protocol-overview/tokenomics/liquidations')}
                                                                                text={'liquidated'}
                                                                                link={'https://docs.ssv.network/learn/protocol-overview/tokenomics/liquidations'} />,
              which will result in inactivation
              (<LinkText style={{ fontSize: 14 }}
                         onClick={() => sendAnalytics('https://docs.ssv.network/learn/glossary#staking')}
                         text={'penalties on the beacon chain'}
                         link={'https://launchpad.ethereum.org/en/faq#responsibilities'} />)
              of their validators, as they will no longer be operated by the network.
            </Grid>
          </Grid>
          <Checkbox
              grayBackGround
              onClickCallBack={setFirstCheckBox}
              text={'I understand that fees might change according to market dynamics'}
          />
          <Checkbox
              grayBackGround
              onClickCallBack={setSecondCheckBox}
              text={'I understand the risks of having my cluster liquidated'}
          />
          <PrimaryButton
              disable={!firstCheckBox || !secondCheckBox}
              text={'Next'}
              submitFunction={() => {
                navigate(config.routes.SSV.VALIDATOR.DISTRIBUTION_METHOD.START);
              }}
          />
        </Grid>,
      ]}
  />;

  if (processStore.secondRegistration) {
    return (
        <Grid container>
          <NewWhiteWrapper
              type={0}
              header={'Cluster'}
          />
          {MainScreen}
        </Grid>
    );
  }

  return MainScreen;
};
export default observer(AccountBalanceAndFee);
