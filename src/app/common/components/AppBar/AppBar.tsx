import React from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import { useStyles } from './AppBar.styles';
import useUserFlow from '~app/hooks/useUserFlow';
import { useStores } from '~app/hooks/useStores';
import ApplicationStore from '~app/common/stores/Application.store';
import ConnectWalletButton from '~app/common/components/AppBar/components/ConnectWalletButton';

type Button = {
    text: string,
    link: string,
    newPage?: boolean
    active?: boolean
};

const AppBarComponent = () => {
    const classes = useStyles();
    const stores = useStores();
    const { history } = useUserFlow();
    const applicationStore: ApplicationStore = stores.Application;

    const buttons: Button[] = [
        { text: 'ssv.network', link: config.routes.HOME, active: true },
        { text: 'join', link: config.routes.HOME, active: true },
        { text: 'my account', link: config.routes.HOME, active: false },
        { text: 'explorer', link: config.links.LINK_EXPLORER, newPage: true, active: false },
        { text: 'docs', link: 'https://docs.ssv.network/', newPage: true, active: true },
    ];
    const menuButtons: Button[] = [
        { text: 'Join the Network', link: config.routes.HOME, active: true },
        { text: 'My Account', link: config.routes.HOME, active: false },
        { text: 'Explorer', link: config.links.LINK_EXPLORER, newPage: true, active: false },
        { text: 'Documentation', link: 'https://docs.ssv.network/', newPage: true, active: true },
    ];

    const renderMenu = () => {
        return (
          <div className={classes.fullScreen}>
            <Grid container spacing={0} justify="center" className={classes.menuDropDown}>
              {menuButtons.map((button: Button, index: number) => {
                  return (
                    <Tooltip key={index} title="Comming soon...">
                      <Typography
                        onClick={() => {
                                    if (button.active) { switchPage(button.link, button.newPage); }
                                }}
                        className={classes.menuButton}>
                        {button.text}
                      </Typography>
                    </Tooltip>
                  );
              })}
            </Grid>
          </div>
        );
    };

    const switchPage = (link: string, newPage: boolean = false) => {
        if (newPage) {
            window.open(link, '_blank');
        } else {
            history.push(link);
        }
        applicationStore.displayToolBarMenu(false);
    };

    const handleClick = (status: boolean) => {
        applicationStore.displayToolBarMenu(status);
    };

  return (
    <div className={classes.root}>
      <AppBar className={classes.bloxColor} position="static">
        <Toolbar>
          <Grid container direction="row" justify="space-around">
            <Grid container className={classes.firstSection} justify="flex-start">
              {buttons.map((button: Button, index: number) => {
                        return (
                          <Tooltip disableHoverListener={button.active} key={index} disableFocusListener disableTouchListener title="Comming soon...">
                            <Typography onClick={() => { if (button.active) switchPage(button.link, button.newPage); }}
                              key={index} variant={index === 0 ? 'subtitle1' : 'subtitle1'}
                              className={classes.button}>
                              {button.text}
                            </Typography>
                          </Tooltip>
                        );
                    })}
            </Grid>
            <Grid className={classes.secondSection} container spacing={1} justify="flex-end">
              <Grid item className={classes.walletButton}>
                <ConnectWalletButton />
              </Grid>
              <Grid item className={classes.menu} onClick={() => { handleClick(!applicationStore.shouldDisplayToolBar); }}>
                {applicationStore.shouldDisplayToolBar ? <CloseIcon className={classes.menuIcon} /> : <MenuIcon className={classes.menuIcon} />}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {applicationStore.shouldDisplayToolBar && renderMenu()}
    </div>
  );
};

export default observer(AppBarComponent);
