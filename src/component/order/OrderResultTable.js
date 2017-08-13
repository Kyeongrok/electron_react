import React, {Component} from 'react';
import {Table, Row, Col} from 'react-bootstrap';

class ResultTable extends Component {
    getYymmdd(pDate){
        let a = (pDate) => pDate.getFullYear() + "-" +
            ("00" + (pDate.getMonth() + 1)).slice(-2) + "-" +
            ("00" + pDate.getDate()).slice(-2);
        return a(pDate);
    }
    render(){
        // console.log(this.props.data);
        let list2 = []

        let result = this.props.data;
        for(let element of result){
            list2.push(<TrRow key={element.no} row={element} />)
        }

        return (
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
                    <th>remark</th>
                    <th>usrext1</th>
                    <th>usrext2</th>
                    <th>usrext3</th>
                    <th>item_code</th>
                    <th>cargo_condition</th>
                    <th>qty</th>
                    <th>g.wt</th>
                    <th>n.wt</th>
                    <th>wt_unit</th>
                    <th>volume</th>
                    <th>volume_unit</th>
                    <th>production_date</th>
                    <th>effective_date</th>
                    <th>po_no</th>
                    <th>invoice_no</th>
                    <th>lot_no</th>
                    <th>remark</th>
                </tr>

                </thead>
                <tbody>
                    {list2}
                </tbody>
            </Table>
        );
    }
}

class TrRow extends Component {
    render() {
        // console.log(this.props.row);
        return(
            <tr>
                <td>{this.props.row['id']}</td>
                <td></td>
                <td>{this.props.row['no']}</td>
                <td>{this.props.row['orderDatetime']}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{this.props.row['shipName']}</td>
                <td>{this.props.row['shipAddress']}</td>
                <td></td>
                <td>{this.props.row['shipMobile']}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{this.props.row['productCode']}</td>
                <td>{this.props.row['ownItemCode']}</td>
                <td>{this.props.row['itemCode']}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        )
    }
}
export default ResultTable;