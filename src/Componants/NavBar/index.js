import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
        <Nav>
            <NavLink to="/">
                <h1>Logo</h1>
            </NavLink>
            <Bars />
            <NavMenu>
               <NavLink to="/about" activeStyle>
                    About
                </NavLink> 
                <NavLink to="/services" activeStyle>
                    Services
                </NavLink>
                <NavLink to="/contact-us" activeStyle>
                    Contact us
                </NavLink> 
                <NavLink to="/sign-up" activeStyle>
                    Sign up 
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to="/Sign-in">,</NavBtnLink>
            </NavBtn>

        </Nav>
        </>
    )
}

export default NavBar
