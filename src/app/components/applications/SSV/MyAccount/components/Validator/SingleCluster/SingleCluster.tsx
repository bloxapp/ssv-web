import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import config from '~app/common/config';
import { useStores } from '~app/hooks/useStores';
import { useStyles } from './SingleCluster.styles';
import PrimaryButton from '~app/components/common/Button/PrimaryButton';
import OperatorStore from '~app/common/stores/applications/SsvWeb/Operator.store';
import useValidatorRegistrationFlow from '~app/hooks/useValidatorRegistrationFlow';
import Balance from '~app/components/applications/SSV/MyAccount/components/Balance';
import NewWhiteWrapper from '~app/components/common/NewWhiteWrapper/NewWhiteWrapper';
import ProcessStore from '~app/common/stores/applications/SsvWeb/Process.store';
import OperatorBox
  from '~app/components/applications/SSV/MyAccount/components/Validator/SingleCluster/components/OperatorBox';
import ActionsButton
  from '~app/components/applications/SSV/MyAccount/components/Validator/SingleCluster/components/actions/ActionsButton';
import { SingleCluster as SingleClusterProcess } from '~app/model/processes.model';
import ValidatorsList
  from '~app/components/applications/SSV/MyAccount/components/Validator/ValidatorsList/ValidatorsList';

const ButtonTextWrapper = styled.div`
    display: flex;
    height: 100%;
    flex-direction: row;
    align-items: center;
    gap: 4px;
`;

const ButtonText = styled.p`
    font-size: 16px;
    font-weight: 600;
    background-color: ${({ theme }) => theme.primaryBlue};
`;

const Icon = styled.div<{ theme: any, icon: string, withoutDarkMode: boolean }>`
    width: 24px;
    height: 24px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${({ theme, icon, withoutDarkMode }) => {
        if (withoutDarkMode) {
            return `url(${icon}.svg)`;
        } else {
            return `url(${icon}${theme.colors.isDarkTheme ? '-dark.svg' : '.svg'})`;
        }
    }};
`;

const ValidatorsWrapper = styled.div`
    width: 872px;
    max-height: 700px;
    padding: 28px 32px 32px 32px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.white};
    margin-bottom: 24px;
`;

const Section = styled.div`
    gap: 24px;
    width: 1320px;
    margin: 32px auto auto;
    display: flex;
    flex-direction: row;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;`;

const ValidatorsCountBadge = styled.div`
    height: 30px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.gray10};
    padding: 3px 12px;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray60}
`;

const SingleCluster = () => {
  const stores = useStores();
  const classes = useStyles();
  const navigate = useNavigate();
  const processStore: ProcessStore = stores.Process;
  const operatorStore: OperatorStore = stores.Operator;
  const process: SingleClusterProcess = processStore.getProcess;
  const cluster = process?.item;
  const showAddValidatorBtnCondition = cluster.operators.some((operator: any) => operator.is_deleted) || cluster.isLiquidated;
  const { getNextNavigation } = useValidatorRegistrationFlow(window.location.pathname);

  const addToCluster = () => {
    process.processName = 'cluster_registration';
    // @ts-ignore
    process.registerValidator = { depositAmount: 0 };
    operatorStore.selectOperators(cluster.operators);
    navigate(getNextNavigation());
  };

  const backToClustersDashboard = () => {
    navigate(config.routes.SSV.MY_ACCOUNT.CLUSTER_DASHBOARD);
  };

  return (
    <Grid container className={classes.Wrapper}>
      <NewWhiteWrapper
        stepBack={backToClustersDashboard}
        type={0}
        header={'Cluster'}
      />
      <Grid container item className={classes.Section}>
        {(cluster?.operators).map((operator: any, index: number) => {
          return <OperatorBox key={index} operator={operator}/>;
        })}
      </Grid>
      <Section>
        <Grid item>
          <Balance/>
        </Grid>
        <div>
          <ValidatorsWrapper>
            <Grid container className={classes.HeaderWrapper}>
              <TitleWrapper>
                <Grid item className={classes.Header}>Validators</Grid>
                {cluster.validatorCount > 0 && <ValidatorsCountBadge>{cluster.validatorCount}</ValidatorsCountBadge>}
              </TitleWrapper>
              <Grid className={classes.ButtonsWrapper}>
                {cluster.validatorCount > 1 &&
                  <ActionsButton extendClass={classes.Actions} children={<ButtonTextWrapper>
                    <ButtonText>
                      Actions
                    </ButtonText>
                    <Icon icon={'/images/arrowDown/arrow'} withoutDarkMode={true}/>
                  </ButtonTextWrapper>}/>}
                <PrimaryButton disable={showAddValidatorBtnCondition} wrapperClass={classes.AddToCluster}
                               children={<ButtonTextWrapper>
                                 <ButtonText>
                                   Add Validator
                                 </ButtonText>
                                 <Icon icon={'/images/plusIcon/plus'} withoutDarkMode={false}/>
                               </ButtonTextWrapper>} submitFunction={addToCluster}/>
              </Grid>
            </Grid>
            <ValidatorsList/>
          </ValidatorsWrapper>
        </div>
      </Section>
    </Grid>
  );
};

export default observer(SingleCluster);
