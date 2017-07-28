import React, {Component} from 'react';
import {Button, Panel, Col, FormControl, Label} from 'react-bootstrap';

class QueryBox extends Component {
    constructor() {
        super();
    }

    render() {
        return(
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
        )
    }
}

export default QueryBox;