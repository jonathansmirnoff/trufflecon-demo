import React, {Component} from 'react';
import './App.css';
import Web3 from 'web3';
import axios from 'axios';
import * as Constants from './Constants';
import * as Utils from './Utils';
import {Button} from 'react-bootstrap';
import swal from 'sweetalert';
import { MetroSpinner } from "react-spinners-kit";


class App extends Component{

  constructor() {
    super();
    this.state = { 
      messages: [],
      addresses: [],
      loading: true
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

     _this.setState({
       loading: false
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

  findWinner(){    
    let web3 = new Web3(new Web3.providers.HttpProvider(Constants.PUBLIC_TESTNET_NODE));    
    var winner = Math.floor(Math.random() * Math.floor(this.state.addresses.length));
    document.querySelector('li[data-index="' + winner + '"]').classList.add("winner");    

    Utils.getSenderName(web3, Constants.MESSAGE_BORAD_CONTRACT_ADDRESS,"0x" + this.state.addresses[winner]).then(winnerName => {      
      swal({
        title:"Good job!",
        text: "Congrats " + winnerName + "! 0x" + this.state.addresses[winner] + "\n Your message is" + this.state.messages[winner],
        icon: "success",
        button: "OK!",
      });
    })
  }

  render(){
    const { loading } = this.state;

    return (
      <div className="App">        
        <div className="Spinner">
          {loading ? <MetroSpinner
                  size={60}
                  color="#FFFFFF"
                  loading={loading}
          />: <Button variant="secondary" onClick={()=>{ this.findWinner() }}>Find a winner!</Button>}
        </div>        
        <ul>          
          { this.state.messages.map((m,i) => <li key={i} data-index={i}>{m}</li>) }
        </ul>
      </div>
    );

  }
}

export default App;