import { useQuery } from '@tanstack/react-query';
import { useBlockNumber } from 'wagmi';
import { useAppSelector } from '~app/hooks/redux.hook';
import { getSelectedOperatorId } from '~app/redux/account.slice';
import { queryClient } from '~root/index';
import { getOperatorBalance } from '~root/services/operatorContract.service';

export const OPERATOR_BALANCE_QUERY_KEY = 'operatorBalance';
export const getOperatorBalanceQueryKey = (id: number) => [OPERATOR_BALANCE_QUERY_KEY, id];

export const useOperatorBalance = (operatorId?: number) => {
  const block = useBlockNumber({ watch: true });

  const selectedOperatorId = useAppSelector(getSelectedOperatorId);
  const id = operatorId ?? selectedOperatorId;

  return useQuery({
    queryKey: [OPERATOR_BALANCE_QUERY_KEY, id, block.data?.toString()],
    queryFn: () => getOperatorBalance({ id: id! }),
    placeholderData: 0,
    refetchOnMount: false,
    enabled: id !== undefined
  });
};

export const invalidateOperatorBalance = (id: number) => {
  return queryClient.invalidateQueries({
    queryKey: getOperatorBalanceQueryKey(id)
  });
};
