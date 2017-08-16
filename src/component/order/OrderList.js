import React, {Component} from 'react';
import {Grid, Tabs, Tab, Row, Panel, Table} from 'react-bootstrap';
import axios from 'axios';
import OrderResultView from './OrderResultView';

class OrderList extends Component {
    constructor() {
        super();
        let nowD = new Date();
        let beforeD = new Date();
        beforeD.setHours(nowD.getHours() - 3);

        let getYymmdd = (pDate) => pDate.getFullYear() + "-" +
        ("00" + (pDate.getMonth() + 1)).slice(-2) + "-" +
        ("00" + pDate.getDate()).slice(-2) + " " +
        ("00" + pDate.getHours()).slice(-2) + ":" +
        ("00" + pDate.getMinutes()).slice(-2) + ":" +
        ("00" + pDate.getSeconds()).slice(-2);

        this.state = {
            message: "nothing",
            startDateTime: getYymmdd(beforeD),
            endDateTime: getYymmdd(nowD),
            resultData: [],
            ownProductMap: []
        };

    }

    componentWillMount() {
        this.ajaxCall();
    }

    render() {
        return (
            <div className="App">
                <Grid>
                    <Row className="show-grid">
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="April Skin"><OrderResultView data={this.state.resultData}/></Tab>
                            <Tab eventKey={2} title="글램디"><Panel>개발 예정</Panel></Tab>
                            <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
                        </Tabs>
                    </Row>
                </Grid>
            </div>
        );
    }

    handleClickSearchButton() {
        //this.ajaxCall();
    }

    ajaxCall() {
        let host1 = window.location.hostname;
        axios.get("http://" + host1 + ":8092/aprilskin/v1/order/origin", {
            params: {
                "startDateTime": this.state.startDateTime,
                "endDateTime": this.state.endDateTime
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({"resultData": response['data']});
            });
    }
}



export default OrderList;
