import React from 'react';
import { css } from 'emotion'

const button__class = css`
  margin-left: 10px;
  border: 1px solid #000;
  color: #000;
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
  className,
  ...props
}) => (
  <button
    className={ button__class }
    type='button'
    {...props}
  >
    {children}
  </button>
)


export default Button
