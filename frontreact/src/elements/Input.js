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
  background-color: ${({ bgColor, disabled }) => (disabled ? "#ddd" : bgColor)};
  cursor: pointer;

  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 100%;
        `;
      case "medium":
        return css`
          width: 80px;
        `;
      case "small":
        return css`
          width: 80px;
          height: 25px !important;
        `;
      default:
        return css`
          width: 200px;
          height: 25px;
        `;
    }
  }}
`;
