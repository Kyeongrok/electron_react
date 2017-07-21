/**
 * Created by Yjw on 2017-07-21.
 */
import React, {Component} from 'react';
import {Table, Row, Col, Panel, Button} from 'react-bootstrap';

class AdminModify extends Component{

    render() {
        if(this.props.row === null) return false;
        console.log("here:"+this.props.row);
        return(
            <Row className="show-grid">
                <Col xs={12} md={12}>
                    <input type = "text" value={this.props.row['id']}/>
                    <input type = "text"/>
                    <input type = "text"/>
                    <input type = "text"/>
                    <Button>수정</Button>
                </Col>
            </Row>
        )
    }
}


export default AdminModify;