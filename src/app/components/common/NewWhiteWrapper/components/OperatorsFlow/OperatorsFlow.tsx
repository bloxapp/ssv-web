import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import config from '~app/common/config';
import { useStores } from '~app/hooks/useStores';
import ImageDiv from '~app/components/common/ImageDiv/ImageDiv';
import GoogleTagManager from '~lib/analytics/GoogleTag/GoogleTagManager';
import { useStyles } from '~app/components/common/NewWhiteWrapper/NewWhiteWrapper.styles';
import NotificationsStore from '~app/common/stores/applications/SsvWeb/Notifications.store';
import OperatorMetadataStore from '~app/common/stores/applications/SsvWeb/OperatorMetadata.store';
import ProcessStore, { SingleOperator } from '~app/common/stores/applications/SsvWeb/Process.store';

type Props = {
  header: string,
  mainFlow?: boolean,
};

const OperatorsFlow = (props: Props) => {
  const stores = useStores();
  const navigate = useNavigate();
  const { header, mainFlow } = props;
  const settingsRef = useRef(null);
  const classes = useStyles({ mainFlow });
  const processStore: ProcessStore = stores.Process;
  const metadataStore: OperatorMetadataStore = stores.OperatorMetadata;
  const notificationsStore: NotificationsStore = stores.Notifications;
  const process: SingleOperator = processStore.getProcess;
  const operator = process?.item;

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    /**
     * Close menu drop down when click outside
     */
    const handleClickOutside = (e: any) => {
      // @ts-ignore
      if (showSettings && settingsRef.current && (!settingsRef.current.contains(e.target))) {
        setShowSettings(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [settingsRef, showSettings]);

  const moveToRemoveOperator = () => navigate(config.routes.SSV.MY_ACCOUNT.OPERATOR.REMOVE.ROOT);
  const moveToMetaData = async () => {
    await metadataStore.initMetadata(operator);
    navigate(config.routes.SSV.MY_ACCOUNT.OPERATOR.META_DATA);
  };

  const onNavigationClicked = async () => {
    navigate(-1);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(operator.id);
    notificationsStore.showMessage('Copied to clipboard.', 'success');
  };

  const openExplorer = () => {
    GoogleTagManager.getInstance().sendEvent({
      category: 'explorer_link',
      action: 'click',
      label: 'operator',
    });
    window.open(`${config.links.EXPLORER_URL}/operators/${operator.id}`, '_blank');  };

  const secondaryFlowDom = () => {
    return (
        <Grid container item className={classes.SecondaryHeaderWrapper}>
          <Grid item className={classes.BackNavigation} onClick={onNavigationClicked} />
          <Grid item>
            <Typography className={classes.HeaderText}>{header}</Typography>
          </Grid>
          <Grid item className={classes.Line} />
          <Grid item container xs style={{ gap: 8, alignItems: 'center' }}>
            <Grid item>
              <Typography className={classes.subHeaderText}>ID: {operator.id}</Typography>
            </Grid>
            <ImageDiv onClick={copyToClipboard} image={'copy'} width={24} height={24} />
            <ImageDiv onClick={openExplorer} image={'explorer'} width={23} height={23} />
          </Grid>
        </Grid>
    );
  };

  const mainFlowDom = () => {
    return <Grid container item xs={11} style={{ alignItems: 'center', textAlign: 'center' }}>
      <Grid item className={classes.BackNavigation} style={{ marginRight: 16 }} onClick={onNavigationClicked} />
      <Grid item className={classes.HeaderText}>{header}</Grid>
      {/*<Grid item className={classes.CompleteProfile}>*/}
      {/*  Complete your operator profile to increase discoverability and attract more stakers.*/}
      {/*  <LinkText text={'Fill Details'}/>*/}
      {/*</Grid>*/}
    </Grid>;
  };

  return (
      <Grid container item>
        {mainFlow ? mainFlowDom() : secondaryFlowDom()}
        {mainFlow && <Grid container item xs style={{ justifyContent: 'flex-end' }}>
          <Grid item className={classes.Options} onClick={() => {
            setShowSettings(!showSettings);
          }}/>
          {showSettings && <Grid item className={classes.SettingsWrapper}>
            <Grid ref={settingsRef} container item className={classes.Settings}>
              {/* <Grid container item className={classes.Button} onClick={onClick}>
                <Grid className={classes.SettingsImage}/>
                <Typography>Access setting</Typography>
              </Grid> */}
              <Grid container item className={classes.Button} onClick={moveToMetaData}>
                <Grid className={classes.MetadataImage}/>
                <Typography>Edit Details</Typography>
              </Grid>
              <Grid container item className={classes.Button} onClick={moveToRemoveOperator}>
                <Grid className={classes.RemoveImage}/>
                <Typography>Remove Operator</Typography>
              </Grid>
            </Grid>
          </Grid>
          }
        </Grid>}
      </Grid>
  );
};

export default observer(OperatorsFlow);
