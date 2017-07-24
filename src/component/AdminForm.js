/**
 * Created by Yjw on 2017-07-21.
 */
import React, {Component} from 'react';
import {Table, Row, Col, Panel, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class AdminForm extends Component{
    constructor() {
        super();
        this.state = {
            mode:"off",
            row:{"id":0, "code":"", "item_code":"", "quentity":0}
        };
    }
    handleChangeFieldValue(event, sFieldName){
        let row = this.state.row;
        row[sFieldName] = event.target.value;
        this.setState({row:row})
    }
    handleClickButton(){
        console.log(this.state.row);
    }
    componentWillMount(){
        console.log(this.props.row);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps['row'] == null) return null;
        this.setState({row: nextProps['row']});

    }
    render() {
        if(this.props.mode === "off") return false;
        let headerText = "수정";
        if(this.props.mode == "modify") {
            headerText = "수정";
        }else if(this.props.mode == "insert"){
            headerText = "삽입";
        }

        return(
            <Row className="show-grid">
                <Col xs={6} md={6}>
                    <Panel header={headerText}>
                        <form>
                            <FormGroup
                                id="formControlsText"
                                type="text"
                                label="Text"
                                placeholder="Enter text"
                            >
                                <ControlLabel>id</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['id']}
                                    placeholder="id"
                                    onChange={()=>console.log("hello")}
                                />

                                <ControlLabel>code</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['code']}
                                    placeholder="code"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "code")}
                                />

                                <ControlLabel>item_code</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['item_code']}
                                    placeholder="item_code"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "item_code")}
                                />

                                <ControlLabel>quentity</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['quentity']}
                                    placeholder="quentity"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "quentity")}
                                />

                                <Button onClick={()=>this.handleClickButton()}>{headerText}</Button>
                            </FormGroup>
                        </form>
                    </Panel>
                </Col>
            </Row>
        )
    }
}


export default AdminForm;