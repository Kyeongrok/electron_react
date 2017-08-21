import React, {Component} from 'react';
import {Button, Panel, Grid, Row, Col, FormControl, Label, Tabs, Tab} from 'react-bootstrap';
import OrderResultTable from './OrderResultTable';
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

        this.state = {
            message: "nothing",
            startDateTime: getYymmdd(beforeD),
            endDateTime: getYymmdd(nowD),
            resultData: [],
            ownProductMap: [],
            shopType:"1"
        };
    }
    getYymmdd(pDate){
        let a = (pDate) => pDate.getFullYear() + "-" +
            ("00" + (pDate.getMonth() + 1)).slice(-2) + "-" +
            ("00" + pDate.getDate()).slice(-2);
        return a(pDate);
    }
    componentWillMount() {
        // this.ajaxCall();
        this.callOrderList(shopType, this.state['startDateTime'], this.state['endDateTime']);
    }
    handleChangeStartDatetime(event) {
        this.setState({"startDateTime": event.target.value});
    }
    handleChangeEndDatetime(event) {
        this.setState({"endDateTime": event.target.value});
    }
    render() {
        // if (this.state.ownProductMap.length === 0) return false;
        let mappedList = [];
        //let mappedListSecond = [];
        for (let item of this.state.resultData) {
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
                                    <option value="00:00:00~24:00:00">::전체::</option>
                                    <option value="00:00:00~06:00:00">00:00:00~06:00:00</option>
                                    <option value="06:00:01~12:00:00">06:00:01~12:00:00</option>
                                    <option value="12:00:01~18:00:00">12:00:01~18:00:00</option>
                                    <option value="18:00:01~24:00:00">18:00:01~24:00:00</option>
                                </FormControl>
                            </Col>
                            <Col xs={2} md={2} >
                                <Button bsStyle="primary" onClick={()=>this.handleClickSearchButton()}>조회</Button>
                            </Col>
                        </Panel>
                    </Row>

                    <Row className="show-grid">
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} onEntered={()=>console.log("on entered")} title="April Skin">
                                <Label bsStyle="default">{"행수:" + this.state.resultData.length}</Label>
                                {this.state.resultData.length === 0 ? <Progress/> : <OrderResultTable data={mappedList}/>}
                            </Tab>
                            <Tab eventKey={2} onEntered={()=>this.setState({brand:"medicube"})} title="글램디">
                                <Panel>개발 예정</Panel>
                            </Tab>
                            <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
                        </Tabs>

                    </Row>
                </Grid>
            </div>
        );
    }
    handleClickSearchButton() {
        // console.log(this.state['startDateTime']);
        this.setState({resultData: []});
        this.callOrderList(shopType,his.state['startDateTime'], this.state['endDateTime']);

    }

    callOrderList(shopType, startDatetime, endDatetime){
        let host1 = window.location.hostname;
        axios.get("http://" + host1 + ":8092/aprilskin/v1/order/list", {
            params: {
                "shopType" : shopType,
                "startDateTime": startDatetime,
                "endDateTime": endDatetime
            }
        })
        .then((response) => {
            console.log(response);
            let ar = response['data']['orderProductDtoList']
            this.setState({"resultData": ar});
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
}

export default InvoiceList;
