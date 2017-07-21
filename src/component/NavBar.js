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
                            <NavLink to={{pathname: '/app'}}>app</NavLink>
                        </li>

                        <li className={this.props.selectedMenu == "score" ? "active" : ""}>
                        <NavLink to={{pathname: '/adminTable'}}>admin</NavLink>
                        </li>

                        <li className={this.props.selectedMenu == "setting" ? "active" : ""}>
                            <a onClick={() => this.state.changeMenu('setting')}>화면1</a>
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;