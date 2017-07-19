import React, {Component} from 'react';
import {Table, Row, Col} from 'react-bootstrap';

class ResultTable2 extends Component {
    render(){
        console.log(this.props.data);
        /*let list2 = [
        ]*/

        let result = this.props.data;
        console.log(result.length);
        /*for(let element of result){
            list2.push(<TrRow key={element.order_no + element.product_code + element.item_code} row={element} />)
        }*/
        return (
            <Row className="show-grid">
                <Col xs={12} md={12}>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>code</th>
                            <th>item_code</th>
                            <th>quentity</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>jung</td>
                                <td>5</td>
                                <td>item_8</td>
                                <td>500</td>
                            </tr>
                            <tr>
                                <td>won</td>
                                <td>19</td>
                                <td>item_9</td>
                                <td>700</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }
}
/*
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
}*/


export default ResultTable2;