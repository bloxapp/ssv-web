import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    Table: {
        borderRadius: 8,
        // backgroundColor: theme.colors.white,
        backgroundColor: theme.colors.applicationBackgroundColor,
    },
    ExplorerImage: {
        width: 24,
        height: 24,
        cursor: 'pointer',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        backgroundImage: `url(/images/explorer/${theme.darkMode ? 'dark' : 'light'}.svg)`,
    },
    Name: {
        '&:nth-of-type(1)': {
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.62,
            color: theme.colors.black,
            marginBottom: theme.spacing(1),
        },
        '&:nth-of-type(2)': {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.62,
            color: theme.colors.gray40,
            marginBottom: theme.spacing(0),
        },
    },
    copyImage: {
        width: 24,
        cursor: 'pointer',
        marginLeft: '6px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(/images/copy/${theme.darkMode ? 'dark' : 'light'}.svg)`,
    },
    Balance: {
        width: '54px',
        height: '20px',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.43,
        color: theme.colors.black,
    },
    DollarBalance: {
        width: 36,
        height: 18,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.62,
        color: theme.colors.gray40,
    },
    ValidatorApr: {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.62,
        color: theme.colors.black,
    },
    BeaconImage: {
        width: 24,
        height: 24,
        cursor: 'pointer',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        backgroundImage: `url(/images/beacon/${theme.darkMode ? 'dark' : 'light'}.svg)`,
    },
    SettingsImage: {
        width: 24,
        height: 24,
        cursor: 'pointer',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        backgroundImage: `url(/images/setting/${theme.darkMode ? 'dark' : 'light'}.svg)`,
    },
}));