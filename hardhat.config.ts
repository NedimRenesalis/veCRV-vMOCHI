import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "solidity-coverage";
import "hardhat-spdx-license-identifier";
import "hardhat-abi-exporter";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import '@typechain/hardhat';
import fs from "fs";
import rpcs from './rpcs.json';
let privateKeyOrMnemonic = fs.existsSync(".privateKey")
  ? fs
      .readFileSync(".privateKey")
      .toString()
      .split(",")
      .filter((x) => !x.startsWith("\n"))
  : undefined;
export default {
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
  },
  contractSizer: {
    runOnCompile: true,
    disambiguatePaths: false,
  },
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
  },
  spdxLicenseIdentifier: {
    runOnCompile: true,
  },
  solidity: {
    compilers :[
      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          metadata: {
            // do not include the metadata hash, since this is machine dependent
            // and we want all generated code to be deterministic
            // https://docs.soliditylang.org/en/v0.8.4/metadata.html
            bytecodeHash: 'none',
          },

        }
      }
    ]
  },
  networks: {
    hardhat: {
      gas: 10000000,
      accounts: {
        accountsBalance: "1000000000000000000000000",
      },
      allowUnlimitedContractSize: true,
      forking: {
        url: rpcs.mainnet,
        blockNumber: 12723753
      },
      timeout: 6000000
    },
    coverage: {
      url: "http://localhost:8555",
    },
    rinkeby : {
      url: rpcs.rinkeby,
      accounts: privateKeyOrMnemonic
    }
  },
  mocha: {
    timeout: 2000000
  }
};
