import React, {Component} from 'react';
import {Button, ButtonToolbar, Panel, Grid, Row, Col, FormControl, Label} from 'react-bootstrap';
import ResultTable from './OrderResultTable';
import axios from 'axios';
import Progress from '../../common/component/Progress';

class OrderList extends Component {
    constructor() {
        super();
        let nowD = new Date();
        let beforeD = new Date();
        beforeD.setHours(nowD.getHours() - 3);

        let getYymmdd = (pDate) => pDate.getFullYear() + "-" +
            ("00" + (pDate.getMonth() + 1)).slice(-2) + "-" +
            ("00" + pDate.getDate()).slice(-2) + " " +
            ("00" + pDate.getHours()).slice(-2) + ":" +
            ("00" + pDate.getMinutes()).slice(-2) + ":" +
            ("00" + pDate.getSeconds()).slice(-2);

        console.log(this.getYymmdd(new Date()));

        this.state = {
            message: "nothing",
            startDateTime: getYymmdd(beforeD),
            endDateTime: getYymmdd(nowD),
            resultData: [],
            ownProductMap: []
        };
    }
    getYymmdd(pDate){
        let a = (pDate) => pDate.getFullYear() + "-" +
            ("00" + (pDate.getMonth() + 1)).slice(-2) + "-" +
            ("00" + pDate.getDate()).slice(-2);
        return a(pDate);
    }
    componentWillMount() {
        this.ajaxCall();
        this.callOrderList(this.state['startDateTime'], this.state['endDateTime']);
    }
    handleChangeStartDatetime(event) {
        this.setState({"startDateTime": event.target.value});
    }
    handleChangeEndDatetime(event) {
        this.setState({"endDateTime": event.target.value});
    }
    render() {
        //if (this.state.ownProductMap.length === 0) return false;
        let mappedList = [];
        for (let item of this.state.resultData) {
            let key = item['product_code'] + "-" + item['item_code'];
            let product = this.state.ownProductMap[key];
            try {
                item['own_item_code'] = product['own_item_code'];
            } catch (e) {
            }
            mappedList.push(item);
        }
        return (
            <div className="App">
                <Grid>
                    준비중 '송장용' 메뉴를 이용해주세요
                </Grid>
            </div>
        );
    }
    handleClickSearchButton() {
        this.ajaxCall();
    }

    callOrderList(startDatetime, endDatetime){
        let host1 = window.location.hostname;
        axios.get("http://" + host1 + ":8092/aprilskin/v1/product/list/", {
            params: {
                "start_datetime": startDatetime
                , "end_datetime": endDatetime
            }
        })
        .then((response) => {
            console.log(response);
            let ar = response//['data']['list'];
            this.setState({"resultData": ar});
        });
    }

    ajaxCall() {
        let host1 = window.location.hostname;
        axios.get("http://" + host1 + ":8092/aprilskin/v1/product/list/", {
            params: {}
        })
        .then((response) => {
            console.log(response);
            let map = response//['data'];
            this.setState({"ownProductMap": map});
        });

    }

    handleDawnTime() {
        let todatYymmdd = this.getYymmdd(new Date());
        let startDatetime = todatYymmdd + " " + "00:00:00";
        let endDatetime = todatYymmdd + " " + "06:00:00";
        this.setState({
            resultData:[]
            ,startDateTime: startDatetime
            ,endDateTime: endDatetime
        });
        this.callOrderList(startDatetime, endDatetime);
    }
    handleAmTime() {
        let todatYymmdd = this.getYymmdd(new Date());
        let startDatetime = todatYymmdd + " " + "06:00:01";
        let endDatetime = todatYymmdd + " " + "12:00:00";
        this.setState({
            resultData:[]
            ,startDateTime: startDatetime
            ,endDateTime: endDatetime
        });
        this.callOrderList(startDatetime, endDatetime);

    }
    handlePmTime() {
        let todatYymmdd = this.getYymmdd(new Date());
        let startDatetime = todatYymmdd + " " + "12:00:01";
        let endDatetime = todatYymmdd + " " + "18:00:00";
        this.setState({
            resultData:[]
            ,startDateTime: startDatetime
            ,endDateTime: endDatetime
        });
        this.callOrderList(startDatetime, endDatetime);

    }
    handleNightTime(){
        let todatYymmdd = this.getYymmdd(new Date());
        let startDatetime = todatYymmdd + " " + "18:00:01";
        let endDatetime = todatYymmdd + " " + "24:00:00";
        this.setState({
            resultData:[]
            ,startDateTime: startDatetime
            ,endDateTime: endDatetime
        });
        this.callOrderList(startDatetime, endDatetime);
        // this.ajaxCall();

    }





}

export default OrderList;
