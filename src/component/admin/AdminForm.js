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
            row:{"id": "", "code":"","name":"", "item_code":"", "own_item_code":"","price":"","origin_Cost":"",
                "quentity":"","Description":""},
            resultDataSecond : []
        };
    }
    handleChangeFieldValue(event, sFieldName){
        let row = this.state.row;
        row[sFieldName] = event.target.value;
        this.setState({row:row})
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

                                <ControlLabel>name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['name']}
                                    placeholder="name"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "name")}
                                />


                                <ControlLabel>item_code</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['item_code']}
                                    placeholder="item_code"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "item_code")}
                                />

                                <ControlLabel>own_item_code</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['own_item_code']}
                                    placeholder="own_item_code"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "own_item_code")}
                                />

                                <ControlLabel>price</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['price']}
                                    placeholder="price"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "price")}
                                />

                                <ControlLabel>originCost</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['originCost']}
                                    placeholder="originCost"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "originCost")}
                                />

                                <ControlLabel>quentity</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['quentity']}
                                    placeholder="quentity"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "quentity")}
                                />

                                <ControlLabel>description</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['description']}
                                    placeholder="description"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "description")}
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
        axios.get("http://" + host1 + ":8092/aprilskin/v1/product/list/insert?id=" + this.state.row['id'] + "&code="
            + this.state.row['code'] + "&itemCod=" + this.state.row['ownItemCode']+ "&name=" + this.state.row['name']+ "&price=" + this.state.row['price']
            + "&originCost=" + this.state.row['originCost'] + "&description=" + this.state.row['description']
            + "&item_code=" + this.state.row['item_code'] + "&quentity=" + this.state.row['quentity'], {
            params: {
                //"own_item_code":this.state.row['own_item_code']
            }

        })
            .then((response) => {
                console.log(response);
                let map = response['data'];
                this.setState({"resultDataSecond": map});
            });
    }

    modifyCall(host1) {
        axios.put("http://" + host1 + ":8092/aprilskin/v1/product/update?id=" + this.state.row['id'] + "&code="
            + this.state.row['code'] + "&name=" + this.state.row['name'] + "&itemCode=" + this.state.row['ItemCode']
            + "&ownItemCode=" + this.state.row['ownItemCode'] + "&price=" + this.state.row['price']
            + "&originCost=" + this.state.row['originCost'] +  "&quentity=" + this.state.row['quentity']
            + "&description=" + this.state.row['description'], {
            params: {
            }

        })
            .then((response) => {
                console.log(response);
                let map = response['data'];
                this.setState({"resultDataSecond": map});
            });

    }




}


export default AdminForm;