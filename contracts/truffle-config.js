const HDWalletProvider = require('@truffle/hdwallet-provider');
const pk = 'yourPrivateKey'

module.exports = {
  networks: {    
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 4444,            // Standard Ethereum port (default: none)
      network_id: "*"//,       // Any network (default: none)
      //websockets: true
    },
    testnet: {
      provider: () =>
        new HDWalletProvider(pk, "https://public-node.testnet.rsk.co:443"),
      network_id: '*',
      gas: 2500000,
      gasPrice: 60000000 // 0.06 gwei
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.5.8",
        evmVersion: "byzantium"
      }    
  }
}