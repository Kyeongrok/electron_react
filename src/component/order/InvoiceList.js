import React, {Component} from 'react';
import {Button, ButtonToolbar, Panel, Grid, Row, Col, FormControl, Label} from 'react-bootstrap';
import ResultTable from './OrderResultTable';
import axios from 'axios';
import Progress from '../../common/component/Progress';

class InvoiceList extends Component {
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
                    <Row className="show-grid">
                        <Panel>
                            <Col xs={12} md={3}>
                                <FormControl
                                    type="text"
                                    value={this.state.startDateTime}
                                    placeholder="시작날짜"
                                    onChange={(e) => this.handleChangeStartDatetime(e)}
                                />
                            </Col>
                            <Col xs={12} md={3}>
                                <FormControl
                                    type="text"
                                    value={this.state.endDateTime}
                                    placeholder="끝날짜"
                                    onChange={(e) => this.handleChangeEndDatetime(e)}
                                />
                            </Col>
                            <Col xs={2} md={3} >

                                <FormControl onChange={(event)=>this.handleChangeSelectedTime(event)} componentClass="select" placeholder="select">
                                    <option value="00:00:00~06:00:00">00:00:00~06:00:00</option>
                                    <option value="06:00:01~12:00:00">06:00:01~12:00:00</option>
                                    <option value="12:00:01~18:00:00">12:00:01~18:00:00</option>
                                    <option value="18:00:01~24:00:00">18:00:01~24:00:00</option>
                                </FormControl>
                            </Col>
                            <Col xs={2} md={2} >
                                <Button bsStyle="primary" onClick={() => this.handleClickSearchButton()}>조회</Button>
                            </Col>

                        </Panel>
                    </Row>
                    <Row className="show-grid">
                        <Panel>
                            <Label bsStyle="default">{"행수:" + this.state.resultData.length}</Label>
                            {this.state.resultData.length == 0 ? <Progress/> : <ResultTable data={mappedList}/>}
                        </Panel>
                    </Row>
                </Grid>
            </div>
        );
    }
    handleClickSearchButton() {
        this.ajaxCall();
    }

    callOrderList(startDatetime, endDatetime){
        let host1 = window.location.hostname;
        axios.get("http://" + host1 + ":9000/cafe24/list", {
            params: {
                "start_datetime": startDatetime
                , "end_datetime": endDatetime
            }
        })
            .then((response) => {
                console.log(response);
                let ar = response['data']['list'];
                this.setState({"resultData": ar});
            });
    }

    ajaxCall() {
        let host1 = window.location.hostname;
        axios.get("http://" + host1 + ":9000/cafe24/product/list/", {
            params: {}
        })
            .then((response) => {
                console.log(response);
                let map = response['data'];
                this.setState({"ownProductMap": map});
            });

    }

    handleChangeSelectedTime(event){
        let ar = event.target.value.split("~");

        let todatYymmdd = this.getYymmdd(new Date());
        let startDatetime = todatYymmdd + " " + ar[0];
        let endDatetime = todatYymmdd + " " + ar[1];
        this.setState({
            resultData:[]
            ,startDateTime: startDatetime
            ,endDateTime: endDatetime
        });
        this.callOrderList(startDatetime, endDatetime);
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

export default InvoiceList;
