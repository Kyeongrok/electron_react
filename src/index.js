import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './component/OrderList';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import NavBar from './component/NavBar';
import Main from './component/Main';
import {HashRouter, Route, Link} from 'react-router-dom';
import {Button, ButtonToolbar, Grid, Row, Col, FormControl} from 'react-bootstrap';
import AdminTable from './component/AdminPage';
import Dashboard from './component/Dashboard';

class Root extends Component{
    render(){
        return (
            <HashRouter>
                <Grid>
                    <NavBar/>
                    <Route exact path="/" component={Main} />
                    <Route path="/adminTable" component={props => <AdminTable {...props}/>} />
                    <Route path="/app" component={props => <App {...props}/>} />
                    <Route path="/dashboard" component={props => <Dashboard {...props}/>} />
                </Grid>
            </HashRouter>
        )
    }
}


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
