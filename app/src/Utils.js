function getMessage(input, web3){        
    return web3.utils.toAscii("0x" + input.substring(70)).replace('@','').trim();    
}

function getMessageSenderAddress(input){
    return input.substring(26, 66);
}

function processNewBlockTx(tx, constants, app, utils, web3){
    if(tx.to === null) return;
    if(tx.to.toLowerCase() !== constants.MESSAGE_BORAD_CONTRACT_ADDRESS) return;          
    if(tx.input.substring(0,10) !== constants.SEND_MESSAGE_HASH) return; //filter calls sendMessage!
    
    let allMsg = app.state.messages;
    let allAddresses = app.state.addresses;
    
    //TODO: Move this to the App!
    allMsg.unshift(utils.getMessage(tx.input, web3));
    allAddresses.unshift(tx.from);
    
    app.setState({ 
        messages: allMsg,
        addresses: allAddresses 
    });
}

function getSenderName(web3, contractAddress, address){
    //TODO: Refactor this! Move contract abi to Constants.
    const messageBoard = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"userExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"userSentMessage","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"messageCount","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"text","type":"string"}],"name":"sendMessage","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"}],"name":"setUsername","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"userAddress","type":"address"},{"indexed":false,"name":"text","type":"string"}],"name":"MessageCreated","type":"event"}], contractAddress);
    return messageBoard.methods.getUserName(address).call({ from: address });
}

export{
    getMessage,
    getMessageSenderAddress,
    processNewBlockTx,
    getSenderName
}