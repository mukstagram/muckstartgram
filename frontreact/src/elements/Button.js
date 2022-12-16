import React from "react";
import styled, { css } from "styled-components";
import flex from "../library/flex";

const Button = (props) => {
  return (
    <StButton {...props} disabled={props.disabled}>
      {props.children}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  ${flex({})};
  border: 2px solid #eee;
  background-color: #fff;
  margin: 5px;
  border-radius: 5px;
  background-color: ${({ bgColor, disabled }) => (disabled ? "#ddd" : bgColor)};
  cursor: pointer;
  &:hover {
    background-color: #dae6c8;
  }

  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 160px;
          height: 25px;
        `;
      case "medium":
        return css`
          width: 120px;
          height: 25px;
        `;
      case "small":
        return css`
          width: 80px;
          height: 25px !important;
        `;
      default:
        return css`
          width: 120px;
        `;
    }
  }}
`;
