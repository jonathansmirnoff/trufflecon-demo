import React, {Component} from 'react';
import './App.css';
import Web3 from 'web3';
import axios from 'axios';
import * as Constants from './Constants';
import * as Utils from './Utils';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = { 
      messages: [],
      addresses: [] 
    };    
  }  

  async componentDidMount(){
    var actualBlock = null;
    var _this = this;

    let web3 = new Web3(new Web3.providers.WebsocketProvider(Constants.API_WS_URL));
    let result = await axios.get(Constants.API_URL);

    _this.setState({ 
      messages: result.data.data.map(i => Utils.getMessage(i.data, web3)),
      addresses: result.data.data.map(i => Utils.getMessageSenderAddress(i.data))
     });

    web3.eth.subscribe('newBlockHeaders', (error, result) => {      
      if (error || !result) {
        console.error(error);
        return;
      }

      if (actualBlock === result.number) {
        return;
      }
      actualBlock = result.number;      

      console.log("newblock " + result.number);

      web3.eth.getBlock(result.number, true).then(function(block){
        block.transactions.forEach(function(tx) {
          Utils.processNewBlockTx(tx, Constants, _this, Utils, web3);          
        });
      });
    });

  }

  render(){

    return (
      <div className="App">
        <button onClick={()=>{ console.log(this.state.addresses.length); var winner = Math.floor(Math.random() * Math.floor(this.state.addresses.length)); console.log(winner); alert(this.state.addresses[winner]); document.querySelector('li[data-index="' + winner + '"]').classList.add("winner"); }}>spin!</button>
        <ul>
          { this.state.messages.map((m,i) => <li key={i} data-index={i}>{m}</li>) }
        </ul>
      </div>
    );

  }
}

export default App;