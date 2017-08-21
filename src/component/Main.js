import React from 'react';
import {Jumbotron, Button, Fade, Well} from 'react-bootstrap';
import Login from "../containers/Login";
import Register from "../containers/Register";
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest  } from '../actions/authentication';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        // get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        // get loginData from cookie
        let loginData = getCookie('key');

        // if loginData is undefined, do nothing
        if(typeof loginData === "undefined") return;

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));

        // if not logged in, do nothing
        if(!loginData.isLoggedIn) return;

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatusRequest().then(
            () => {
                console.log(this.props.status);
                // if session is not valid
                if(!this.props.status.valid) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    document.cookie='key=' + btoa(JSON.stringify(loginData));



                }
            }
        );
    }

    handleLogout() {
        this.props.logoutRequest().then(
            () => {

                // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            }
        );
    }

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

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);