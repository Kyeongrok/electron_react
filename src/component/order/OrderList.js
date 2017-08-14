import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

class OrderList extends Component {
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
