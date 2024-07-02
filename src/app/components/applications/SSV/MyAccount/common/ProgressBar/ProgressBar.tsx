import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import { useStyles } from '~app/components/applications/SSV/MyAccount/common/ProgressBar/ProgressBar.styles';
import { cn } from '~lib/utils/tailwind';

type Props = {
  remainingDays: number;
};

const ProgressBar = (props: Props) => {
  const { remainingDays } = props;
  const classes = useStyles();

  return (
    <Grid item container>
      <Grid item className={cn(classes.LiquidationProgress, 'rounded-full')}>
        <Grid style={{ width: `${100 - (Math.floor(remainingDays) / 30) * 100}%` }} className={classes.LiquidationProgressRed} />
      </Grid>
    </Grid>
  );
};

export default observer(ProgressBar);
