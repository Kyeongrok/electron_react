/**
 * Created by Yjw on 2017-07-21.
 */
import React, {Component} from 'react';
import {Table, Row, Col, Panel, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import axios from 'axios';

class AdminForm extends Component{
    constructor() {
        super();
        this.state = {
            mode:"off",
            row:{"id": "", "code":"", "item_code":"", "quentity":""},
            resultDataSecond : []
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
                                    onChange={(event)=> this.handleChangeFieldValue(event, "id")}
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


    handleClickButton() {
        let host1 = window.location.hostname;
        if(this.props.mode == 'insert') {
            this.insertCall(host1);
        } else if (this.props.mode == 'modify'){
            this.modifyCall(host1);
        }

        window.location.reload();
    }

    insertCall(host1){
        axios.get("http://" + host1 + ":9000/cafe24/product/insert?id=" + this.state.row['id'] + "&code="
            + this.state.row['code'] + "&item_code=" + this.state.row['item_code'] + "&quentity="
            + this.state.row['quentity'], {
            params: {}

        })
            .then((response) => {
                console.log(response);
                let map = response['data'];
                this.setState({"resultDataSecond": map});
            });
    }

    modifyCall(host1) {
        axios.get("http://" + host1 + ":9000/cafe24/product/modify?id=" + this.state.row['id'] + "&code="
            + this.state.row['code'] + "&item_code=" + this.state.row['item_code'] + "&quentity="
            + this.state.row['quentity'], {
            params: {}

        })
            .then((response) => {
                console.log(response);
                let map = response['data'];
                this.setState({"resultDataSecond": map});
            });

    }


}


export default AdminForm;