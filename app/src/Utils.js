function getMessage(input, web3){        
    return web3.utils.toAscii("0x" + input.substring(70)).replace('@','').trim();    
}

function getMessageSenderAddress(input){
    return input.substring(26, 66);
}

function processNewBlockTx(tx, constants, app, utils, web3){
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

export{
    getMessage,
    getMessageSenderAddress,
    processNewBlockTx  
}