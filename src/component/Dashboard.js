import React, {Component} from 'react';
import {Table, Row, Col, Panel, Button} from 'react-bootstrap';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            mode: "off",
            row: {"id": 0, "code": "", "item_code": "", "quentity": 0}
        };
    }
    render() {
        return(
            <div>
                대시보드
                일별, 시간별, 브랜드별 매출
                <Table className="product_table" striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th>no</th>
                        <th>0~1시</th>
                        <th>전일동시간대비증감</th>
                        <th>1~2시</th>
                        <th>전일동시간대비증감</th>
                        <th>tsp_type</th>
                        <th>product_code</th>
                        <th>item_code</th>
                        <th>own_item_code</th>
                    </tr>

                    </thead>
                    <tbody>
                    <tr>
                        <td>브랜드1</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>브랜드1</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Dashboard;