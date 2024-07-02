import { useAppSelector } from '~app/hooks/redux.hook';

export const useCluster = (clusterId: number) => {
  const cluster = useAppSelector((s) => s.accountState.clusters.find(({ id }) => id === (clusterId || s.accountState.selectedClusterId)));
  return cluster;
};
