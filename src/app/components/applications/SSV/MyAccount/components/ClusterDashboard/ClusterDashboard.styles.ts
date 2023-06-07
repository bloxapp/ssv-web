import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  MyAccountWrapper: {
    width: 1320,
    margin: 'auto',
    flexDirection: 'column',
  },
  HeaderWrapper: {
    justifyContent: 'space-between',
  },
  Header: {
    fontSize: 24,
    fontWeight: 800,
    lineHeight: 1.24,
    textAlign: 'left',
    letterSpacing: -0.25,
    color: theme.colors.gray90,
  },
  Arrow: {
    width: 32,
    height: 32,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(/images/diagramArrow/light.svg)',
  },
  HeaderButtonsWrapper: {
    gap: 16,
    justifyContent: 'flex-end',
  },
  HeaderButton: {
    gap: 8,
    width: 164,
    height: 48,
    fontSize: 16,
    fontWeight: 600,
    display: 'flex',
    borderRadius: 8,
    lineHeight: 1.25,
    cursor: 'pointer',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '16px 24px',
    justifyContent: 'center',
    '&:nth-child(1)': {
      color: theme.colors.primaryBlue,
      backgroundColor: theme.colors.tint70,
    },
    '&:nth-child(2)': {
      color: theme.colors.white,
      backgroundColor: theme.colors.primaryBlue,
    },
  },
}));
