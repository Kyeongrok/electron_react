import React, {Component} from 'react';
import {Table, Row, Col, Panel, Button} from 'react-bootstrap';
import axios from 'axios';
import Progress from '../../common/component/Progress';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import Pagination from '../../common/component/Pagination';
// import _ from 'lodash';
import Pagination from 'react-js-pagination';

import AdminForm from './AdminForm';

class AdminTable extends Component {
    constructor() {
        super();
        this.state = {
            resultDataSecond: [],
            selectedRow: null,
            subMenuMode: "off",
            ajaxComplete:false,
            activePage: 1,
            totalItems: [],
            itemsCountPerPage:15
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        this.ajaxCall();
    }

    onChangePage(pageNumber){
        console.log(pageNumber);
        this.setState({activePage: pageNumber});
    }

    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    render() {
        if(this.state.resultDataSecond == null || this.state.resultDataSecond.length === 0) return false;
        //let result = this.props.data;
        //console.log("here"+result.length);

        //console.log(this.state.result);
        console.log("hi");
        let mappedList = [];

        console.log(this.state.activePage);
        console.log(this.state.itemsCountPerPage);

        let startNumber = this.state.activePage * this.state.itemsCountPerPage - this.state.itemsCountPerPage;
        let endNumber = this.state.activePage * this.state.itemsCountPerPage - 1;

        for(let i = startNumber ; i < endNumber ; i++){
            if(this.state.resultDataSecond[i] != null){
                mappedList.push(this.state.resultDataSecond[i]);
            }

        }

        if(mappedList == null) return false;

        //console.log("here"+list3.length);
        //this.state.exampleItems = list3;
        //console.log(this.state.itemsCountPerPage);
        return (
                <Panel>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <Button bsStyle="primary" onClick={() => this.handleClickInsert()}>삽입</Button>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>ProductName</th>
                                <th>ItemCode</th>
                                <th>OwnItemCode</th>
                                <th>OrderItemQty</th>
                                <th>ProductCode</th>
                                <th>Price</th>
                                <th>수정 및 삭제</th>
                            </tr>
                            </thead>
                            <tbody>
                            {mappedList.map(item =>{
                                return <TrRow row={item}/>
                            })}

                            </tbody>
                        </Table>
                        <Pagination
                            activePage={this.state.activePage}
                            totalItemsCount={this.state.resultDataSecond.length}
                            onChange={(pageNumber)=>this.onChangePage(pageNumber)}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            pageRangeDisplayed={20}
                        />
                    </Col>

                </Row>
                <AdminForm row={this.state.selectedRow} mode={this.state.subMenuMode}/>
                {this.state.resultDataSecond.length === 0 ? <Progress/> : null}
                </Panel>
        );
    }

    handleClickInsert() {
        this.setState({subMenuMode: "insert"});
    }
    callbackModify(row) {
        this.setState({subMenuMode: "modify", selectedRow: row});
    }
    ajaxCall() {
        let host1 = window.location.hostname;
        axios.get("http://" + host1 + ":8092/aprilskin/v1/product/list", {
            params: {}
        })
            .then((response) => {
                console.log(response);
                let map = response['data'];
                this.setState({"resultDataSecond": map});
            });
    }
}

class TrRow extends Component {

    render() {
        console.log(this.props.row);
        return (
            <tr>
                <td>{this.props.row['id']}</td>
                <td>{this.props.row['productName']}</td>
                <td>{this.props.row['itemCode']}</td>
                <td>{this.props.row['ownItemCode']}</td>
                <td>{this.props.row['orderItemQty']}</td>
                <td>{this.props.row['productCode']}</td>
                <td>{this.props.row['price']}</td>
                <td>
                    <button onClick={() => this.handleClickModifyButton()}>수정</button>
                    <button onClick={() => this.handleDeleteButton(this.props.row['id'])}>삭제</button>
                </td>
            </tr>
        );
    }

    handleClickModifyButton() {
        this.props.callbackModify(this.props.row);
    }

    handleDeleteButton(id) {
        let host1 = window.location.hostname;
        axios.delete("http://" + host1 + ":8092/aprilskin/v1/product/delete?id=" + id, {
            params: {}
        })

            .then((response) => {
                console.log(response);
                let map = response['data'];
                this.setState({"resultDataSecond": map});
            });

        window.location.reload();
    }
}


export default AdminTable;