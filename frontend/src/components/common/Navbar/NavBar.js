import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';


class NavBar extends React.Component {
    render() {
        return (
           <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={ NavLink } to='/'>DRP12</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link exact="true" as={ NavLink } to="/">Home</Nav.Link>
                    <Nav.Link as={ NavLink } to="/post">Post a Project</Nav.Link>
                    {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>*/}
                    </Nav>
                </Navbar.Collapse>
            </Navbar> 
        );
    }
}

export default NavBar;