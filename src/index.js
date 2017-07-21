import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import NavBar from './component/NavBar';
import Main from './component/Main';
import {HashRouter, Route, Link} from 'react-router-dom';
import {Button, ButtonToolbar, Grid, Row, Col, FormControl} from 'react-bootstrap';
import ParserMonitor from './component/ParserMonitor';

class Root extends Component{
    render(){
        return (
            <HashRouter>
                <Grid>
                    <NavBar/>
                    <Route exact path="/" component={Main} />
                    <Route path="/ParserMonitor" component={props => <ParserMonitor {...props}/>} />
                    <Route path="/app" component={props => <App {...props}/>} />
                </Grid>
            </HashRouter>
        )
    }
}


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
