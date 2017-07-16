import React, {Component} from 'react';
import {Button, Grid, Row, Col, FormControl} from 'react-bootstrap';
import ResultTable from './component/ResultTable';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();
        let nowD = new Date();
        let beforeD = new Date();
        beforeD.setHours(nowD.getHours() - 12);

        let getYymmdd = (pDate) => pDate.getFullYear() + "-" +
            ("00" + (pDate.getMonth() + 1)).slice(-2) + "-" +
            ("00" + pDate.getDate()).slice(-2) + " " +
            ("00" + pDate.getHours()).slice(-2) + ":" +
            ("00" + pDate.getMinutes()).slice(-2) + ":" +
            ("00" + pDate.getSeconds()).slice(-2);

        this.state = {
            message: "nothing",
            startDateTime:getYymmdd(beforeD),
            endDateTime:getYymmdd(nowD),
            resultData:[],
            ownProductList:[]
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
        console.log(this.state.resultData);
        console.log(this.state.ownProductList);
        //if(this.state.ownProductList.length === 0) return false;
        return (
            <div className="App">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={5} md={4}>
                            <FormControl
                                type="text"
                                value={this.state.startDateTime}
                                placeholder="시작날짜"
                                onChange={(e)=>this.handleChangeStartDatetime(e)}
                            />
                        </Col>
                        <Col xs={5} md={4}>
                            <FormControl
                                type="text"
                                value={this.state.endDateTime}
                                placeholder="끝날짜"
                                onChange={(e)=>this.handleChangeEndDatetime(e)}
                            />
                        </Col>
                        <Col xs={2} md={4}>
                            <Button bsStyle="primary" onClick={() => this.handleClickSearchButton()}>조회</Button>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={2} md={4}>
                            {"행수:" + this.state.resultData.length}
                        </Col>
                    </Row>
                    <ResultTable data={this.state.resultData} />
                </Grid>
            </div>
        );
    }
    handleClickSearchButton() {
        this.ajaxCall();
    }
    ajaxCall(){
        let host1 = window.location.hostname;
        axios.get("http://" + host1 + ":9000/cafe24/product/list/", {
            params:{
            }
        })
        .then((response) => {
            console.log(response);
             let ar = response['data'];
             this.setState({"ownProductList": ar});
        });
        axios.get("http://" + host1 + ":9000/cafe24/list", {
            params:{
                "start_datetime":this.state['startDateTime']
                ,"end_datetime":this.state['endDateTime']
            }
        })
        .then((response) => {
            let ar = response['data'];
            this.setState({"resultData": ar});
        });
    }
}

export default App;
