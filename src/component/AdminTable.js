import React, {Component} from 'react';
import {Table, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import AdminModify from './AdminModify';

class AdminTable extends Component {
    constructor() {
        super();
        this.state = {
            resultDataSecond: []
        };
    }

    componentWillMount() {

        console.log("component will mount hello");
        this.ajaxCall();
    }

    render(){
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

        for(let element of mappedList){
            list3.push(<TrRow key={element.id + element.code} row={element} />)
        }

        return (
            <Row className="show-grid">
                <Col xs={12} md={12}>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Code</th>
                            <th>Item_Code</th>
                            <th>Quentity</th>
                            <th>수정 및 삭제</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list3}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }

    ajaxCall() {
        let host1 = window.location.hostname;
        axios.get("http://" + host1 + ":9000/cafe24", {
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
        return(
            <tr>
                <td>{this.props.row['id']}</td>
                <td>{this.props.row['code']}</td>
                <td>{this.props.row['item_code']}</td>
                <td>{this.props.row['quentity']}</td>
                <td><button onClick={() => this.handleClickModifyButton()}>수정</button>
                    <button>삭제</button>
                </td>
            </tr>
        );
    }

    handleClickModifyButton(){

    }
}




export default AdminTable;