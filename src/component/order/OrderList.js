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

        this.state = {
            message: "nothing",
            startDateTime: getYymmdd(beforeD),
            endDateTime: getYymmdd(nowD),
            resultData: [],
            ownProductMap: []
        };
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
}

export default OrderList;
