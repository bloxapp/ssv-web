import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import config from '~app/common/config';
import Checkbox from '~app/components/common/CheckBox';
import TextInput from '~app/components/common/TextInput';
import BorderScreen from '~app/components/common/BorderScreen';
import HeaderSubHeader from '~app/components/common/HeaderSubHeader';
import PrimaryButton from '~app/components/common/Button/PrimaryButton';
import SecondaryButton from '~app/components/common/Button/SecondaryButton';
import ValidatorWhiteHeader from '~app/components/applications/SSV/MyAccount/common/componenets/ValidatorWhiteHeader';
import { useStyles } from './ProductQuestions.styles';

const checkBoxTypes: any = {
    'fees': 1,
    'performance': 2,
    'maintenance': 3,
    'other': 4,
};

const ProductQuestions = () => {
    const classes = useStyles();
    const history = useHistory();
    const [inputValue, setInputValue] = React.useState(false);
    const [textFieldOpen, setTextFieldOpen] = React.useState(false);
    const [selectedCheckbox, setSelectedCheckbox] = React.useState(0);

    const openTextField = () => {
        setTextFieldOpen(!textFieldOpen);
    };

    const checkBoxCallBack = (type: string) => {
        if (checkBoxTypes[type] === 4) {
            openTextField();
        }
        if (checkBoxTypes[type] === selectedCheckbox) {
            setSelectedCheckbox(0);
        } else {
            setSelectedCheckbox(checkBoxTypes[type]);
        }
    };

    const submitAnswer = () => {
        console.log(inputValue);
    };

    const backToMyAccount = () => {
        history.push(config.routes.SSV.MY_ACCOUNT.DASHBOARD);
    };

    const isDisabled = (type: number) => {
        return type !== selectedCheckbox && selectedCheckbox !== 0;
    };

    return (
      <Grid container item>
        <ValidatorWhiteHeader withoutExplorer withCancel={false} text={'Remove Validator'} />
        <BorderScreen
          blackHeader
          withoutNavigation
          wrapperClass={classes.ProductQuestionsWrapper}
          header={'Your validator was successfully removed'}
          body={[
            <Grid container item>
              <HeaderSubHeader subtitle={'Your validator has been successfully removed from the robust and secure infrastructure of our network'} />
              <Grid container item>
                <HeaderSubHeader
                  title={'Help us learn!'}
                  subtitle={<span>In order to improve and optimize, open sourced networks thrive on feedback and peer review.<br /> We’d love to hear what made you remove your validator.</span>}
                />
              </Grid>
              <Grid item>
                <Checkbox disable={isDisabled(checkBoxTypes.fees)} grayBackGround text={'I am looking for lower fees'} onClickCallBack={() => checkBoxCallBack('fees')} />
                <Checkbox disable={isDisabled(checkBoxTypes.performance)} grayBackGround text={'I am not happy  with the validators performance'} onClickCallBack={() => checkBoxCallBack('performance')} />
                <Checkbox disable={isDisabled(checkBoxTypes.maintenance)} grayBackGround text={'Validator monitoring and/or maintenance is a struggle'} onClickCallBack={() => checkBoxCallBack('maintenance')} />
                <Checkbox disable={isDisabled(checkBoxTypes.other)} grayBackGround text={'Other'} onClickCallBack={() => checkBoxCallBack('other')} />
              </Grid>
              {textFieldOpen && (
                <Grid container item className={classes.TextFieldWrapper}>
                  <TextInput onChangeCallback={(e: any) => setInputValue(e.target.value)} placeHolder={'Write your reason here...'} />
                </Grid>
              )}
              <Grid container item className={classes.ButtonsWrapper}>
                <Grid item xs>
                  <SecondaryButton text={'Back to My Account'} submitFunction={backToMyAccount} />
                </Grid>
                <Grid item xs>
                  <PrimaryButton text={'Submit Feedback'} submitFunction={submitAnswer} />
                </Grid>
              </Grid>
            </Grid>,
          ]}
        />
      </Grid>
    );
};

export default observer(ProductQuestions);
