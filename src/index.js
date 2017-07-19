import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import NavBar from './component/NavBar';
import {HashRouter, Route, Link} from 'react-router-dom';

class Root extends Component {
    render(){
        return (
            <HashRouter>
                <div>
                    <NavBar/>
                    <Route exact path="/" component={App} />
                    {/*<Route path="/parserMonitor" component={props => <ParserMonitor {...props} userData={userData}/>} />*/}
                </div>

            </HashRouter>
        )
    }
}


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
