import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    Balance: {
        width: 78,
        height: 26,
        fontSize: (props: any) => props.bold ? 20 : 16,
        lineHeight: (props: any) => props.bold ? 1.4 : 1.62,
        fontWeight: (props: any) => props.bold ? 'bold' : 500,
        color: (props: any) => props.gray80 ? theme.colors.gray80 : theme.colors.gray90,
    },
    DollarBalance: {
        width: 69,
        height: 23,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.62,
        color: (props: any) => props.gray80 ? theme.colors.gray80 : theme.colors.gray40,
    },
}));