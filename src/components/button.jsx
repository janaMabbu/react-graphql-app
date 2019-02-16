import React from 'react'
import { css } from 'emotion'

const buttonClass = css`
  margin-left: 10px;
  border: 1px solid #000;
  color: blue;
  :hover {
  color: #fff;
  background: #000;
  }
  padding: 10px;
  background: none;
  cursor: pointer;
  transition: color 0.25s ease-in-out;
  transition: background 0.25s ease-in-out;`

const Button = ({
  children,
  ...props
}) => (
  <button
    className={ buttonClass }
    type="button"
    { ...props }
  >
    { children }
  </button>
)

export default Button