import { NETWORKS } from '~lib/utils/envHelper';

export const ABI_VERSION = {
   setterContract: {
       [NETWORKS.MAINNET]: [
            {
                'inputs': [],
                'name': 'ApprovalNotWithinTimeframe',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'CallerNotOwner',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'CallerNotWhitelisted',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'ClusterAlreadyEnabled',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'ClusterDoesNotExists',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'ClusterIsLiquidated',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'ClusterNotLiquidatable',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'ExceedValidatorLimit',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'FeeExceedsIncreaseLimit',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'FeeIncreaseNotAllowed',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'FeeTooLow',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'IncorrectClusterState',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'InsufficientBalance',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'InvalidOperatorIdsLength',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'InvalidPublicKeyLength',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'NewBlockPeriodIsBelowMinimum',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'NoFeeDelcared',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'OperatorDoesNotExist',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'SameFeeChangeNotAllowed',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'TokenTransferFailed',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'UnsortedOperatorsList',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'ValidatorAlreadyExists',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'ValidatorDoesNotExist',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'ValidatorOwnedByOtherAddress',
                'type': 'error',
            },
            {
                'inputs': [],
                'name': 'ZeroFeeIncreaseNotAllowed',
                'type': 'error',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': false,
                        'internalType': 'address',
                        'name': 'previousAdmin',
                        'type': 'address',
                    },
                    {
                        'indexed': false,
                        'internalType': 'address',
                        'name': 'newAdmin',
                        'type': 'address',
                    },
                ],
                'name': 'AdminChanged',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'beacon',
                        'type': 'address',
                    },
                ],
                'name': 'BeaconUpgraded',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'value',
                        'type': 'uint256',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'indexed': false,
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'ClusterDeposited',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'indexed': false,
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'ClusterLiquidated',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'indexed': false,
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'ClusterReactivated',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'value',
                        'type': 'uint256',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'indexed': false,
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'ClusterWithdrawn',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': false,
                        'internalType': 'uint64',
                        'name': 'value',
                        'type': 'uint64',
                    },
                ],
                'name': 'DeclareOperatorFeePeriodUpdated',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': false,
                        'internalType': 'uint64',
                        'name': 'value',
                        'type': 'uint64',
                    },
                ],
                'name': 'ExecuteOperatorFeePeriodUpdated',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': false,
                        'internalType': 'address',
                        'name': 'recipientAddress',
                        'type': 'address',
                    },
                ],
                'name': 'FeeRecipientAddressUpdated',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': false,
                        'internalType': 'uint8',
                        'name': 'version',
                        'type': 'uint8',
                    },
                ],
                'name': 'Initialized',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': false,
                        'internalType': 'uint64',
                        'name': 'value',
                        'type': 'uint64',
                    },
                ],
                'name': 'LiquidationThresholdPeriodUpdated',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'value',
                        'type': 'uint256',
                    },
                ],
                'name': 'MinimumLiquidationCollateralUpdated',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'value',
                        'type': 'uint256',
                    },
                    {
                        'indexed': false,
                        'internalType': 'address',
                        'name': 'recipient',
                        'type': 'address',
                    },
                ],
                'name': 'NetworkEarningsWithdrawn',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'oldFee',
                        'type': 'uint256',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'newFee',
                        'type': 'uint256',
                    },
                ],
                'name': 'NetworkFeeUpdated',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': false,
                        'internalType': 'bytes',
                        'name': 'publicKey',
                        'type': 'bytes',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'fee',
                        'type': 'uint256',
                    },
                ],
                'name': 'OperatorAdded',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': true,
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                ],
                'name': 'OperatorFeeCancellationDeclared',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': true,
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'blockNumber',
                        'type': 'uint256',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'fee',
                        'type': 'uint256',
                    },
                ],
                'name': 'OperatorFeeDeclared',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': true,
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'blockNumber',
                        'type': 'uint256',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'fee',
                        'type': 'uint256',
                    },
                ],
                'name': 'OperatorFeeExecuted',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': false,
                        'internalType': 'uint64',
                        'name': 'value',
                        'type': 'uint64',
                    },
                ],
                'name': 'OperatorFeeIncreaseLimitUpdated',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                ],
                'name': 'OperatorRemoved',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                    {
                        'indexed': false,
                        'internalType': 'address',
                        'name': 'whitelisted',
                        'type': 'address',
                    },
                ],
                'name': 'OperatorWhitelistUpdated',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': true,
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint256',
                        'name': 'value',
                        'type': 'uint256',
                    },
                ],
                'name': 'OperatorWithdrawn',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'previousOwner',
                        'type': 'address',
                    },
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'newOwner',
                        'type': 'address',
                    },
                ],
                'name': 'OwnershipTransferStarted',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'previousOwner',
                        'type': 'address',
                    },
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'newOwner',
                        'type': 'address',
                    },
                ],
                'name': 'OwnershipTransferred',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'implementation',
                        'type': 'address',
                    },
                ],
                'name': 'Upgraded',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'indexed': false,
                        'internalType': 'bytes',
                        'name': 'publicKey',
                        'type': 'bytes',
                    },
                    {
                        'indexed': false,
                        'internalType': 'bytes',
                        'name': 'shares',
                        'type': 'bytes',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'indexed': false,
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'ValidatorAdded',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'indexed': false,
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'indexed': false,
                        'internalType': 'bytes',
                        'name': 'publicKey',
                        'type': 'bytes',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'indexed': false,
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'ValidatorRemoved',
                'type': 'event',
            },
            {
                'inputs': [],
                'name': 'acceptOwnership',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                ],
                'name': 'cancelDeclaredOperatorFee',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'bytes32',
                        'name': '',
                        'type': 'bytes32',
                    },
                ],
                'name': 'clusters',
                'outputs': [
                    {
                        'internalType': 'bytes32',
                        'name': '',
                        'type': 'bytes32',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'dao',
                'outputs': [
                    {
                        'internalType': 'uint32',
                        'name': 'validatorCount',
                        'type': 'uint32',
                    },
                    {
                        'internalType': 'uint64',
                        'name': 'balance',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint64',
                        'name': 'block',
                        'type': 'uint64',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'fee',
                        'type': 'uint256',
                    },
                ],
                'name': 'declareOperatorFee',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'declareOperatorFeePeriod',
                'outputs': [
                    {
                        'internalType': 'uint64',
                        'name': '',
                        'type': 'uint64',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'amount',
                        'type': 'uint256',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'deposit',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                ],
                'name': 'executeOperatorFee',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'executeOperatorFeePeriod',
                'outputs': [
                    {
                        'internalType': 'uint64',
                        'name': '',
                        'type': 'uint64',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'string',
                        'name': 'initialVersion_',
                        'type': 'string',
                    },
                    {
                        'internalType': 'contract IERC20',
                        'name': 'token_',
                        'type': 'address',
                    },
                    {
                        'internalType': 'uint64',
                        'name': 'operatorMaxFeeIncrease_',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint64',
                        'name': 'declareOperatorFeePeriod_',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint64',
                        'name': 'executeOperatorFeePeriod_',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint64',
                        'name': 'minimumBlocksBeforeLiquidation_',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'minimumLiquidationCollateral_',
                        'type': 'uint256',
                    },
                ],
                'name': 'initialize',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'liquidate',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'minimumBlocksBeforeLiquidation',
                'outputs': [
                    {
                        'internalType': 'uint64',
                        'name': '',
                        'type': 'uint64',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'minimumLiquidationCollateral',
                'outputs': [
                    {
                        'internalType': 'uint64',
                        'name': '',
                        'type': 'uint64',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'network',
                'outputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'networkFee',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint64',
                        'name': 'networkFeeIndex',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint64',
                        'name': 'networkFeeIndexBlockNumber',
                        'type': 'uint64',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': '',
                        'type': 'uint64',
                    },
                ],
                'name': 'operatorFeeChangeRequests',
                'outputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'fee',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint64',
                        'name': 'approvalBeginTime',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint64',
                        'name': 'approvalEndTime',
                        'type': 'uint64',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'operatorMaxFeeIncrease',
                'outputs': [
                    {
                        'internalType': 'uint64',
                        'name': '',
                        'type': 'uint64',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': '',
                        'type': 'uint64',
                    },
                ],
                'name': 'operators',
                'outputs': [
                    {
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'internalType': 'uint64',
                        'name': 'fee',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint32',
                        'name': 'validatorCount',
                        'type': 'uint32',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint64',
                                'name': 'block',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'balance',
                                'type': 'uint64',
                            },
                        ],
                        'internalType': 'struct ISSVNetworkCore.Snapshot',
                        'name': 'snapshot',
                        'type': 'tuple',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': '',
                        'type': 'uint64',
                    },
                ],
                'name': 'operatorsWhitelist',
                'outputs': [
                    {
                        'internalType': 'address',
                        'name': '',
                        'type': 'address',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'owner',
                'outputs': [
                    {
                        'internalType': 'address',
                        'name': '',
                        'type': 'address',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'pendingOwner',
                'outputs': [
                    {
                        'internalType': 'address',
                        'name': '',
                        'type': 'address',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'proxiableUUID',
                'outputs': [
                    {
                        'internalType': 'bytes32',
                        'name': '',
                        'type': 'bytes32',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'amount',
                        'type': 'uint256',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'reactivate',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'fee',
                        'type': 'uint256',
                    },
                ],
                'name': 'reduceOperatorFee',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'bytes',
                        'name': 'publicKey',
                        'type': 'bytes',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'fee',
                        'type': 'uint256',
                    },
                ],
                'name': 'registerOperator',
                'outputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'id',
                        'type': 'uint64',
                    },
                ],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'bytes',
                        'name': 'publicKey',
                        'type': 'bytes',
                    },
                    {
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'internalType': 'bytes',
                        'name': 'shares',
                        'type': 'bytes',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'amount',
                        'type': 'uint256',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'registerValidator',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                ],
                'name': 'removeOperator',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'bytes',
                        'name': 'publicKey',
                        'type': 'bytes',
                    },
                    {
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'removeValidator',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'renounceOwnership',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'address',
                        'name': 'recipientAddress',
                        'type': 'address',
                    },
                ],
                'name': 'setFeeRecipientAddress',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'address',
                        'name': 'whitelisted',
                        'type': 'address',
                    },
                ],
                'name': 'setOperatorWhitelist',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'address',
                        'name': 'newOwner',
                        'type': 'address',
                    },
                ],
                'name': 'transferOwnership',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'newDeclareOperatorFeePeriod',
                        'type': 'uint64',
                    },
                ],
                'name': 'updateDeclareOperatorFeePeriod',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'newExecuteOperatorFeePeriod',
                        'type': 'uint64',
                    },
                ],
                'name': 'updateExecuteOperatorFeePeriod',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'blocks',
                        'type': 'uint64',
                    },
                ],
                'name': 'updateLiquidationThresholdPeriod',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint256',
                        'name': 'amount',
                        'type': 'uint256',
                    },
                ],
                'name': 'updateMinimumLiquidationCollateral',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint256',
                        'name': 'fee',
                        'type': 'uint256',
                    },
                ],
                'name': 'updateNetworkFee',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'newOperatorMaxFeeIncrease',
                        'type': 'uint64',
                    },
                ],
                'name': 'updateOperatorFeeIncreaseLimit',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'address',
                        'name': 'newImplementation',
                        'type': 'address',
                    },
                ],
                'name': 'upgradeTo',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'address',
                        'name': 'newImplementation',
                        'type': 'address',
                    },
                    {
                        'internalType': 'bytes',
                        'name': 'data',
                        'type': 'bytes',
                    },
                ],
                'name': 'upgradeToAndCall',
                'outputs': [],
                'stateMutability': 'payable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'bytes32',
                        'name': '',
                        'type': 'bytes32',
                    },
                ],
                'name': 'validatorPKs',
                'outputs': [
                    {
                        'internalType': 'address',
                        'name': 'owner',
                        'type': 'address',
                    },
                    {
                        'internalType': 'bool',
                        'name': 'active',
                        'type': 'bool',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'validatorsPerOperatorLimit',
                'outputs': [
                    {
                        'internalType': 'uint32',
                        'name': '',
                        'type': 'uint32',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [],
                'name': 'version',
                'outputs': [
                    {
                        'internalType': 'bytes32',
                        'name': '',
                        'type': 'bytes32',
                    },
                ],
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64[]',
                        'name': 'operatorIds',
                        'type': 'uint64[]',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'amount',
                        'type': 'uint256',
                    },
                    {
                        'components': [
                            {
                                'internalType': 'uint32',
                                'name': 'validatorCount',
                                'type': 'uint32',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'networkFeeIndex',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint64',
                                'name': 'index',
                                'type': 'uint64',
                            },
                            {
                                'internalType': 'uint256',
                                'name': 'balance',
                                'type': 'uint256',
                            },
                            {
                                'internalType': 'bool',
                                'name': 'active',
                                'type': 'bool',
                            },
                        ],
                        'internalType': 'struct ISSVNetworkCore.Cluster',
                        'name': 'cluster',
                        'type': 'tuple',
                    },
                ],
                'name': 'withdraw',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint256',
                        'name': 'amount',
                        'type': 'uint256',
                    },
                ],
                'name': 'withdrawNetworkEarnings',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                    {
                        'internalType': 'uint256',
                        'name': 'amount',
                        'type': 'uint256',
                    },
                ],
                'name': 'withdrawOperatorEarnings',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'inputs': [
                    {
                        'internalType': 'uint64',
                        'name': 'operatorId',
                        'type': 'uint64',
                    },
                ],
                'name': 'withdrawOperatorEarnings',
                'outputs': [],
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
        ],
       [NETWORKS.GOERLI]: [
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': '_registerAuth',
                       'type': 'address',
                   },
               ],
               'stateMutability': 'nonpayable',
               'type': 'constructor',
           },
           {
               'inputs': [],
               'name': 'ApprovalNotWithinTimeframe',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'CallerNotOwner',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'CallerNotWhitelisted',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterAlreadyEnabled',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterDoesNotExists',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterIsLiquidated',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterNotLiquidatable',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ExceedValidatorLimit',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'FeeExceedsIncreaseLimit',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'FeeIncreaseNotAllowed',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'FeeTooLow',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'IncorrectClusterState',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'InsufficientBalance',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'InvalidOperatorIdsLength',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'InvalidPublicKeyLength',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'NewBlockPeriodIsBelowMinimum',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'NoFeeDeclared',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'NotAuthorized',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'OperatorAlreadyExists',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'OperatorDoesNotExist',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'OperatorsListNotUnique',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'SameFeeChangeNotAllowed',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'TokenTransferFailed',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'UnsortedOperatorsList',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ValidatorAlreadyExists',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ValidatorDoesNotExist',
               'type': 'error',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'address',
                       'name': 'previousAdmin',
                       'type': 'address',
                   },
                   {
                       'indexed': false,
                       'internalType': 'address',
                       'name': 'newAdmin',
                       'type': 'address',
                   },
               ],
               'name': 'AdminChanged',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'beacon',
                       'type': 'address',
                   },
               ],
               'name': 'BeaconUpgraded',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'value',
                       'type': 'uint256',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'indexed': false,
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'ClusterDeposited',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'indexed': false,
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'ClusterLiquidated',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'indexed': false,
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'ClusterReactivated',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'value',
                       'type': 'uint256',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'indexed': false,
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'ClusterWithdrawn',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'uint64',
                       'name': 'value',
                       'type': 'uint64',
                   },
               ],
               'name': 'DeclareOperatorFeePeriodUpdated',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'uint64',
                       'name': 'value',
                       'type': 'uint64',
                   },
               ],
               'name': 'ExecuteOperatorFeePeriodUpdated',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': false,
                       'internalType': 'address',
                       'name': 'recipientAddress',
                       'type': 'address',
                   },
               ],
               'name': 'FeeRecipientAddressUpdated',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'uint8',
                       'name': 'version',
                       'type': 'uint8',
                   },
               ],
               'name': 'Initialized',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'uint64',
                       'name': 'value',
                       'type': 'uint64',
                   },
               ],
               'name': 'LiquidationThresholdPeriodUpdated',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'value',
                       'type': 'uint256',
                   },
               ],
               'name': 'MinimumLiquidationCollateralUpdated',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'value',
                       'type': 'uint256',
                   },
                   {
                       'indexed': false,
                       'internalType': 'address',
                       'name': 'recipient',
                       'type': 'address',
                   },
               ],
               'name': 'NetworkEarningsWithdrawn',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'oldFee',
                       'type': 'uint256',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'newFee',
                       'type': 'uint256',
                   },
               ],
               'name': 'NetworkFeeUpdated',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': false,
                       'internalType': 'bytes',
                       'name': 'publicKey',
                       'type': 'bytes',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'fee',
                       'type': 'uint256',
                   },
               ],
               'name': 'OperatorAdded',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': true,
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'OperatorFeeCancellationDeclared',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': true,
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'blockNumber',
                       'type': 'uint256',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'fee',
                       'type': 'uint256',
                   },
               ],
               'name': 'OperatorFeeDeclared',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': true,
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'blockNumber',
                       'type': 'uint256',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'fee',
                       'type': 'uint256',
                   },
               ],
               'name': 'OperatorFeeExecuted',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'uint64',
                       'name': 'value',
                       'type': 'uint64',
                   },
               ],
               'name': 'OperatorFeeIncreaseLimitUpdated',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'OperatorRemoved',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
                   {
                       'indexed': false,
                       'internalType': 'address',
                       'name': 'whitelisted',
                       'type': 'address',
                   },
               ],
               'name': 'OperatorWhitelistUpdated',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': true,
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint256',
                       'name': 'value',
                       'type': 'uint256',
                   },
               ],
               'name': 'OperatorWithdrawn',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'previousOwner',
                       'type': 'address',
                   },
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'newOwner',
                       'type': 'address',
                   },
               ],
               'name': 'OwnershipTransferStarted',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'previousOwner',
                       'type': 'address',
                   },
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'newOwner',
                       'type': 'address',
                   },
               ],
               'name': 'OwnershipTransferred',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'implementation',
                       'type': 'address',
                   },
               ],
               'name': 'Upgraded',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'indexed': false,
                       'internalType': 'bytes',
                       'name': 'publicKey',
                       'type': 'bytes',
                   },
                   {
                       'indexed': false,
                       'internalType': 'bytes',
                       'name': 'shares',
                       'type': 'bytes',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'indexed': false,
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'ValidatorAdded',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'indexed': false,
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'indexed': false,
                       'internalType': 'bytes',
                       'name': 'publicKey',
                       'type': 'bytes',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'indexed': false,
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'ValidatorRemoved',
               'type': 'event',
           },
           {
               'inputs': [],
               'name': 'acceptOwnership',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'cancelDeclaredOperatorFee',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'bytes32',
                       'name': '',
                       'type': 'bytes32',
                   },
               ],
               'name': 'clusters',
               'outputs': [
                   {
                       'internalType': 'bytes32',
                       'name': '',
                       'type': 'bytes32',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'dao',
               'outputs': [
                   {
                       'internalType': 'uint32',
                       'name': 'validatorCount',
                       'type': 'uint32',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'balance',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'block',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint256',
                       'name': 'fee',
                       'type': 'uint256',
                   },
               ],
               'name': 'declareOperatorFee',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'internalType': 'uint256',
                       'name': 'amount',
                       'type': 'uint256',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'deposit',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'executeOperatorFee',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'string',
                       'name': 'initialVersion_',
                       'type': 'string',
                   },
                   {
                       'internalType': 'contract IERC20',
                       'name': 'token_',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'operatorMaxFeeIncrease_',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'declareOperatorFeePeriod_',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'executeOperatorFeePeriod_',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'minimumBlocksBeforeLiquidation_',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint256',
                       'name': 'minimumLiquidationCollateral_',
                       'type': 'uint256',
                   },
                   {
                       'internalType': 'uint32',
                       'name': 'validatorsPerOperatorLimit_',
                       'type': 'uint32',
                   },
               ],
               'name': 'initialize',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'liquidate',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'minimumBlocksBeforeLiquidation',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'minimumLiquidationCollateral',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'network',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'networkFee',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'networkFeeIndex',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'networkFeeIndexBlockNumber',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'name': 'operatorFeeChangeRequests',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'fee',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'approvalBeginTime',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'approvalEndTime',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'operatorFeeConfig',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'declareOperatorFeePeriod',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'executeOperatorFeePeriod',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'operatorMaxFeeIncrease',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'name': 'operators',
               'outputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64',
                       'name': 'fee',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint32',
                       'name': 'validatorCount',
                       'type': 'uint32',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint64',
                               'name': 'block',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'balance',
                               'type': 'uint64',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Snapshot',
                       'name': 'snapshot',
                       'type': 'tuple',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'bytes32',
                       'name': '',
                       'type': 'bytes32',
                   },
               ],
               'name': 'operatorsPKs',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'name': 'operatorsWhitelist',
               'outputs': [
                   {
                       'internalType': 'address',
                       'name': '',
                       'type': 'address',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'owner',
               'outputs': [
                   {
                       'internalType': 'address',
                       'name': '',
                       'type': 'address',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'pendingOwner',
               'outputs': [
                   {
                       'internalType': 'address',
                       'name': '',
                       'type': 'address',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'proxiableUUID',
               'outputs': [
                   {
                       'internalType': 'bytes32',
                       'name': '',
                       'type': 'bytes32',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'internalType': 'uint256',
                       'name': 'amount',
                       'type': 'uint256',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'reactivate',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint256',
                       'name': 'fee',
                       'type': 'uint256',
                   },
               ],
               'name': 'reduceOperatorFee',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'bytes',
                       'name': 'publicKey',
                       'type': 'bytes',
                   },
                   {
                       'internalType': 'uint256',
                       'name': 'fee',
                       'type': 'uint256',
                   },
               ],
               'name': 'registerOperator',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'id',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'bytes',
                       'name': 'publicKey',
                       'type': 'bytes',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'internalType': 'bytes',
                       'name': 'shares',
                       'type': 'bytes',
                   },
                   {
                       'internalType': 'uint256',
                       'name': 'amount',
                       'type': 'uint256',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'registerValidator',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'removeOperator',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'bytes',
                       'name': 'publicKey',
                       'type': 'bytes',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'removeValidator',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'renounceOwnership',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'recipientAddress',
                       'type': 'address',
                   },
               ],
               'name': 'setFeeRecipientAddress',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'address',
                       'name': 'whitelisted',
                       'type': 'address',
                   },
               ],
               'name': 'setOperatorWhitelist',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'newOwner',
                       'type': 'address',
                   },
               ],
               'name': 'transferOwnership',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'timeInSeconds',
                       'type': 'uint64',
                   },
               ],
               'name': 'updateDeclareOperatorFeePeriod',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'timeInSeconds',
                       'type': 'uint64',
                   },
               ],
               'name': 'updateExecuteOperatorFeePeriod',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'blocks',
                       'type': 'uint64',
                   },
               ],
               'name': 'updateLiquidationThresholdPeriod',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint256',
                       'name': 'amount',
                       'type': 'uint256',
                   },
               ],
               'name': 'updateMinimumLiquidationCollateral',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint256',
                       'name': 'fee',
                       'type': 'uint256',
                   },
               ],
               'name': 'updateNetworkFee',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'percentage',
                       'type': 'uint64',
                   },
               ],
               'name': 'updateOperatorFeeIncreaseLimit',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'newImplementation',
                       'type': 'address',
                   },
               ],
               'name': 'upgradeTo',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'newImplementation',
                       'type': 'address',
                   },
                   {
                       'internalType': 'bytes',
                       'name': 'data',
                       'type': 'bytes',
                   },
               ],
               'name': 'upgradeToAndCall',
               'outputs': [],
               'stateMutability': 'payable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'bytes32',
                       'name': '',
                       'type': 'bytes32',
                   },
               ],
               'name': 'validatorPKs',
               'outputs': [
                   {
                       'internalType': 'bytes32',
                       'name': 'hashedOperatorIds',
                       'type': 'bytes32',
                   },
                   {
                       'internalType': 'bool',
                       'name': 'active',
                       'type': 'bool',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'validatorsPerOperatorLimit',
               'outputs': [
                   {
                       'internalType': 'uint32',
                       'name': '',
                       'type': 'uint32',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'version',
               'outputs': [
                   {
                       'internalType': 'bytes32',
                       'name': '',
                       'type': 'bytes32',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'internalType': 'uint256',
                       'name': 'amount',
                       'type': 'uint256',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'withdraw',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint256',
                       'name': 'amount',
                       'type': 'uint256',
                   },
               ],
               'name': 'withdrawNetworkEarnings',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
                   {
                       'internalType': 'uint256',
                       'name': 'amount',
                       'type': 'uint256',
                   },
               ],
               'name': 'withdrawOperatorEarnings',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'withdrawOperatorEarnings',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
       ],
},
    getterContract: {
       [NETWORKS.MAINNET]: [
           {
               'inputs': [],
               'name': 'ApprovalNotWithinTimeframe',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'CallerNotOwner',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'CallerNotWhitelisted',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterAlreadyEnabled',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterDoesNotExists',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterIsLiquidated',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterNotLiquidatable',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ExceedValidatorLimit',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'FeeExceedsIncreaseLimit',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'FeeIncreaseNotAllowed',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'FeeTooLow',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'IncorrectClusterState',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'InsufficientBalance',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'InvalidOperatorIdsLength',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'InvalidPublicKeyLength',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'NewBlockPeriodIsBelowMinimum',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'NoFeeDelcared',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'OperatorDoesNotExist',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'SameFeeChangeNotAllowed',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'TokenTransferFailed',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'UnsortedOperatorsList',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ValidatorAlreadyExists',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ValidatorDoesNotExist',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ValidatorOwnedByOtherAddress',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ZeroFeeIncreaseNotAllowed',
               'type': 'error',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'address',
                       'name': 'previousAdmin',
                       'type': 'address',
                   },
                   {
                       'indexed': false,
                       'internalType': 'address',
                       'name': 'newAdmin',
                       'type': 'address',
                   },
               ],
               'name': 'AdminChanged',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'beacon',
                       'type': 'address',
                   },
               ],
               'name': 'BeaconUpgraded',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'uint8',
                       'name': 'version',
                       'type': 'uint8',
                   },
               ],
               'name': 'Initialized',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'previousOwner',
                       'type': 'address',
                   },
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'newOwner',
                       'type': 'address',
                   },
               ],
               'name': 'OwnershipTransferStarted',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'previousOwner',
                       'type': 'address',
                   },
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'newOwner',
                       'type': 'address',
                   },
               ],
               'name': 'OwnershipTransferred',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'implementation',
                       'type': 'address',
                   },
               ],
               'name': 'Upgraded',
               'type': 'event',
           },
           {
               'inputs': [],
               'name': 'acceptOwnership',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'getBalance',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'getBurnRate',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getDeclaredOperatorFeePeriod',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getExecuteOperatorFeePeriod',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getLiquidationThresholdPeriod',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getMinimumLiquidationCollateral',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getNetworkEarnings',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getNetworkFee',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'getOperatorById',
               'outputs': [
                   {
                       'internalType': 'address',
                       'name': '',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
                   {
                       'internalType': 'uint32',
                       'name': '',
                       'type': 'uint32',
                   },
                   {
                       'internalType': 'bool',
                       'name': '',
                       'type': 'bool',
                   },
                   {
                       'internalType': 'bool',
                       'name': '',
                       'type': 'bool',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'getOperatorDeclaredFee',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'id',
                       'type': 'uint64',
                   },
               ],
               'name': 'getOperatorEarnings',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'getOperatorFee',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getOperatorFeeIncreaseLimit',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'bytes',
                       'name': 'publicKey',
                       'type': 'bytes',
                   },
               ],
               'name': 'getValidator',
               'outputs': [
                   {
                       'internalType': 'address',
                       'name': '',
                       'type': 'address',
                   },
                   {
                       'internalType': 'bool',
                       'name': '',
                       'type': 'bool',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getVersion',
               'outputs': [
                   {
                       'internalType': 'string',
                       'name': 'version',
                       'type': 'string',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'contract SSVNetwork',
                       'name': 'ssvNetwork_',
                       'type': 'address',
                   },
               ],
               'name': 'initialize',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'isLiquidatable',
               'outputs': [
                   {
                       'internalType': 'bool',
                       'name': '',
                       'type': 'bool',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'isLiquidated',
               'outputs': [
                   {
                       'internalType': 'bool',
                       'name': '',
                       'type': 'bool',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'owner',
               'outputs': [
                   {
                       'internalType': 'address',
                       'name': '',
                       'type': 'address',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'pendingOwner',
               'outputs': [
                   {
                       'internalType': 'address',
                       'name': '',
                       'type': 'address',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'proxiableUUID',
               'outputs': [
                   {
                       'internalType': 'bytes32',
                       'name': '',
                       'type': 'bytes32',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'renounceOwnership',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'newOwner',
                       'type': 'address',
                   },
               ],
               'name': 'transferOwnership',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'newImplementation',
                       'type': 'address',
                   },
               ],
               'name': 'upgradeTo',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'newImplementation',
                       'type': 'address',
                   },
                   {
                       'internalType': 'bytes',
                       'name': 'data',
                       'type': 'bytes',
                   },
               ],
               'name': 'upgradeToAndCall',
               'outputs': [],
               'stateMutability': 'payable',
               'type': 'function',
           },
       ],
       [NETWORKS.GOERLI]: [
           {
               'inputs': [],
               'stateMutability': 'nonpayable',
               'type': 'constructor',
           },
           {
               'inputs': [],
               'name': 'ApprovalNotWithinTimeframe',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'CallerNotOwner',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'CallerNotWhitelisted',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterAlreadyEnabled',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterDoesNotExists',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterIsLiquidated',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ClusterNotLiquidatable',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ExceedValidatorLimit',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'FeeExceedsIncreaseLimit',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'FeeIncreaseNotAllowed',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'FeeTooLow',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'IncorrectClusterState',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'InsufficientBalance',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'InvalidOperatorIdsLength',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'InvalidPublicKeyLength',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'NewBlockPeriodIsBelowMinimum',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'NoFeeDeclared',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'NotAuthorized',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'OperatorAlreadyExists',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'OperatorDoesNotExist',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'OperatorsListNotUnique',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'SameFeeChangeNotAllowed',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'TokenTransferFailed',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'UnsortedOperatorsList',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ValidatorAlreadyExists',
               'type': 'error',
           },
           {
               'inputs': [],
               'name': 'ValidatorDoesNotExist',
               'type': 'error',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'address',
                       'name': 'previousAdmin',
                       'type': 'address',
                   },
                   {
                       'indexed': false,
                       'internalType': 'address',
                       'name': 'newAdmin',
                       'type': 'address',
                   },
               ],
               'name': 'AdminChanged',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'beacon',
                       'type': 'address',
                   },
               ],
               'name': 'BeaconUpgraded',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': false,
                       'internalType': 'uint8',
                       'name': 'version',
                       'type': 'uint8',
                   },
               ],
               'name': 'Initialized',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'previousOwner',
                       'type': 'address',
                   },
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'newOwner',
                       'type': 'address',
                   },
               ],
               'name': 'OwnershipTransferStarted',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'previousOwner',
                       'type': 'address',
                   },
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'newOwner',
                       'type': 'address',
                   },
               ],
               'name': 'OwnershipTransferred',
               'type': 'event',
           },
           {
               'anonymous': false,
               'inputs': [
                   {
                       'indexed': true,
                       'internalType': 'address',
                       'name': 'implementation',
                       'type': 'address',
                   },
               ],
               'name': 'Upgraded',
               'type': 'event',
           },
           {
               'inputs': [],
               'name': '_ssvNetwork',
               'outputs': [
                   {
                       'internalType': 'contract ISSVNetwork',
                       'name': '',
                       'type': 'address',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'acceptOwnership',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'getBalance',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'getBurnRate',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getDeclaredOperatorFeePeriod',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getExecuteOperatorFeePeriod',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getLiquidationThresholdPeriod',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getMinimumLiquidationCollateral',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getNetworkEarnings',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getNetworkFee',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'getOperatorById',
               'outputs': [
                   {
                       'internalType': 'address',
                       'name': '',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
                   {
                       'internalType': 'uint32',
                       'name': '',
                       'type': 'uint32',
                   },
                   {
                       'internalType': 'bool',
                       'name': '',
                       'type': 'bool',
                   },
                   {
                       'internalType': 'bool',
                       'name': '',
                       'type': 'bool',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'getOperatorDeclaredFee',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'id',
                       'type': 'uint64',
                   },
               ],
               'name': 'getOperatorEarnings',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'uint64',
                       'name': 'operatorId',
                       'type': 'uint64',
                   },
               ],
               'name': 'getOperatorFee',
               'outputs': [
                   {
                       'internalType': 'uint256',
                       'name': '',
                       'type': 'uint256',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getOperatorFeeIncreaseLimit',
               'outputs': [
                   {
                       'internalType': 'uint64',
                       'name': '',
                       'type': 'uint64',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'bytes',
                       'name': 'publicKey',
                       'type': 'bytes',
                   },
               ],
               'name': 'getValidator',
               'outputs': [
                   {
                       'internalType': 'bool',
                       'name': 'active',
                       'type': 'bool',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'getVersion',
               'outputs': [
                   {
                       'internalType': 'string',
                       'name': 'version',
                       'type': 'string',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'contract ISSVNetwork',
                       'name': 'ssvNetwork_',
                       'type': 'address',
                   },
               ],
               'name': 'initialize',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'isLiquidatable',
               'outputs': [
                   {
                       'internalType': 'bool',
                       'name': '',
                       'type': 'bool',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'owner',
                       'type': 'address',
                   },
                   {
                       'internalType': 'uint64[]',
                       'name': 'operatorIds',
                       'type': 'uint64[]',
                   },
                   {
                       'components': [
                           {
                               'internalType': 'uint32',
                               'name': 'validatorCount',
                               'type': 'uint32',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'networkFeeIndex',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'uint64',
                               'name': 'index',
                               'type': 'uint64',
                           },
                           {
                               'internalType': 'bool',
                               'name': 'active',
                               'type': 'bool',
                           },
                           {
                               'internalType': 'uint256',
                               'name': 'balance',
                               'type': 'uint256',
                           },
                       ],
                       'internalType': 'struct ISSVNetworkCore.Cluster',
                       'name': 'cluster',
                       'type': 'tuple',
                   },
               ],
               'name': 'isLiquidated',
               'outputs': [
                   {
                       'internalType': 'bool',
                       'name': '',
                       'type': 'bool',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'owner',
               'outputs': [
                   {
                       'internalType': 'address',
                       'name': '',
                       'type': 'address',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'pendingOwner',
               'outputs': [
                   {
                       'internalType': 'address',
                       'name': '',
                       'type': 'address',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'proxiableUUID',
               'outputs': [
                   {
                       'internalType': 'bytes32',
                       'name': '',
                       'type': 'bytes32',
                   },
               ],
               'stateMutability': 'view',
               'type': 'function',
           },
           {
               'inputs': [],
               'name': 'renounceOwnership',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'newOwner',
                       'type': 'address',
                   },
               ],
               'name': 'transferOwnership',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'newImplementation',
                       'type': 'address',
                   },
               ],
               'name': 'upgradeTo',
               'outputs': [],
               'stateMutability': 'nonpayable',
               'type': 'function',
           },
           {
               'inputs': [
                   {
                       'internalType': 'address',
                       'name': 'newImplementation',
                       'type': 'address',
                   },
                   {
                       'internalType': 'bytes',
                       'name': 'data',
                       'type': 'bytes',
                   },
               ],
               'name': 'upgradeToAndCall',
               'outputs': [],
               'stateMutability': 'payable',
               'type': 'function',
           },
       ],
    },
};