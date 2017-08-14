/**
 * Created by Yjw on 2017-07-21.
 */
import React, {Component} from 'react';
import {Row, Col, Panel, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import axios from 'axios';
// import Pagination from 'react-js-pagination';

class AdminForm extends Component{
    constructor() {
        super();
        this.state = {
            mode:"off",
            row:{"id": "","productName":"", "itemCode":"", "ownItemCode":"","orderItemQty":"","productCode":"","price":""},
            resultDataSecond : [],
            activePage: 1
        };
    }
    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
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
        if(nextProps['row'] === null) return null;
        this.setState({row: nextProps['row']});

    }
    render() {
        if(this.props.mode === "off") return false;
        let headerText = "수정";
        if(this.props.mode === "modify") {
            headerText = "수정";
        }else if(this.props.mode === "insert"){
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


                                <ControlLabel>ProductName</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['productName']}
                                    placeholder="productName"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "productName")}
                                />


                                <ControlLabel>itemCode</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['itemCode']}
                                    placeholder="itemCode"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "itemCode")}
                                />

                                <ControlLabel>ownItemCode</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['ownItemCode']}
                                    placeholder="ownItemCode"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "ownItemCode")}
                                />

                                <ControlLabel>orderItemQty</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['orderItemQty']}
                                    placeholder="orderItemQty"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "orderItemQty")}
                                />

                                <ControlLabel>productCode</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['productCode']}
                                    placeholder="productCode"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "productCode")}
                                />

                                <ControlLabel>price</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.row['price']}
                                    placeholder="price"
                                    onChange={(event)=>this.handleChangeFieldValue(event, "price")}
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
        if(this.props.mode === 'insert') {
            this.insertCall(host1);
        } else if (this.props.mode === 'modify'){
            this.modifyCall(host1);
        }
        window.location.reload();
    }
    insertCall(host1){
        axios.post("http://" + host1 + ":8092/aprilskin/v1/product/insert?id=" + this.state.row['id']
            + "&productName=" + this.state.row['productName'] + "&itemCode=" + this.state.row['itemCode']
            + "&ownItemCode=" + this.state.row['ownItemCode'] + "&orderItemQty=" + this.state.row['orderItemQty']
            + "&productCode=" + this.state.row['productCode'] + "&price=" + this.state.row['price'], {
            params: {}
        })
            .then((response) => {
                console.log(response);
                let map = response['data'];
                this.setState({"resultDataSecond": map});
            });
    }
    modifyCall(host1) {
        axios.put("http://" + host1 + ":8092/aprilskin/v1/product/update?id=" + this.state.row['id']
            + "&productName=" + this.state.row['productName'] + "&itemCode=" + this.state.row['itemCode']
            + "&ownItemCode=" + this.state.row['ownItemCode'] + "&orderItemQty=" + this.state.row['orderItemQty']
            + "&productCode=" + this.state.row['productCode'] + "&price=" + this.state.row['price'], {
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