import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { useStores } from '~app/hooks/useStores';
import Spinner from '~app/components/common/Spinner';
import WalletStore from '~app/common/stores/Abstracts/Wallet';
import ApplicationStore from '~app/common/stores/Abstracts/Application';
import NotificationsStore from '~app/common/stores/applications/SsvWeb/Notifications.store';
import { useStyles } from './PrimaryButton.styles';

type Props = {
    text: string,
    disable?: boolean,
    submitFunction: any,
    dataTestId?: string,
    wrapperClass?: string,
    errorButton?: boolean,
    withoutLoader?: boolean,
    withVerifyConnection?: boolean
};

const PrimaryButton = (props: Props) => {
    const stores = useStores();
    const walletStore: WalletStore = stores.Wallet;
    const applicationStore: ApplicationStore = stores.Application;
    const notificationsStore: NotificationsStore = stores.Notifications;
    const { text, submitFunction, disable, wrapperClass, dataTestId, errorButton, withoutLoader, withVerifyConnection } = props;
    const classes = useStyles({ errorButton });

    useEffect(() => {
        const callback = (event: any) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                if (!disable && !applicationStore.isLoading) {
                    submitHandler();
                }
            }
        };

        document.addEventListener('keydown', callback);
        return () => {
            document.removeEventListener('keydown', callback);
        };
    }, [applicationStore.isLoading, disable, submitFunction]);

    const submitHandler = async () => {
        if (walletStore.isWrongNetwork) notificationsStore.showMessage('Please change network to Goerli', 'error');
        if (withVerifyConnection && !walletStore.connected) {
            await walletStore.connect();
        }
        await submitFunction();
    };

    return (
        <Grid container item>
            <Button
                type="submit"
                onClick={submitHandler}
                data-testid={dataTestId}
                disabled={disable || applicationStore.isLoading}
                className={`${applicationStore.isLoading ? classes.Loading : classes.PrimaryButton} ${wrapperClass}`}
            >
                {applicationStore.isLoading && !withoutLoader && <Spinner errorSpinner={errorButton}/>}
                {text}
            </Button>
        </Grid>
    );
};

export default observer(PrimaryButton);
