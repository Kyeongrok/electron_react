/**
 * Created by kyeongrok.kim on 2017-07-19.
 */
import React from 'react';
import {NavLink} from 'react-router-dom';

class NavBar extends React.Component{
    render(){
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">메인</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li className={this.props.selectedMenu == "score" ? "active" : ""}>
                            <NavLink to={{pathname: '/app'}}>주문목록</NavLink>
                        </li>

                        <li className={this.props.selectedMenu == "score" ? "active" : ""}>
                            <NavLink to={{pathname: '/adminTable'}}>관리자</NavLink>
                        </li>

                        <li className={this.props.selectedMenu == "score" ? "active" : ""}>
                            <NavLink to={{pathname: '/dashboard'}}>대쉬보드</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;