import React, {Component} from 'react';
import {Button, Table, Grid, Row, Col, FormControl} from 'react-bootstrap';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();
        this.state = {
            message: "nothing",
        };
    }

    componentWillMount() {
        //alert("componentWillMount");
    }
    render() {
        return (
            <div className="App">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={6} md={4}>
                            <FormControl
                            type="text"
                            value={""}
                            placeholder="시작날짜"
                            onChange={this.handleChange}
                            />
                        </Col>
                        <Col xs={6} md={4}>
                            <FormControl
                                type="text"
                                value={""}
                                placeholder="끝날짜"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Row>
                </Grid>
                <p className="App-intro">

                </p>
                <div>message : {this.state.message}</div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    </tbody>
                </Table>

                <Button bsStyle="primary" onClick={() => this.handleClickHelloButton()}>Primary</Button>
                <Button bsStyle="primary" onClick={() => this.handleClickByeButton()}>bye</Button>
            </div>
        );
    }

    handleClickHelloButton() {
        axios.get("http://localhost:9000/hello").then((response) => {
            console.log(response['data']);
            this.setState({"message": response['data']});
        });
    }

    handleClickByeButton() {
        axios.get("http://localhost:9000/bye").then(response => {
            console.log(response['data']);
            this.setState({"message": response['data']});
        });
    }

}

export default App;
