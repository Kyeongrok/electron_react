import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import OrderList from './component/order/OrderList';
import './common/css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import NavBar from './component/NavBar';
import Main from './component/Main';
import {HashRouter, Route, Link} from 'react-router-dom';
import {Button, ButtonToolbar, Grid, Row, Col, FormControl} from 'react-bootstrap';
import AdminTable from './component/AdminPage';
import Dashboard from './component/dashboard/Dashboard';

class Root extends Component{
    render(){
        return (
            <HashRouter>
                <Grid>
                    <NavBar/>
                    <Route exact path="/" component={Main} />
                    <Route path="/adminTable" component={props => <AdminTable {...props}/>} />
                    <Route path="/app" component={props => <OrderList {...props}/>} />
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
