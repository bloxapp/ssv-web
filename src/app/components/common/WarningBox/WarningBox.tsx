import React from 'react';
import Grid from '@mui/material/Grid';
import { useStyles } from './WarningBox.styles';

type InputProps = {
    text: string,
};

const WarningBox = ({ text }: InputProps) => {
    const classes = useStyles();

    return (
      <Grid container className={classes.Wrapper}>
        {text}
      </Grid>
    );
};

export default WarningBox;
