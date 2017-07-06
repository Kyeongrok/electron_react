import React, {Component} from 'react';
import {Table, Row, Col} from 'react-bootstrap';

class ResultTable extends Component {
    render(){
        console.log(this.props.data['result']);
        let list2 = [

        ]

        // for(let element of this.props.data['result']){
        //     console.log(element);
        //     list2.push(<TrRow key={element.order_no} row={element} />)
        // }
        //
        return (
            <Row className="show-grid">
                <Col xs={12} md={12}>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>

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
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
        )
    }
}


export default ResultTable;