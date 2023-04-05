import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';


export const useStyles = makeStyles((theme: Theme) => ({
  MyAccountWrapper: {
    gap: 24,
    width: 1320,
    marginTop: 32,
    margin: 'auto',
    flexDirection: 'column',
  },
  OperatorPopUp: {
    gap: 15,
    top: -92,
    left: -75,
    height: 88,
    width: '100%',
    minWidth: 230,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    padding: '16px 24px',
    backgroundColor: theme.colors.white,
    boxShadow: '0 3px 12px 0 rgba(0, 0, 0, 0.06)',
  },
  OperatorId: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.62,
    color: theme.colors.gray40,
  },
  Line: {
    width: 1,
    height: 56,
    transform: 'rotate(-180deg)',
    backgroundColor: theme.colors.gray20,
  },
  FullImageOperator: {
    width: 40,
    height: 40,
    alignItems: 'center',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(/images/operator_default_background/circle_light.png)',
  },
  Pencil: {
    width: 11.1,
    height: 11.1,
    alignItems: 'center',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(/images/pencil/blue.svg)',
  },
  HeaderWrapper: {
    justifyContent: 'space-between',
  },
  CircleImageOperator: {
    width: 30,
    height: 30,
    alignItems: 'center',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(/images/operator_default_background/circle_light.png)',
  },
  CircleImageOperatorWrapper: {
    width: 40,
    height: 40,
    padding: 4,
    borderRadius: '50%',
    position: 'relative',
    border: `solid 1px ${theme.colors.gray20}`,
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
    padding: '16px 24px',
    justifyContent: 'center',
    color: theme.colors.white,
    backgroundColor: theme.colors.primaryBlue,
  },
  lightHeaderButton: {
    color: theme.colors.primaryBlue,
    backgroundColor: theme.colors.tint70,
  },
  LightGrey: {
    fontSize: '16px',
    color: theme.colors.gray40,
  },
  TooltipStyle: {
    width: '10px',
    height: '10px',
  },
}));
