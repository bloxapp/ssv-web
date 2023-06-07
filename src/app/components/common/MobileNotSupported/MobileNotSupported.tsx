import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useStyles } from '~app/components/common/MobileNotSupported/MobileNotSupported.styles';

const MobileNotSupported = () => {
    const classes = useStyles();

    return (
      <Grid className={classes.Wrapper}>
        <Typography className={classes.Header}>We don’t  support mobile devices yet</Typography>
        <Typography className={classes.SubHeader}>Feel free to visit the website using a computer</Typography>
        <Grid className={classes.Image} />
      </Grid>
);
};

export default observer(MobileNotSupported);
