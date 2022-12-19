import React from "react";
import styled, { css } from "styled-components";
import flex from "../library/flex";

const Input = (props) => {
  return (
    <StInput {...props} disabled={props.disabled}>
      {props.children}
    </StInput>
  );
};

export default Input;

const StInput = styled.input`
  ${flex({})};
  border: 2px solid #eee;
  background-color: #fff;
  border-radius: 5px;
  height: 30px;
  width: 300px;
  background-color: ${({ bgColor, disabled }) => (disabled ? "#ddd" : bgColor)};
  cursor: pointer;

  ${(props) =>
    props.mg &&
    css`
      margin: ${props.mg};
    `};
  ${(props) =>
    props.ta &&
    css`
      text-align: ${props.ta};
    `};
  cursor: ${(props) => props.cursor};
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lh};
  white-space: ${(props) => props.ws};
`;
