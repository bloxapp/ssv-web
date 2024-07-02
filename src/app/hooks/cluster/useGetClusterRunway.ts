import { useAppSelector } from '~app/hooks/redux.hook';
import { ICluster } from '~app/model/cluster.model';
import { getNetworkFeeAndLiquidationCollateral } from '~app/redux/network.slice';
import { getClusterRunWay } from '~root/services/cluster.service';

export const useGetClusterRunway = () => {
  const { liquidationCollateralPeriod, minimumLiquidationCollateral } = useAppSelector(getNetworkFeeAndLiquidationCollateral);
  return (data: Pick<ICluster, 'balance' | 'burnRate'>) => getClusterRunWay(data, liquidationCollateralPeriod, minimumLiquidationCollateral);
};
