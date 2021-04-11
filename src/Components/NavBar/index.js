import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  } from './NavBarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to=''>
        </NavLink>
        <Bars />
        <NavMenu>
          
          
        <NavLink to='/step4' activeStyle>
            Playlist
         </NavLink>
          <NavLink to='/step1' activeStyle>
            Step1
          </NavLink>
          <NavLink to='/step2' activeStyle>
            Step2
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

