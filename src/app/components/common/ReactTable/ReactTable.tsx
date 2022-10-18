import React from 'react';
import { Table } from '~app/components/common/Table/Table';

type Props = {
    cols: any;
    data: any;
    loading?: boolean;
    actionProps?: any;
};

export const ReactTable = ({ cols, data, actionProps, loading }: Props) => {
    loading;
    // console.log('loading', loading);
    const columns = React.useMemo(() => cols, []);
    const rows = React.useMemo(() => data, [data]);

    return <Table columns={columns} data={rows} actionProps={actionProps} />;
};