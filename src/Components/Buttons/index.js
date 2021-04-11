import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
  } from './NavBarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
        <NavLink to='/step4' activeStyle>
            Playlist
        </NavLink>
        <NavLink to='/step1' activeStyle>
            Instructions
        </NavLink>
        <NavLink to='/category' activeStyle>
            Category
        </NavLink>
        <NavLink to='/step3' activeStyle>
            Step3
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;

