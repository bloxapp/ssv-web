import axios from 'axios';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useStyles } from '../ImportFile.styles';
import { useStores } from '~app/hooks/useStores';
import LinkText from '~app/components/common/LinkText';
import TextInput from '~app/components/common/TextInput';
import config, { translations } from '~app/common/config';
import InputLabel from '~app/components/common/InputLabel';
import { getBaseBeaconchaUrl } from '~lib/utils/beaconcha';
import GoogleTagManager from '~lib/analytics/GoogleTagManager';
import BorderScreen from '~app/components/common/BorderScreen';
import ErrorMessage from '~app/components/common/ErrorMessage';
import PrimaryButton from '~app/components/common/Button/PrimaryButton';
import ApplicationStore from '~app/common/stores/Abstracts/Application';
import ValidatorStore from '~app/common/stores/applications/SsvWeb/Validator.store';
import ImportInput from '~app/components/applications/SSV/RegisterValidatorHome/components/ImportFile/common';

const KeyStoreFlow = () => {
  const stores = useStores();
  const classes = useStyles();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const removeButtons = useRef(null);
  const validatorStore: ValidatorStore = stores.Validator;
  const applicationStore: ApplicationStore = stores.Application;
  const [errorMessage, setErrorMessage] = useState('');
  const [processingFile, setProcessFile] = useState(false);
  const [keyStorePassword, setKeyStorePassword] = useState('');
  const keyStoreFileIsJson = validatorStore.isJsonFile(validatorStore.keyStoreFile);

  useEffect(() => {
    validatorStore.clearKeyStoreFlowData();
  }, []);

  const fileHandler = (file: any) => {
    validatorStore.setKeyStore(file, () => {
      setProcessFile(false);
    });
  };

  const handlePassword = (e: any) => {
    const inputText = e.target.value;
    setKeyStorePassword(inputText);
    if (errorMessage !== '') {
      setErrorMessage('');
    }
  };

  const isDeposited = async (): Promise<boolean> => {
    const beaconChaValidatorUrl = `${getBaseBeaconchaUrl()}/api/v1/validator/${validatorStore.keyStorePublicKey}/deposits`;
    try {
      const response: any = (await axios.get(beaconChaValidatorUrl, { timeout: 5000 })).data;
      const conditionalDataExtraction = Array.isArray(response.data) ? response.data[0] : response.data;
      return !(response.status === 'OK' && conditionalDataExtraction?.valid_signature === undefined);
    } catch (e: any) {
      console.log(e.message);
      return true;
    }
  };

  const removeFile = () => {
    setProcessFile(true);
    validatorStore.clearKeyStoreFlowData();
    validatorStore.keyStoreFile = null;
    setProcessFile(false);

    try {
      // @ts-ignore
      inputRef.current.value = null;
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const renderFileImage = () => {
    let fileClass: any = classes.FileImage;
    if (validatorStore.validatorPublicKeyExist) {
      fileClass += ` ${classes.Fail}`;
    } else if (keyStoreFileIsJson) {
      fileClass += ` ${classes.Success}`;
    } else if (!keyStoreFileIsJson && validatorStore.keyStoreFile) {
      fileClass += ` ${classes.Fail}`;
    }
    return <Grid item className={fileClass}/>;
  };

  const renderFileText = () => {
    if (!validatorStore.keyStoreFile) {
      return (
          <Grid item xs={12} className={classes.FileText}>
            Drag and drop files or <LinkText text={'browse'}/>
          </Grid>
      );
    }

    if (keyStoreFileIsJson && validatorStore.validatorPublicKeyExist) {
      return (
          <Grid item xs={12} className={`${classes.FileText} ${classes.ErrorText}`}>
            Validator is already registered to the network, <br/>
            please try a different keystore file.
            <RemoveButton/>
          </Grid>
      );
    }
    if (!keyStoreFileIsJson) {
      return (
          <Grid item xs={12} className={`${classes.FileText} ${classes.ErrorText}`}>
            Invalid file format - only .json files are supported
            <RemoveButton/>
          </Grid>
      );
    }

    if (keyStoreFileIsJson) {
      return (
          <Grid item xs={12} className={`${classes.FileText} ${classes.SuccessText}`}>
            {validatorStore.keyStoreFile.name}
            <RemoveButton/>
          </Grid>
      );
    }
  };

  const RemoveButton = () => <Grid ref={removeButtons} onClick={removeFile} className={classes.Remove}>Remove</Grid>;

  const submitHandler = async () => {
    applicationStore.setIsLoading(true);
    try {
      await validatorStore.extractKeyStoreData(keyStorePassword);
      // remove deposit check restriction temporary
      isDeposited;
      const deposited = true; // await isDeposited();
      if (deposited) {
        GoogleTagManager.getInstance().sendEvent({
          category: 'validator_register',
          action: 'upload_file',
          label: 'success',
        });
        navigate(config.routes.SSV.VALIDATOR.SLASHING_WARNING);
      } else {
        GoogleTagManager.getInstance().sendEvent({
          category: 'validator_register',
          action: 'upload_file',
          label: 'not_deposited',
        });
        navigate(config.routes.SSV.VALIDATOR.DEPOSIT_VALIDATOR);
      }
    } catch (error: any) {
      if (error.message === 'Invalid password') {
        GoogleTagManager.getInstance().sendEvent({
          category: 'validator_register',
          action: 'upload_file',
          label: 'invalid_password',
        });
        setErrorMessage(translations.VALIDATOR.IMPORT.FILE_ERRORS.INVALID_PASSWORD);
      } else {
        GoogleTagManager.getInstance().sendEvent({
          category: 'validator_register',
          action: 'upload_file',
          label: 'invalid_file',
        });
        setErrorMessage(translations.VALIDATOR.IMPORT.FILE_ERRORS.INVALID_FILE);
      }
    }
    applicationStore.setIsLoading(false);
  };


  const inputDisableConditions = !keyStoreFileIsJson || processingFile || validatorStore.validatorPublicKeyExist;
  const buttonDisableConditions = !keyStoreFileIsJson || !keyStorePassword || !!errorMessage || validatorStore.validatorPublicKeyExist;

  return (
      <BorderScreen
          blackHeader
          wrapperClass={classes.Wrapper}
          header={translations.VALIDATOR.IMPORT.TITLE}
          body={[
            <Grid item container>
              <Grid item xs={12} className={classes.SubHeader}>{translations.VALIDATOR.IMPORT.DESCRIPTION}</Grid>
              <ImportInput removeButtons={removeButtons} processingFile={processingFile} fileText={renderFileText} fileHandler={fileHandler}
                           fileImage={renderFileImage}/>
              <Grid container item xs={12}>
                <><InputLabel title="Keystore Password"/>
                  <Grid item xs={12} className={classes.ItemWrapper}>
                    <TextInput withLock disable={inputDisableConditions} value={keyStorePassword} onChangeCallback={handlePassword} />
                  </Grid>
                  <Grid item xs={12} className={classes.ErrorWrapper}>
                    {errorMessage && <ErrorMessage text={errorMessage}/>}
                  </Grid></>
                <PrimaryButton text={'Next'} submitFunction={submitHandler} disable={buttonDisableConditions}/>
              </Grid>
            </Grid>,
          ]}
      />
  );
};

export default observer(KeyStoreFlow);