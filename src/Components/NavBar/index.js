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

        <NavLink to='/step1' activeStyle>
            <h1>Instructions</h1>
        </NavLink>
        <NavLink to='/category' activeStyle>
            <h1>Category</h1>
        </NavLink>  
        <NavLink to='/step4' activeStyle>
            <h1>Playlist</h1>
        </NavLink>
       
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;

