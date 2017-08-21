import React from 'react';
import Authentication from '../Authentication';

class Register extends  React.Component {
    render() {
        return (
            <div>
                <Authentication mode={false} />
            </div>
        );
    }
}

export default Register;