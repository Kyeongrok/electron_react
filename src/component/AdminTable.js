import React, {Component} from 'react';
import {Table, Row, Col} from 'react-bootstrap';
import axios from 'axios';

class AdminTable extends Component {
    render(){
        console.log(this.props.data);
        let list3 = [];

        let result = this.props.data;
        console.log("here"+result.length);

        //console.log(this.state.result);
        console.log("hi");

        for(let element of result){
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
            </tr>
        );
    }
}


export default AdminTable;