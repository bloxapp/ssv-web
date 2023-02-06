import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    Wrapper: {
        gap: 24,
    },
    SubmitButton: {
        marginTop: 16,
    },
    ErrorText: {
        height: 47,
        borderRadius: 2,
        padding: theme.spacing(3, 4),
        background: 'rgb(236, 28, 38, 0.08);',
        border: `solid 1px ${theme.colors.primaryError}`,
        backgroundColor: theme.colors.primaryErrorRegular,
    },
    AmountInput: {
        height: 70,
        borderRadius: 8,
        padding: '22px 20px 22px 20px',
        backgroundColor: theme.colors.gray10,
        border: `solid 1px ${theme.colors.gray20}`,
        '& input': {
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.62,
            color: theme.colors.gray60,

        },
    },
}));
