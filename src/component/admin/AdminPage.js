import React, {Component} from 'react';
import {Table, Row, Col, Panel, Button} from 'react-bootstrap';
import axios from 'axios';
import Progress from '../../common/component/Progress';

import AdminForm from './AdminForm';

class AdminTable extends Component {
    constructor() {
        super();
        this.state = {
            resultDataSecond: [],
            selectedRow: null,
            subMenuMode: "off",
            ajaxComplete:false
        };
    }

    componentWillMount() {
        this.ajaxCall();
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
            list3.push(<TrRow key={element.id + element.code} row={element}
                              callbackModify={(row) => this.callbackModify(row)}/>)
        }
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
                                <th>Code</th>
                                <th>Name</th>
                                <th>Item_Code</th>
                                <th>own_Item_Code</th>
                                <th>Price</th>
                                <th>Origin_Cost</th>
                                <th>Quentity</th>
                                <th>Description</th>
                                <th>수정 및 삭제</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list3}
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
                <td>{this.props.row['code']}</td>
                <td>{this.props.row['name']}</td>
                <td>{this.props.row['itemCode']}</td>
                <td>{this.props.row['ownItemCode']}</td>
                <td>{this.props.row['price']}</td>
                <td>{this.props.row['originCost']}</td>
                <td>{this.props.row['quentity']}</td>
                <td>{this.props.row['description']}</td>
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
        axios.get("http://" + host1 + ":8092/aprilskin/product/delete?id=" + id, {
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