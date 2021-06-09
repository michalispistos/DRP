import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to='/' exact={true} activeStyle>
            Home
          </NavLink>
          <NavLink to='/post' activeStyle>
            Post a Project 
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {/*<NavBtn>
          </NavBtn>NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>*/}
      </Nav>
    </>
  );
};

export default Navbar;
