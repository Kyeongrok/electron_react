
import React from 'react';
import Authentication from '../Authentication';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';

class Login extends React.Component {
    render(){
        return (
            <div>
                < Authentication mode={true}/>
            </div>
        );
    }
}

export default Login;