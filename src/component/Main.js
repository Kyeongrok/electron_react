import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';

class Main extends React.Component {

    render() {
        return(
            <Jumbotron>
                <h1>Aprilskin 주문 관리 시스템</h1>
                <p>주문 조회 화면은 app을 눌러주시고 관리자 페이지는 admin을 눌러주세요</p>
                <p><Button bsStyle="primary">도움말</Button></p>
            </Jumbotron>
        )

    }
}

export default Main;