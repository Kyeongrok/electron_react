import React, {Component} from 'react';
import {Button, Grid, Row, Col, FormControl} from 'react-bootstrap';
import ResultTable from './component/ResultTable';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();
        this.state = {
            message: "nothing",
            startDateTime:"2017-07-03 12:00:00",
            resultData:[]
        };
    }

    componentWillMount() {
        this.ajaxCall();
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
                                value={""}
                                placeholder="시작날짜"
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col xs={5} md={4}>
                            <FormControl
                                type="text"
                                value={""}
                                placeholder="끝날짜"
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col xs={2} md={4}>
                            <Button bsStyle="primary" onClick={() => this.handleClickHelloButton()}>조회</Button>
                        </Col>
                    </Row>
                    <ResultTable data={this.state.resultData} />
                </Grid>
            </div>
        );
    }
    handleClickHelloButton() {
        this.ajaxCall();
    }
    ajaxCall(){
        axios.get("http://localhost:9000/aprskin", {
            params:{
                "start_datetime":this.state['startDateTime']
            }
        })
        .then((response) => {
            let list = [];
            let ar = response['data']['response']['result'];
            for(let item of ar){
                list.push(item);
            }
            this.setState({"resultData": list});
        });
    }
}

export default App;
