import Link from './components/link';
import React,{Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from "./components/home"
import Member from "./components/member"
class App extends Component {
  state = {
    route :[
      {
        link:'/',
        name : 'Home'
      },{
        link:'/member',
        name : 'Member'
      }
    ]
  }
  render = () => {
    return (
      <BrowserRouter>
        <Link link={this.state.route}/>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path="/member" component={Member}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
