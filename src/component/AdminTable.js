import React, {Component} from 'react';
import {Table, Row, Col} from 'react-bootstrap';
import axios from 'axios';

class AdminTable extends Component {
    constructor() {
        super();
        this.state = {
            result:[]
        };
    }
    componentWillMount() {

        console.log("component will mount hello");
        this.ajaxCall();
    }
    render(){
        console.log(this.props.data);
        let list2 = [
        ]

        let result = this.props.data;
        console.log("here"+result.length);

        console.log(this.state.result);
        for(let element of result){
            list2.push(<TrRow key={element.id + element.code} row={element} />)
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
                         {list2}
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
                this.setState({"result": map});
            });
    }
}
/*
class ItemTr extends Component {
    render(){
        return(
            <tr>
                <td>won</td>
                <td>19</td>
                <td>item_9</td>
                <td>700</td>
            </tr>

        )
    }
}
*/

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
        )
    }
}


export default AdminTable;