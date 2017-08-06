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
                    <NavDropdown eventKey={4} title="주문목록" id="basic-nav-dropdown">

                        <LinkContainer to="/invoiceList">
                            <MenuItem eventKey={4.1}>송장용</MenuItem>
                        </LinkContainer>
                        <LinkContainer to="/orderList">      // 17.08.06  수정    원래 "/orderList" 였음
                            <MenuItem eventKey={4.2}>주문조회</MenuItem>
                        </LinkContainer>

                    </NavDropdown>

                    
                    <LinkContainer to="/adminTable">
                        <NavItem eventKey={1}>관리자</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/dashboard">
                        <NavItem eventKey={2}>대시보드</NavItem>
                    </LinkContainer>


                </Nav>
            </Navbar>

        )
    }
}

export default NavBar;