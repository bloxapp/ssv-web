import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import config from '~app/common/config';
import { useStores } from '~app/hooks/useStores';
import { truncateText } from '~lib/utils/strings';
import ImageDiv from '~app/components/common/ImageDiv/ImageDiv';
import CustomTooltip from '~app/components/common/ToolTip/ToolTip';
import GoogleTagManager from '~lib/analytics/GoogleTag/GoogleTagManager';
import OperatorType from '~app/components/common/OperatorType/OperatorType';
import NotificationsStore from '~app/common/stores/applications/SsvWeb/Notifications.store';
import AnchorTooltip from '~app/components/common/ToolTip/components/AnchorTooltip/AnchorTooltIp';
import {
  useStyles,
} from '~app/components/applications/SSV/RegisterValidatorHome/components/SelectOperators/components/FirstSquare/components/OperatorDetails/OperatorDetails.styles';

type Props = {
  gray80?: boolean;
  withCopy?: boolean;
  withoutExplorer?: boolean;
  operator: any;
  setOpenExplorerRefs?: Function;
  logoSize?: number;
  nameFontSize?: number;
  idFontSize?: number;
  isFullOperatorName?: boolean;
};

const OperatorDetails = (props: Props) => {
  const { gray80, operator, withCopy, withoutExplorer, setOpenExplorerRefs, logoSize, nameFontSize, idFontSize, isFullOperatorName } = props;
  const stores = useStores();
  const notificationsStore: NotificationsStore = stores.Notifications;
  const classes = useStyles({
    nameFontSize,
    idFontSize,
    logoSize,
    isDeleted: operator.is_deleted,
    operatorLogo: operator.logo,
    gray80,
  });
  let operatorName = operator?.name;
  const isPrivateOperator = operator.address_whitelist && operator.address_whitelist !== config.GLOBAL_VARIABLE.DEFAULT_ADDRESS_WHITELIST;

  const copyId = () => {
    navigator.clipboard.writeText(operator?.id);
    notificationsStore.showMessage('Copied to clipboard.', 'success');
  };

  const openExplorer = () => {
    GoogleTagManager.getInstance().sendEvent({
      category: 'explorer_link',
      action: 'click',
      label: 'operator',
    });
    window.open(`${config.links.EXPLORER_URL}/operators/${operator.id}`, '_blank');
  };

  return (
    <Grid container className={classes.Wrapper}>
      <Tooltip disableHoverListener={!isPrivateOperator} title={'Private Operator'} placement={'top'} children={
      <Grid className={classes.OperatorDetailsWrapper}>
        <Grid item className={classes.OperatorLogo}>
          {isPrivateOperator && <Grid className={classes.PrivateOperatorWrapper}>
            <Grid className={classes.PrivateOperatorLockIcon}/>
          </Grid>}
        </Grid>
        <Grid item className={classes.TextWrapper}>
          <Grid item className={classes.Name}>
            {operatorName.length > 18 && !isFullOperatorName ? <AnchorTooltip title={operatorName} placement={'top'}>
              {truncateText(operatorName, 18)}
            </AnchorTooltip> : operatorName}
          </Grid>
          <Grid item container className={classes.Id}>
            ID: {operator.id}
            {withCopy && <Grid className={classes.Copy} onClick={copyId}/>}
          </Grid>
        </Grid>
      </Grid> }/>
      {operator.type !== 'operator' && (
        <Grid item className={classes.OperatorType}>
          <OperatorType type={operator.type}/>
        </Grid>
      )}
      {!operator.is_deleted && !withoutExplorer && <Grid item className={classes.OperatorType}>
        <ImageDiv onClick={openExplorer} setOpenExplorerRefs={setOpenExplorerRefs} image={'explorer'} width={20}
                  height={20}/>
      </Grid>}
      {operator.is_deleted && <Grid item className={classes.OperatorType}>
        <ImageDiv onClick={openExplorer} image={'operatorOff'} width={20} height={20}/>
      </Grid>}
      {operator.is_deleted && <Grid item className={classes.OperatorType}>
        <CustomTooltip text={'This operator has left the network permanently'}/>
      </Grid>}
    </Grid>
  );
};

export default observer(OperatorDetails);
