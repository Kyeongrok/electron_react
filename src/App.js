import React, {Component} from 'react';
import {Button, Grid, Row, Col, FormControl} from 'react-bootstrap';
import ResultTable from './component/ResultTable';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();
        let d = new Date();
        let yymmdd =
            d.getFullYear() + "-" +
            ("00" + (d.getMonth() + 1)).slice(-2) + "-" +
            ("00" + d.getDate()).slice(-2) + " " +
            ("00" + d.getHours()).slice(-2) + ":" +
            ("00" + d.getMinutes()).slice(-2) + ":" +
            ("00" + d.getSeconds()).slice(-2)
        ;

        console.log(yymmdd);

        this.state = {
            message: "nothing",
            startDateTime:"2017-07-03 12:00:00",
            endDateTime:"2017-07-03 12:30:00",
            resultData:[]
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
        axios.get("http://" + host1 + ":9000/aprskin", {
            params:{
                "start_datetime":this.state['startDateTime']
                ,"end_datetime":this.state['endDateTime']
            }
        })
        .then((response) => {
            let list = [];
            let ar = response['data']['response']['result'];
            for(let item of ar){
                for(let productItem of item['product']){
                    list.push(item);
                }
            }
            this.setState({"resultData": list});
        });
    }
}

export default App;
