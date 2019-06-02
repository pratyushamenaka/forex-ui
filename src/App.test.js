import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import App from './App';
import moment from 'moment';

const appData = [
    {
        "currency": "BTC",
        "buyTime": "03:30 PM",
        "stockDate": "20180507",
        "buyPrice": 33.56,
        "sellTime": "1230",
        "sellPrice": 37.01,
        "profit": 3.45
    },
    {
        "currency": "ETC",
        "buyTime": "0900",
        "stockDate": "20180507",
        "buyPrice": 1.45,
        "sellTime": "1700",
        "sellPrice": 2.15,
        "profit": 0.7
    },
    {
        "currency": "LTC",
        "buyTime": "1700",
        "stockDate": "20180507",
        "buyPrice": 14.15,
        "sellTime": "1245",
        "sellPrice": 15.03,
        "profit": 0.88
    }
]
describe('stock app', () => {

	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	  ReactDOM.unmountComponentAtNode(div);
	});

	it('should check snapshot', () => {
		const component = shallow(<App/>)
		expect(component).toMatchSnapshot()
	})

	it('should render data', () => {
		const component = shallow(<App/>)
		component.setState({items: appData})
		const stockList = component.find('.stock-list').length
	  	expect(stockList).toBe(3);
	})

	it('should throw error', () => {
		const component = shallow(<App/>)
		component.setState({error: true})
		const stockList = component.find('.stock-list').length
	  	expect(stockList).toBe(0);
	})

})
