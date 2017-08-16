import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

class OrderResultView extends Component {
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
            list2.push(<TrRow key={element.no + element.own_item_code} row={element} />)
        }

        return (
            <Table className="product_table" striped bordered condensed hover responsive>
                <thead>
                <tr>
                    <th>no</th>
                    <th>order_no</th>
                    <th>request_date</th>
                    <th>pic_name</th>
                    <th className="product_th">address1</th>
                    <th>pic_tel_no</th>
                    <th>주문 개수</th>
                </tr>

                </thead>
                <tbody>
                    {this.props.data.map(item => {
                        return <TrRow key={Math.random()} row={item}/>
                    })}
                </tbody>
            </Table>
        );
    }
}

class TrRow extends Component {
    render() {
        let yymmddhhmmss = this.props.row['orderDatetime'][0] +"-"+ this.props.row['orderDatetime'][1] +"-"+ this.props.row['orderDatetime'][2]
        +" "+this.props.row['orderDatetime'][3] +":"+ this.props.row['orderDatetime'][4] +":"+ this.props.row['orderDatetime'][5];
        return(
            <tr>
                <td>{this.props.row['id']}</td>
                <td>{this.props.row['no']}</td>
                <td>{yymmddhhmmss}</td>
                <td>{this.props.row['shipName']}</td>
                <td>{this.props.row['shipAddress']}</td>
                <td>{this.props.row['shipMobile']}</td>
                <td>{this.props.row['productCode']}</td>
                <td>{this.props.row['ownItemCode']}</td>
                <td>{this.props.row['itemCode']}</td>
                <td>{}</td>
            </tr>
        )
    }
}
export default OrderResultView;