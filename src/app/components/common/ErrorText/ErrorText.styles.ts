import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
    ErrorTextWrapper: {
        padding: '10px 16px 13px 16px',
        borderRadius: '1px',
        background: 'rgba(236, 28, 38, 0.08)',
    },
    ErrorText: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.43,
        color: '#ec1c26',
    },
    LinkText: {
        marginTop: '20px',
        textDecoration: 'underline',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.43,
        color: '#2b47e3',
    },
}));
