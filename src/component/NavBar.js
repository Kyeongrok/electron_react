/**
 * Created by kyeongrok.kim on 2017-07-19.
 */
import React from 'react';
import {NavLink} from 'react-router-dom';
import {NavDropdown,MenuItem,Navbar,Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavBar extends React.Component{
    render(){
        return (
            <Navbar>
                <Navbar.Header>

                    <Navbar.Brand>
                        <LinkContainer to="/">
                            <a>메인</a>
                        </LinkContainer>
                    </Navbar.Brand>

                </Navbar.Header>
                <Nav>
                    <LinkContainer to="/app">
                        <NavItem eventKey={1}>주문목록</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/adminTable">
                        <NavItem eventKey={2}>관리자</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/dashboard">
                        <NavItem eventKey={3}>대시보드</NavItem>
                    </LinkContainer>

                    <NavDropdown eventKey={4} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={4.1}>Action</MenuItem>
                        <MenuItem eventKey={4.2}>Another action</MenuItem>
                        <MenuItem eventKey={4.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={4.4}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>

        )
    }
}

export default NavBar;