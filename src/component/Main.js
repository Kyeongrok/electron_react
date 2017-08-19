import React from 'react';
import {Jumbotron, Button, Fade, Well} from 'react-bootstrap';
//import Authentication from "./Authentication";
import Login from "./container/Login";
import Register from "./container/Register";

class Main extends React.Component {

    handleClickButton(){
        alert("준비중입니다.");
    }

    render() {
        return(
            <Jumbotron>
                <h1>Aprilskin 주문 관리 시스템</h1>
                <p>주문 조회 화면은 app을 눌러주시고 관리자 페이지는 admin을 눌러주세요</p>

                <p>
                    <Helper/>
                </p>

                <div>
                   <Login/>
                    <Register/>
                </div>

            </Jumbotron>
        )

    }
}

class Helper extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Button bsStyle="primary" onClick={()=> this.setState({ open: !this.state.open })}>
                    도움말
                </Button>
                <Fade in={this.state.open}>
                    <div>
                        <Well>
                            관리자 페이지에서 code, item_code, quentity, product_name을 입력해주세요.
                        </Well>
                    </div>
                </Fade>
            </div>
        );
    }
}



export default Main;