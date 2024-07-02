import { useMemo } from 'react';
import { useCluster } from '~app/hooks/cluster/useCluster';
import { useGetClusterRunway } from '~app/hooks/cluster/useGetClusterRunway';
import { ICluster } from '~app/model/cluster.model';

type Options = {
  balanceDeltaBN?: bigint;
};

export enum RunWayAlert {
  WillBeLiquidated,
  Liquidated,
  LowBalance,
  WithdrawalRisk
}

const getRunWayAlert = (cluster: Pick<ICluster, 'runWay' | 'isLiquidated'>) => {
  if (cluster.isLiquidated) return RunWayAlert.Liquidated;
  if (cluster.runWay < 30) return RunWayAlert.LowBalance;
  return null;
};

export const useEstimatedOperationalRunway = (clusterId: number, { balanceDeltaBN = 0n }: Options) => {
  const getClusterRunWay = useGetClusterRunway();
  const cluster = useCluster(clusterId);

  const isWithdrawal = balanceDeltaBN < 0n;
  const isChanged = Boolean(balanceDeltaBN);

  const newBalanceWei = (BigInt(cluster?.balance || 0) + balanceDeltaBN).toString();

  const runwayWithDelta = useMemo(() => {
    if (!cluster || !cluster.balance) return 0;
    return getClusterRunWay({ burnRate: cluster.burnRate, balance: newBalanceWei });
  }, [cluster, getClusterRunWay, newBalanceWei]);

  const runwayDelta = runwayWithDelta - (cluster?.runWay || 0);

  const alertType = useMemo(() => {
    if (!cluster || !cluster.balance) return null;
    if (!isChanged) return getRunWayAlert(cluster);

    if (runwayWithDelta < 30) {
      if (isWithdrawal && isChanged) return RunWayAlert.WithdrawalRisk;
      return RunWayAlert.LowBalance;
    }

    return null;
  }, [cluster, isChanged, isWithdrawal, runwayWithDelta]);

  const progressPercentage = useMemo(() => {
    if (!cluster || !cluster.balance) return 0;
    return Math.abs(Math.min(100, (runwayWithDelta / 30) * 100) - 100);
  }, [cluster, runwayWithDelta]);

  return {
    alertType,
    isChanged,
    runway: cluster?.runWay,
    display: {
      runwayWithDelta,
      runwayDelta,
      progressPercentage
    }
  };
};
