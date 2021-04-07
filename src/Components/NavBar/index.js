import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavBarElements';

import {
  Orange
} from './ColorElements';

//this is the list of titles

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/intro' activeStyle>
            About
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
          <NavLink to='/step4' activeStyle>
            Step4
         </NavLink>
        </NavMenu>
      </Nav>
      
    </>
  );
};

export default Navbar;