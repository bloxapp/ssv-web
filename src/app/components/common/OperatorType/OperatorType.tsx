import React from 'react';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react';
import { useStyles } from '~app/components/common/OperatorType/OperatorType.styles';

type Props = {
    type: string | undefined,
};

const OperatorType = (props: Props) => {
    const isVerified = props.type === 'verified_operator';
    const isDappNode = props.type === 'dapp_node';
    const classes = useStyles({ isVerified, isDappNode });

    return (
      <Grid item className={classes.OperatorType} />
    );
};

export default observer(OperatorType);
