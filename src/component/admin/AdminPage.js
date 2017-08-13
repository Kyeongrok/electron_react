import React, {Component} from 'react';
import {Table, Row, Col, Panel, Button} from 'react-bootstrap';
import axios from 'axios';
import Progress from '../../common/component/Progress';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Pagination from '../../common/component/Pagination';
import _ from 'lodash';
//import Pagination from 'react-js-pagination';

import AdminForm from './AdminForm';

class AdminTable extends Component {
    constructor() {
        super();
            /*
        var exampleItems = _.range(1,1000).map(i=> {return {id:i, productName : productName , itemCode: itemCode,
                                                            orderItemQty: orderItemQty, ownItemCode: ownItemCode,
                                                            productCode: productCode, price : price};
                                                    });*/

        this.state = {
            resultDataSecond: [],
            selectedRow: null,
            subMenuMode: "off",
            ajaxComplete:false,
            activePage: 1,
            pageOfItems : [],
            totalItems: [],
            //exampleItems: exampleItems
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        this.ajaxCall();
    }

    onChangePage(pageOfItems){
        this.setState({pageOfItems: pageOfItems});
    }

    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    render() {
        console.log(this.props.data);
        let list3 = [];

        //let result = this.props.data;
        //console.log("here"+result.length);

        //console.log(this.state.result);
        console.log("hi");
        let mappedList = [];

        for (let item of this.state.resultDataSecond) {
            mappedList.push(item);
        }
        for (let element of mappedList) {
            list3.push(<TrRow key={element.id + element.itemCode} row={element}
                              callbackModify={(row) => this.callbackModify(row)}/>)
        }
        this.state.totalItems =list3;
        //console.log("here"+list3.length);
        //this.state.exampleItems = list3;
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
                            {this.state.pageOfItems.map(item => <tr>
                                <td>{item}</td>
                                <td>{item.productName}</td>
                                <td>{item.itemCode}</td>
                                <td>{item.ownItemCode}</td>
                                <td>{item.orderItemQty}</td>
                                <td>{item.productCode}</td>
                                <td>{item.price}</td>
                            </tr>)}
                            <Pagination items={this.state.totalItems} onChangePage={this.onChangePage} />
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <AdminForm row={this.state.selectedRow} mode={this.state.subMenuMode}/>
                {list3.length == 0 ? <Progress/> : null}
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