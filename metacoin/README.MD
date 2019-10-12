# vOpen RSK Workshop

this is an example of [Truffle Project](https://www.trufflesuite.com/). It will be used to work with [Ganache](https://www.trufflesuite.com/ganache).
For more information about the project visit [MetaCoin](https://github.com/truffle-box/metacoin-box.) Also if you are insteresting in truffle-boxes visit this [link](https://www.trufflesuite.com/boxes) 

## Ganache
To install Ganache please go [here](https://www.trufflesuite.com/ganache). For more information about [Ganache](https://www.trufflesuite.com/ganache) go [here](https://www.trufflesuite.com/docs/ganache/quickstart).

## Dependency
To deploy it using [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation):
- Install Truffle with `npm install -g truffle`
- Install project dependency with `npm install`
- Connect to `development` with `truffle console --network development`. Develpment network is configured to connect to [Ganache](https://www.trufflesuite.com/ganache).


## MetaCoin 
- Link [Ganache](https://www.trufflesuite.com/ganache) to MetaCoin Project following this [link](https://www.trufflesuite.com/docs/ganache/truffle-projects/linking-a-truffle-project).
- In `truffle-confij.js` update `mnemonic` with the mnemonic of Ganache.
- Go to MetaCoin folder and compile contract with `truffle compile`
- Deploy the contracts with `truffle migration`. 


### Interact with MetaCoin Contract
- Connect to `development` with `truffle console --network development`.
- Get deployed instance with
    ```
    >> truffle(develop..)> let instance = await MetaCoin.deployed()
    >> truffle(develop..)> instance
    ```
- Send coins to another account with 
    ```
    >> truffle(develop..)> let accounts = await web3.eth.getAccounts()
    >> truffle(develop..)> instance.sendCoin(accounts[1], 10, {from: accounts[0]})
    ```
- Get balance of account with
    ```
    >> truffle(develop..)> let balance = await instance.getBalance(accounts[0])
    >> truffle(develop..)> balance.toNumber()
    ````