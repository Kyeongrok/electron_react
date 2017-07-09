import React, {Component} from 'react';
import {Table, Row, Col} from 'react-bootstrap';

class ResultTable extends Component {
    render(){
        console.log(this.props.data);
        let list2 = [
        ]

        let result = this.props.data;
        console.log(result.length);
        for(let element of result){
            list2.push(<TrRow key={element.order_no} row={element} />)
        }
        return (
            <Row className="show-grid">
                <Col xs={12} md={12}>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>order_no</th>
                            <th>account_sender</th>
                            <th>address1</th>
                            <th>address2</th>
                            <th>주문개수</th>
                            <th>product_code</th>
                            <th>단품인지set인지23</th>
                        </tr>

                        </thead>
                        <tbody>
                            {list2}
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
                <td>{this.props.row['order_no']}</td>
                <td>{this.props.row['account_sender']}</td>
                <td>{this.props.row['ship_address1']}</td>
                <td>{this.props.row['ship_address2']}</td>
                <td>{this.props.row['product'].length}</td>
                <td>{this.props.row['product'][0]['product_code']}</td>
                <td>{"set"}</td>

            </tr>
        )
    }
}


export default ResultTable;