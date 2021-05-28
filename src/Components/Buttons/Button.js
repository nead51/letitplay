import styled from 'styled-components'
import React from 'react'
import "./button.css"

export const Button = (
    children,
    type,
    onclick,
    buttonStyle,
    buttonSize
) => {

    return (
        <button onClick={onclick} type={type}>
            {children}
        </button>
    )
};