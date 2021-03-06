import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import config from '~app/common/config';
import { useStores } from '~app/hooks/useStores';
import ApplicationStore from '~app/common/stores/Abstracts/Application';
import DarkModeSwitcher from '~app/common/components/AppBar/components/DarkModeSwitcher';
import ConnectWalletButton from '~app/common/components/AppBar/components/ConnectWalletButton';
import { useStyles } from './AppBar.styles';

const SsvAppBar = () => {
    const stores = useStores();
    const history = useHistory();
    const wrapperRef = useRef(null);
    const buttonsRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [menuBar, openMenuBar] = useState(false);
    const applicationStore: ApplicationStore = stores.Application;
    const [showMobileBar, setMobileBar] = useState(false);
    const isDistribution = applicationStore.strategyName === 'distribution';
    const hasOperatorsOrValidators = applicationStore.strategyRedirect === '/dashboard';
    // @ts-ignore
    const classes = useStyles({ whiteBackGround: applicationStore.whiteNavBarBackground, isNewStage: process.env.REACT_APP_NEW_STAGE, isDistribution });

    // Add event listener on screen size change
    useEffect(() => {
        const resize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('mousedown', resize);
        };
    }, []);

    useEffect(() => {
        if (width < 1200 && !showMobileBar) {
            setMobileBar(true);
        } else if (width >= 1200 && showMobileBar) {
            openMenuBar(false);
            setMobileBar(false);
        }
    }, [width]);

    useEffect(() => {
        /**
         * Close menu drop down when click outside
         */
        const handleClickOutside = (e: any) => {
            // @ts-ignore
            if (menuBar && wrapperRef.current && (!wrapperRef.current.contains(e.target) && !buttonsRef.current.contains(e.target))) {
                openMenuBar(false);
            }
        };
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef, buttonsRef, menuBar]);

    function openExplorer() {
        window.open(config.links.LINK_EXPLORER);
    }

    function openDocs() {
        window.open(config.links.LINK_SSV_DEV_DOCS);
    }

    const moveToDashboard = () => {
        if (applicationStore.isLoading) return;
        if (process.env.REACT_APP_NEW_STAGE && hasOperatorsOrValidators) {
            // @ts-ignore
            applicationStore.whiteNavBarBackground = false;
            history.push('/dashboard');
        }
    };

    const Hamburger = () => {
        if (isDistribution || !showMobileBar) return null;
        return (
          <Grid item ref={wrapperRef}>
            <Grid className={classes.Hamburger}
              onClick={() => {
                          openMenuBar(!menuBar);
                      }}
                />
          </Grid>
        );
    };

    const DocsButton = (props: any) => <Grid item className={props.className} onClick={openDocs}>Docs</Grid>;
    const ExplorerButton = (props: any) => <Grid item className={props.className} onClick={openExplorer}>Explorer</Grid>;
    const DashboardButton = (props: any) => <Grid item className={`${props.className} ${hasOperatorsOrValidators ? classes.BlueLink : ''}`} onClick={moveToDashboard}>Dashboard</Grid>;

    const Buttons = () => {
        if (isDistribution || !menuBar) return null;
        return (
          <Grid item container className={classes.MobileMenuBar} ref={buttonsRef}>
            {!process.env.REACT_APP_NEW_STAGE && <Grid item className={classes.MenuButton}>Join</Grid>}
            <DashboardButton className={classes.MenuButton} />
            <ExplorerButton className={classes.MenuButton} />
            <DocsButton className={classes.MenuButton} />
            <Grid item className={classes.UnderLine} />
            <Grid item container className={`${classes.MenuButton} ${classes.Slider}`}>
              <Grid item xs>{applicationStore.darkMode ? 'Dark Mode' : 'Light Mode'}</Grid>
              <Grid item>
                <DarkModeSwitcher margin={false} />
              </Grid>
            </Grid>
          </Grid>
        );
    };

    const DarkMode = () => {
        if (isDistribution || showMobileBar) return null;
        return (
          <Grid item>
            <DarkModeSwitcher margin />
          </Grid>
        );
    };

    const logoAction = () => {
        if (applicationStore.isLoading) return;
        // @ts-ignore
        applicationStore.whiteNavBarBackground = false;
        history.push(config.routes.HOME);
    };

    const MobileButtons = () => {
        if (showMobileBar) return null;
        return (
          <Grid item container className={classes.Linkbuttons}>
            {!process.env.REACT_APP_NEW_STAGE && <Grid item className={classes.LinkButton}>Join</Grid>}
            <DashboardButton className={classes.LinkButton} />
            <ExplorerButton className={classes.LinkButton} />
            <DocsButton className={classes.LinkButton} />
          </Grid>
        );
    };
    
    return (
      <Grid container className={classes.AppBarWrapper}>
        <Grid
          item
          onClick={logoAction}
          className={`${classes.AppBarIcon} ${width < 500 ? classes.SmallLogo : ''}`}
        />
        <MobileButtons />
        <Grid item className={classes.Wrapper}>
          <ConnectWalletButton />
        </Grid>
        <DarkMode />
        <Hamburger />
        <Buttons />
      </Grid>
    );
};

export default observer(SsvAppBar);
