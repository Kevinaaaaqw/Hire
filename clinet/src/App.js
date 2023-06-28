import Link from './components/link';
import React,{Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from "./components/home";
import Member from "./components/member";
import Cart from "./components/cart";

class App extends Component {
  state = {
    route :[
      {
        link:'/',
        name : 'Home'
      },
      {
        link:'/member',
        name : 'Member'
      },
      {
        link:'/cart',
        name : 'Cart'
      }
    ]
  }
  render = () => {
    return (
      <BrowserRouter>
        <Link route={this.state.route}/>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path="/member" component={Member}/>
        <Route path="/cart" component={Cart}/>
      </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
