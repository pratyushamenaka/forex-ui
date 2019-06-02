import React, {Component} from 'react';
import logo from './logo.svg';
import moment from 'moment';
import './App.css';
import Background from './forex.png';


import Axios from 'axios';

class stockMarket extends Component {

 constructor(props) {
    super(props)
    this.state = {
      error: false,
      loading: true,
      items: null
    }
 }

 componentDidMount(){
    Axios.get('http://localhost:9090/api/calculate-profit', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        crossOrigin: true
      })
    .then(result => {
      this.setState({
        items: result.data,
        loading: false,
        error: false
      }) 
    })
    .catch(error => {
      this.setState({
         error: true
       });
    })
  }


  
  renderDetails(items) {
    return items.map(item => (
      <div>
        <ul className='stock-list'>
          <li>{moment(item.stockDate).format('DD-MMM-YY')}</li>
          <li>{item.currency}</li>
          <li>
            <span>Buy</span>
            <span>Sell</span>
          </li>
          <li>
            <span>${item.buyPrice}</span>
            <span>${item.sellPrice}</span>
          </li>
          <li>
            <span>{moment(item.buyTime, 'HHmm').format('hh:mma')}</span>
            <span>{moment(item.sellTime, 'HHmm').format('hh:mma')}</span>
          </li>
          <li>Profit: ${item.profit}</li>
        </ul>
      </div>
      
    ));
  }


  render() {
    const { loading, items, error } = this.state;
    return (
      <div><h1> Stock Market App </h1>
      <div/>
      <div>
        {loading && <div>Loading data...</div>}
        {items && <div>{this.renderDetails(items)}</div>}
        {error && <div>Error loading data...</div>}
      </div>
      </div>

    );
  }
}

export default stockMarket;
