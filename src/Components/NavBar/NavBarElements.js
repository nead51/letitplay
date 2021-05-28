import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav`
    background: #010101;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 400px) / 2);
    z-index: 10;
    height: 30vw;
`
export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
&.active {
    color: #15cdfc;
}
`
export const Bars = styled(FaBars)`
    display: none;
    color: #fff;

}
`
export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -10px;
    @media screen and (max-width: 1px) {
        display: none;
    }
`
export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;
    
    }
`
export const NavBtnLink = styled(Link)`
    border-radius: 40px;
    background: #256ce1;
    padding: 10px 50px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer
    transition: all 0.2s ease-in-out;
    textdecoration: none;
    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`