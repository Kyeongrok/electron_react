import React, {Component} from 'react';
import {Table, Row, Col} from 'react-bootstrap';

class ResultTable extends Component {
    render(){
        console.log(this.props.data);
        let list2 = [
        ]

        let result = this.props.data;
        for(let element of result){
            list2.push(<TrRow key={element.order_no + element.product_code + element.item_code} row={element} />)
        }
        return (
            <Row className="show-grid">
                <Col xs={12} md={12}>
                    <Table className="product_table" striped bordered condensed hover responsive>
                        <thead>
                        <tr>
                            <th>no</th>
                            <th>exc_type</th>
                            <th>order_no</th>
                            <th>request_date</th>
                            <th>tsp_type</th>
                            <th>in/out_type</th>
                            <th>cust_nd_cd</th>
                            <th>s f/t nd cd</th>
                            <th>pic_name</th>
                            <th className="product_th">address1</th>
                            <th>pic_zipcode</th>
                            <th>pic_tel_no</th>
                            <th>pic_fax_no</th>
                            <th>PP/CC</th>
                            <th>product_code</th>
                            <th>item_code</th>
                            <th>own_item_code</th>
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
        // console.log(this.props.row);
        return(
            <tr>
                <td></td>
                <td></td>
                <td>{this.props.row['order_no']}</td>
                <td>2017-07-17</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{this.props.row['ship_name']}</td>
                <td>{this.props.row['ship_address1'] + " " +this.props.row['ship_address2'] }</td>
                <td></td>
                <td>{this.props.row['ship_mobile']}</td>
                <td></td>
                <td></td>
                <td>{this.props.row['product_code']}</td>
                <td>{this.props.row['item_code']}</td>
                <td>{this.props.row['own_item_code']}</td>

            </tr>
        )
    }
}


export default ResultTable;