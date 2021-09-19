import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { VMochi, VMochiInterface } from "../VMochi";
export declare class VMochi__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_mochi: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<VMochi>;
    getDeployTransaction(_mochi: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): VMochi;
    connect(signer: Signer): VMochi__factory;
    static readonly bytecode = "0x60e0604052600660a081905265764d6f63686960d01b60c090815262000029916008919062000128565b5060408051808201909152600680825265764d4f43484960d01b6020909201918252620000599160099162000128565b5060408051808201909152600280825261763160f01b60209092019182526200008591600a9162000128565b50600b805460ff19166012179055348015620000a057600080fd5b506040516200283538038062002835833981016040819052620000c391620001ce565b60601b6001600160601b031916608052600080526003602052437f3617319a054d772f909f7c479a2cebe5066e836a939412e32403c99029b92f0155427f3617319a054d772f909f7c479a2cebe5066e836a939412e32403c99029b92f00556200023d565b828054620001369062000200565b90600052602060002090601f0160209004810192826200015a5760008555620001a5565b82601f106200017557805160ff1916838001178555620001a5565b82800160010185558215620001a5579182015b82811115620001a557825182559160200191906001019062000188565b50620001b3929150620001b7565b5090565b5b80821115620001b35760008155600101620001b8565b600060208284031215620001e157600080fd5b81516001600160a01b0381168114620001f957600080fd5b9392505050565b600181811c908216806200021557607f821691505b602082108114156200023757634e487b7160e01b600052602260045260246000fd5b50919050565b60805160601c6125c4620002716000396000818161051601528181610bfb015281816114f4015261182f01526125c46000f3fe608060405234801561001057600080fd5b506004361061023c5760003560e01c80637b39ecd51161013b578063c0baf8f7116100b8578063ee00ef3a1161007c578063ee00ef3a14610615578063f3a6d60814610620578063f4359ce514610666578063f4b1604514610670578063f52a36f7146106ae57600080fd5b8063c0baf8f714610511578063cbf9fe5f14610550578063cff805ab146105cc578063d28d5944146105d4578063eac6a667146105dc57600080fd5b806395d89b41116100ff57806395d89b41146104bd578063981b24d0146104c55780639eca672c146104d8578063b52c05fe146104eb578063bd85b039146104fe57600080fd5b80637b39ecd51461043b5780637c616fe61461044357806381fc83bb146104565780638ad4c44714610476578063900cf0cf146104b457600080fd5b8063313ce567116101c95780633d140d211161018d5780633d140d21146103bf5780634d144a01146104055780634ee2cd7e1461040d57806354fd4d501461042057806370a082311461042857600080fd5b8063313ce5671461030457806334d901a4146103235780633a0af6bf146103945780633ba0b9a9146103af5780633ccfd60b146103b757600080fd5b806315456eba1161021057806315456eba1461029457806318160ddd146102a957806323792279146102b157806329b55ca7146102de5780632f4f21e2146102f157600080fd5b8062fdd58e14610241578063047fc9aa14610267578063059f8b161461027057806306fdde031461027f575b600080fd5b61025461024f366004612230565b6106d1565b6040519081526020015b60405180910390f35b61025460005481565b610254670de0b6b3a764000081565b6102876107b6565b60405161025e91906122fe565b6102a76102a23660046122aa565b610844565b005b610254610851565b6102546102bf3660046121a4565b6001600160a01b03166000908152600160208190526040909120015490565b6102a76102ec36600461225a565b610861565b6102a76102ff366004612230565b610a98565b600b546103119060ff1681565b60405160ff909116815260200161025e565b61036c610331366004612230565b6004602090815260009283526040808420909152908252902080546001820154600290920154600f82810b93600160801b909304900b919084565b60408051600f95860b81529390940b602084015292820152606081019190915260800161025e565b61039c600281565b604051600f9190910b815260200161025e565b61039c610bce565b6102a7610c99565b6102a76103cd3660046121f9565b3360009081526007602090815260408083206001600160a01b0395909516835293905291909120805460ff1916911515919091179055565b61039c600081565b61025461041b366004612230565b610ca4565b610287610fb8565b6102546104363660046121a4565b610fc5565b61039c600381565b6102a76104513660046122aa565b610fd1565b6102546104643660046121a4565b60056020526000908152604090205481565b61036c6104843660046122aa565b600360205260009081526040902080546001820154600290920154600f82810b93600160801b909304900b919084565b61025460025481565b61028761116c565b6102546104d33660046122aa565b611179565b6102a76104e63660046121a4565b611354565b6102a76104f93660046122dc565b6113d9565b61025461050c3660046122aa565b6113e8565b6105387f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161025e565b6105ae61055e3660046121a4565b6040805180820190915260008082526020820152506001600160a01b031660009081526001602081815260409283902083518085019094528054600f90810b810b900b8452909101549082015290565b604080518251600f0b8152602092830151928101929092520161025e565b6102a761144f565b61039c600181565b6102546105ea366004612230565b6001600160a01b03919091166000908152600460209081526040808320938352929052206001015490565b610254630784ce0081565b61039c61062e3660046121a4565b6001600160a01b031660009081526005602090815260408083205460048352818420908452909152902054600160801b9004600f0b90565b61025462093a8081565b61069e61067e3660046121c6565b600760209081526000928352604080842090915290825290205460ff1681565b604051901515815260200161025e565b61039c6106bc3660046122aa565b600660205260009081526040902054600f0b81565b6001600160a01b0382166000908152600560205260408120546002546106fb5760009150506107b0565b6001600160a01b038416600090815260046020908152604080832084845282529182902082516080810184528154600f81810b810b810b8352600160801b909104810b810b900b928101929092526001810154928201839052600201546060820152906107689085612510565b8160200151610777919061240c565b815182906107869083906124c0565b600f90810b810b90915282516000910b121590506107a357600081525b51600f0b91506107b09050565b92915050565b600880546107c390612527565b80601f01602080910402602001604051908101604052809291908181526020018280546107ef90612527565b801561083c5780601f106108115761010080835404028352916020019161083c565b820191906000526020600020905b81548152906001019060200180831161081f57829003601f168201915b505050505081565b61084e3382610a98565b50565b600061085c426113e8565b905090565b6001600160a01b03831633148061089b57506001600160a01b038316600090815260076020908152604080832033845290915290205460ff165b6108e25760405162461bcd60e51b8152602060048201526013602482015272085bdddb995c881f1f0808585c1c1c9bdd9959606a1b60448201526064015b60405180910390fd5b600062093a806108f281846123f8565b6108fc91906124a1565b90506000831161093b5760405162461bcd60e51b815260206004820152600a6024820152697a65726f2076616c756560b01b60448201526064016108d9565b4281116109995760405162461bcd60e51b815260206004820152602660248201527f43616e206f6e6c79206c6f636b20756e74696c2074696d6520696e207468652060448201526566757475726560d01b60648201526084016108d9565b6109a7630784ce00426123a2565b8111156109f65760405162461bcd60e51b815260206004820152601e60248201527f566f74696e67206c6f636b2063616e2062652034207965617273206d6178000060448201526064016108d9565b6001600160a01b03841660009081526001602081815260409283902083518085019094528054600f90810b810b810b808652919093015491840191909152900b15610a835760405162461bcd60e51b815260206004820152601960248201527f5769746864726177206f6c64206d6f636869732066697273740000000000000060448201526064016108d9565b610a9185858484600161148d565b5050505050565b6001600160a01b03821660009081526001602081815260409283902083518085019094528054600f90810b810b900b8452909101549082015281610b0b5760405162461bcd60e51b815260206004820152600a6024820152697a65726f2076616c756560b01b60448201526064016108d9565b60008160000151600f0b13610b5b5760405162461bcd60e51b8152602060048201526016602482015275139bc8195e1a5cdd1a5b99c81b1bd8dac8199bdd5b9960521b60448201526064016108d9565b42816020015111610bba5760405162461bcd60e51b8152602060048201526024808201527f43616e6e6f742061646420746f2065787069726564206c6f636b2e20576974686044820152636472617760e01b60648201526084016108d9565b610bc98383600084600061148d565b505050565b60008054610be35750670de0b6b3a764000090565b6000546040516370a0823160e01b81523060048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b158015610c4557600080fd5b505afa158015610c59573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c7d91906122c3565b610c8f90670de0b6b3a76400006124a1565b61085c91906123f8565b610ca2336116f8565b565b600043821115610cdf5760405162461bcd60e51b8152602060048201526006602482015265085d985b1a5960d21b60448201526064016108d9565b6001600160a01b038316600090815260056020526040812054815b6080811015610d8b57818310610d0f57610d8b565b60006002610d1d84866123a2565b610d289060016123a2565b610d3291906123f8565b6001600160a01b03881660009081526004602090815260408083208484529091529020600201549091508610610d6a57809350610d78565b610d75600182612510565b92505b5080610d8381612562565b915050610cfa565b506001600160a01b0385166000908152600460209081526040808320858452825280832081516080810183528154600f81810b810b810b8352600160801b909104810b810b900b938101939093526001810154918301919091526002908101546060830152549091610dfd8783611960565b600081815260036020908152604080832081516080810183528154600f81810b810b810b8352600160801b909104810b810b900b938101939093526001810154918301919091526002015460608201529192508084841015610eec576000600381610e698760016123a2565b8152602080820192909252604090810160002081516080810183528154600f81810b810b810b8352600160801b909104810b810b900b93810193909352600181015491830191909152600201546060808301829052860151919250610ece9190612510565b925083604001518160400151610ee49190612510565b915050610f10565b6060830151610efb9043612510565b9150826040015142610f0d9190612510565b90505b60408301518215610f4d578284606001518c610f2c9190612510565b610f3690846124a1565b610f4091906123f8565b610f4a90826123a2565b90505b6040870151610f5c9082612510565b8760200151610f6b919061240c565b87518890610f7a9083906124c0565b600f90810b810b90915288516000910b129050610fa65750509351600f0b96506107b095505050505050565b600099505050505050505050506107b0565b600a80546107c390612527565b60006107b082426106d1565b33600090815260016020818152604080842081518083019092528054600f90810b810b900b825290920154908201529062093a8061100f81856123f8565b61101991906124a1565b905060008260000151600f0b1361106b5760405162461bcd60e51b8152602060048201526016602482015275139bc8195e1a5cdd1a5b99c81b1bd8dac8199bdd5b9960521b60448201526064016108d9565b428260200151116110ad5760405162461bcd60e51b815260206004820152600c60248201526b131bd8dac8195e1c1a5c995960a21b60448201526064016108d9565b816020015181116111005760405162461bcd60e51b815260206004820152601f60248201527f43616e206f6e6c7920696e637265617365206c6f636b206475726174696f6e0060448201526064016108d9565b61110e630784ce00426123a2565b81111561115d5760405162461bcd60e51b815260206004820152601e60248201527f566f74696e67206c6f636b2063616e2062652034207965617273206d6178000060448201526064016108d9565b610bc93360008385600361148d565b600980546107c390612527565b6000438211156111b45760405162461bcd60e51b8152602060048201526006602482015265085d985b1a5960d21b60448201526064016108d9565b60025460006111c38483611960565b600081815260036020908152604080832081516080810183528154600f81810b810b810b8352600160801b909104810b810b900b93810193909352600181015491830191909152600201546060820152919250838310156112e257600060038161122e8660016123a2565b8152602080820192909252604090810160002081516080810183528154600f81810b810b810b8352600160801b909104810b810b900b93810193909352600181015491830191909152600201546060808301829052850151919250146112dc57826060015181606001516112a29190612510565b836040015182604001516112b69190612510565b60608501516112c5908a612510565b6112cf91906124a1565b6112d991906123f8565b91505b50611331565b438260600151146113315760608201516112fc9043612510565b604083015161130b9042612510565b606084015161131a9089612510565b61132491906124a1565b61132e91906123f8565b90505b61134a8282846040015161134591906123a2565b6119ec565b9695505050505050565b6001600160a01b03811633148061138e57506001600160a01b038116600090815260076020908152604080832033845290915290205460ff165b6113d05760405162461bcd60e51b8152602060048201526013602482015272085bdddb995c881f1f0808585c1c1c9bdd9959606a1b60448201526064016108d9565b61084e816116f8565b6113e4338383610861565b5050565b60028054600081815260036020908152604080832081516080810183528154600f81810b810b810b8352600160801b909104810b810b900b938101939093526001810154918301919091529093015460608401529161144781856119ec565b949350505050565b610ca2600060405180604001604052806000600f0b8152602001600081525060405180604001604052806000600f0b81526020016000815250611aed565b600054611498610bce565b600f0b6114ad86670de0b6b3a76400006124a1565b6114b791906123f8565b6000808282546114c791906123a2565b9091555050841561157a576040516323b872dd60e01b8152336004820152306024820152604481018690527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906323b872dd90606401602060405180830381600087803b15801561154057600080fd5b505af1158015611554573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611578919061228d565b505b6001600160a01b03861660009081526001602081815260409283902083518085019094528054600f90810b810b900b845290910154908201526115bb610bce565b6115cd87670de0b6b3a764000061240c565b6115d791906123ba565b845185906115e6908390612353565b600f90810b900b90525084156115fe57602084018590525b6001600160a01b038716600090815260016020818152604090922086518154600f9190910b6001600160801b03166001600160801b03199091161781559186015191015561164d878286611aed565b8360200151876001600160a01b03167f4566dfc29f6f11d13a418c26a02bef7c28bae749d4de47e4e6a7cddea6730d598886426040516116a393929190928352600f9190910b6020830152604082015260600190565b60405180910390a37f5e2aa66efd74cce82b21852e317e5490d9ecc9e6bb953ae24d90851258cc2f5c826116d788826123a2565b6040805192835260208301919091520160405180910390a150505050505050565b6001600160a01b03811660009081526001602081815260409283902083518085019094528054600f90810b810b900b84529091015490820181905242101561176d5760405162461bcd60e51b815260206004820152600860248201526708595e1c1a5c995960c21b60448201526064016108d9565b80516001600160a01b038316600081815260016020818152604080842081518083019092528054600f81810b810b810b8452828601805485870152858b01888152888c52988852959094528851840b6001600160801b03166001600160801b031990911617905593519091559290920b91670de0b6b3a76400006117ef610bce565b6117fc90600f0b856124a1565b61180691906123f8565b60405163a9059cbb60e01b81526001600160a01b038781166004830152602482018390529192507f00000000000000000000000000000000000000000000000000000000000000009091169063a9059cbb90604401602060405180830381600087803b15801561187557600080fd5b505af1158015611889573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118ad919061228d565b5060008054908490806118c08385612510565b909155506118d19050868487611aed565b604080518381524260208201526001600160a01b038816917ff279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568910160405180910390a27f5e2aa66efd74cce82b21852e317e5490d9ecc9e6bb953ae24d90851258cc2f5c816119408682612510565b6040805192835260208301919091520160405180910390a1505050505050565b60008082815b60808110156119e25781831061197b576119e2565b6000600261198984866123a2565b6119949060016123a2565b61199e91906123f8565b60008181526003602052604090206002015490915087106119c1578093506119cf565b6119cc600182612510565b92505b50806119da81612562565b915050611966565b5090949350505050565b60008062093a80808560400151611a0391906123f8565b611a0d91906124a1565b905060005b60ff811015611acb57611a2862093a80836123a2565b9150600084831115611a3c57849250611a50565b50600082815260066020526040902054600f0b5b6040860151611a5f9084612510565b8660200151611a6e919061240c565b86518790611a7d9083906124c0565b600f90810b900b90525082851415611a955750611acb565b8086602001818151611aa79190612353565b600f90810b900b905250506040850182905280611ac381612562565b915050611a12565b5060008460000151600f0b1215611ae157600084525b50509051600f0b919050565b60408051608081018252600080825260208201819052918101829052606081019190915260408051608081018252600080825260208201819052918101829052606081019190915260025460009081906001600160a01b03881615611c7257428760200151118015611b66575060008760000151600f0b135b15611bb3578651611b7c90630784ce00906123ba565b600f90810b900b602080870191909152870151611b9a904290612510565b8560200151611ba9919061240c565b600f90810b900b85525b428660200151118015611bcd575060008660000151600f0b135b15611c1a578551611be390630784ce00906123ba565b600f90810b900b602080860191909152860151611c01904290612510565b8460200151611c10919061240c565b600f90810b900b84525b602080880151600090815260068252604090205490870151600f9190910b935015611c7257866020015186602001511415611c5757829150611c72565b602080870151600090815260069091526040902054600f0b91505b604080516080810182526000808252602082015242918101919091524360608201528115611cef575060008181526003602090815260409182902082516080810184528154600f81810b810b810b8352600160801b909104810b810b900b9281019290925260018101549282019290925260029091015460608201525b600081604001519050600060405180608001604052808460000151600f0b81526020018460200151600f0b8152602001846040015181526020018460600151815250905060008360400151421115611d7e576040840151611d509042612510565b6060850151611d5f9043612510565b611d7190670de0b6b3a76400006124a1565b611d7b91906123f8565b90505b600062093a80611d8e81866123f8565b611d9891906124a1565b905060005b60ff811015611f1f57611db362093a80836123a2565b9150600042831115611dc757429250611ddb565b50600082815260066020526040902054600f0b5b611de58684612510565b8760200151611df4919061240c565b87518890611e039083906124c0565b600f90810b900b905250602087018051829190611e21908390612353565b600f90810b810b90915288516000910b12159050611e3e57600087525b60008760200151600f0b1215611e5657600060208801525b60408088018490528501519295508592670de0b6b3a764000090611e7a9085612510565b611e8490866124a1565b611e8e91906123f8565b8560600151611e9d91906123a2565b50611ea96001896123a2565b975042831415611ebf5750436060870152611f1f565b6000888152600360209081526040918290208951918a0151600f90810b6001600160801b03908116600160801b029390910b1691909117815590880151600182015560608801516002909101555080611f1781612562565b915050611d9d565b5060028690556001600160a01b038d1615611fb85789602001518960200151611f4891906124c0565b85602001818151611f599190612353565b600f90810b900b90525089518951611f7191906124c0565b85518690611f80908390612353565b600f90810b810b90915260208701516000910b12159050611fa357600060208601525b60008560000151600f0b1215611fb857600085525b505050600083815260036020908152604091829020845191850151600f90810b6001600160801b03908116600160801b029390910b1691909117815590830151600182015560608301516002909101556001600160a01b038a161561217c5742896020015111156120885760208701516120329086612353565b945088602001518860200151141561205657602086015161205390866124c0565b94505b602089810151600090815260069091526040902080546001600160801b0319166001600160801b03600f88900b161790555b42886020015111156120e7578860200151886020015111156120e75760208601516120b390856124c0565b602089810151600090815260069091526040902080546001600160801b0319166001600160801b03600f84900b1617905593505b6001600160a01b038a1660009081526005602052604081208054829061210c90612562565b9182905550426040808a019182524360608b019081526001600160a01b038f16600090815260046020908152838220958252948552919091208a51938b0151600f90810b6001600160801b03908116600160801b029590910b169390931783559051600183015551600290910155505b50505050505050505050565b80356001600160a01b038116811461219f57600080fd5b919050565b6000602082840312156121b657600080fd5b6121bf82612188565b9392505050565b600080604083850312156121d957600080fd5b6121e283612188565b91506121f060208401612188565b90509250929050565b6000806040838503121561220c57600080fd5b61221583612188565b91506020830135612225816125a9565b809150509250929050565b6000806040838503121561224357600080fd5b61224c83612188565b946020939093013593505050565b60008060006060848603121561226f57600080fd5b61227884612188565b95602085013595506040909401359392505050565b60006020828403121561229f57600080fd5b81516121bf816125a9565b6000602082840312156122bc57600080fd5b5035919050565b6000602082840312156122d557600080fd5b5051919050565b600080604083850312156122ef57600080fd5b50508035926020909101359150565b600060208083528351808285015260005b8181101561232b5785810183015185820160400152820161230f565b8181111561233d576000604083870101525b50601f01601f1916929092016040019392505050565b600081600f0b83600f0b600082128260016001607f1b030382138115161561237d5761237d61257d565b8260016001607f1b03190382128116156123995761239961257d565b50019392505050565b600082198211156123b5576123b561257d565b500190565b600081600f0b83600f0b806123d1576123d1612593565b60016001607f1b03198214600019821416156123ef576123ef61257d565b90059392505050565b60008261240757612407612593565b500490565b600081600f0b83600f0b60016001607f1b0360008213600084138383048511828216161561243c5761243c61257d565b60016001607f1b0319600085128281168783058712161561245f5761245f61257d565b6000871292508582058712848416161561247b5761247b61257d565b858505871281841616156124915761249161257d565b5050509290910295945050505050565b60008160001904831182151516156124bb576124bb61257d565b500290565b600081600f0b83600f0b600081128160016001607f1b0319018312811516156124eb576124eb61257d565b8160016001607f1b030183138116156125065761250661257d565b5090039392505050565b6000828210156125225761252261257d565b500390565b600181811c9082168061253b57607f821691505b6020821081141561255c57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156125765761257661257d565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b801515811461084e57600080fdfea164736f6c6343000806000a";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): VMochiInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): VMochi;
}
//# sourceMappingURL=VMochi__factory.d.ts.map