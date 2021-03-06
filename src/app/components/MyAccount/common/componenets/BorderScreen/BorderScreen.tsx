import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import BackNavigation from '~app/common/components/BackNavigation';
import { useStyles } from './BorderScreen.styles';

type Props = {
    body: any,
    bottom?: any,
    header?: string,
    gray80?: boolean,
    wrapperClass?: any,
    sectionClass?: any,
    blackHeader?: boolean,
    borderRadius?: string,
    withConversion?: boolean,
    withoutNavigation?: boolean,
};

const BorderScreen = (props: Props) => {
    const [coins] = useState(['SSV', 'USD']);
    const [currency, setCurrency] = useState('SSV');
    const { wrapperClass, borderRadius, gray80, withoutNavigation, blackHeader, header, withConversion, body, sectionClass, bottom } = props;
    const classes = useStyles({ gray80, blackHeader });

    const switchCurrency = (selectedCurrency: string) => {
        setCurrency(selectedCurrency);
    };

    return (
      <Grid container className={`${classes.BorderScreenWrapper} ${wrapperClass || ''}`}>
        {!withoutNavigation && (
          <Grid item className={classes.LinkWrapper}>
            <BackNavigation />
          </Grid>
          )}
        <Grid item container className={classes.ScreenWrapper} style={{ borderRadius }}>
          {(header || withConversion) && (
            <Grid container item className={classes.HeaderSection}>
              <Grid item className={classes.Header}>
                {header}
              </Grid>
              {withConversion && process.env.REACT_APP_NEW_STAGE && (
              <Grid item xs={5}>
                <Grid container item className={classes.Conversion}>
                  {coins.map((coin: string, index: number) => {
                        return (
                          <Grid key={index} item xs={6}
                            className={`${classes.Currency} ${currency === coin && classes.SelectedCurrency}`}
                            onClick={() => { switchCurrency(coin); }}>{coin}</Grid>
                        );
                    })}
                </Grid>
              </Grid>
              )}
            </Grid>
          )}
          {body.map((section: any, index: number) => {
            return (
              <Grid key={index} item container style={{ borderBottom: body.length === 1 ? 'none' : '' }} className={sectionClass ?? classes.Section}>
                {section}
              </Grid>
            );
          })}
          {bottom && (
          <Grid item container className={classes.Section}>
            {bottom}
          </Grid>
          )}
        </Grid>
      </Grid>
    );
};

export default BorderScreen;
