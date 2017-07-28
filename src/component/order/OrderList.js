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

        let initD = new Date();
        let initDSecond = new Date();
        let initDThird = new Date();
        let initDFourth = new Date();
        let initDFifth = new Date();
        let initDSixth = new Date();
        let initDSeventh = new Date();
        initD.setHours("00","00");
        initDSecond.setHours(initD.getHours() + 6);
        initDThird.setHours("06","01");
        initDFourth.setHours("12","00");
        initDFifth.setHours(initDFourth.getHours() + 6);
        initDSixth.setHours("18","01");
        initDSeventh.setHours("24","00");



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
            initDateTime : getYymmdd(initD),
            init_2_DateTime : getYymmdd(initDSecond),
            init_3_DateTime : getYymmdd(initDThird),
            init_4_DateTime : getYymmdd(initDFourth),
            init_5_DateTime : getYymmdd(initDFifth),
            init_6_DateTime : getYymmdd(initDSixth),
            init_7_DateTime : getYymmdd(initDSeventh),
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
                            <Col xs={12} md={4}>
                                <FormControl
                                    type="text"
                                    value={this.state.startDateTime}
                                    placeholder="시작날짜"
                                    onChange={(e) => this.handleChangeStartDatetime(e)}
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <FormControl
                                    type="text"
                                    value={this.state.endDateTime}
                                    placeholder="끝날짜"
                                    onChange={(e) => this.handleChangeEndDatetime(e)}
                                />
                            </Col>
                            <Col xs={2} md={4} >
                                <Button bsStyle="primary" onClick={() => this.handleClickSearchButton()}>조회</Button>
                            </Col>
                            <Col xs={4} md={1} xl={1}>
                                <Label bsStyle="default">{"행수:" + this.state.resultData.length}</Label>
                            </Col>
                        </Panel>
                    </Row>
                    <Row className="show-grid">
                        <Panel>
                            <Button onClick={()=> this.handleDawnTime()}>00:00~06:00</Button>
                            <Button onClick={()=> this.handleAmTime()}>06:01~12:00</Button>
                            <Button onClick={()=> this.handlePmTime()}>12:01~18:00</Button>
                            <Button onClick={()=> this.handleNightTime()}>18:01~24:00</Button>

                        </Panel>
                    </Row>

                    <Row className="show-grid">
                        <Panel>
                            <ResultTable data={mappedList}/>
                            {mappedList.length == 0 ? <Progress/> : null}
                        </Panel>
                    </Row>
                </Grid>
            </div>
        );
    }
    handleClickSearchButton() {
        this.ajaxCall();
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
        axios.get("http://" + host1 + ":9000/cafe24/list", {
            params: {
                "start_datetime": this.state['startDateTime']
                , "end_datetime": this.state['endDateTime']
            }
        })
            .then((response) => {
                let ar = response['data'];
                this.setState({"resultData": ar});
            });
    }

    handleDawnTime() {
        let todatYymmdd = this.getYymmdd(new Date());
        this.setState({
            startDateTime: todatYymmdd + " " + "00:00:00"
            ,endDateTime: todatYymmdd + " " + "06:00:00"
        });

    }

    handleAmTime() {
        this.timeCall(this.init_3_DateTime , this.init_4_DateTime)
    }
    handlePmTime() {
        this.timeCall(this.init_4_DateTime , this.init_5_DateTime)
    }
    handleNightTime(){
        this.timeCall(this.init_6_DateTime , this.init_7_DateTime)
    }

    timeCall(e, k) {
        let host1 = window.location.hostname;
        axios.get("http://" + host1 + ":9000/cafe24/list", {
            params: {
                "start_datetime": this.state[e]
                , "end_datetime": this.state[k]
            }
        })
            .then((response) => {
                let ar = response['data'];
                this.setState({"resultData": ar});
            });
    }

}

export default OrderList;
