import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    Balance: {
        height: 26,
        fontSize: (props: any) => props.bold ? 28 : 16,
        lineHeight: (props: any) => props.bold ? 1.24 : 1.62,
        fontWeight: (props: any) => (props.bold && !props.fade) ? 800 : 500,
        color: (props: any) => {
            if (props.gray80 && !props.fade) {
                return theme.colors.gray80;
            } if (props.fade) {
                return theme.colors.gray40;
            }
            return theme.colors.gray90;
        },
    },
    DollarBalance: {
        height: 23,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.62,
        color: (props: any) => (props.gray80 && !props.fade) ? theme.colors.gray80 : theme.colors.gray40,
    },
}));