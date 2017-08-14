import React, {Component} from 'react';
import {Button, ButtonToolbar, Panel, Grid, Row, Col, FormControl, Label} from 'react-bootstrap';
import ResultTable from './OrderResultTable';
import axios from 'axios';

class OrderList extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="App">
                <Grid>
                    준비중 '송장용' 메뉴를 이용해주세요
                </Grid>
            </div>
        );
    }
    handleClickSearchButton() {
        //this.ajaxCall();
    }

}

export default OrderList;
