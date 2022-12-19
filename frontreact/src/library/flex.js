import { css } from "styled-components";

const flex = ({ jusify = "center", align = "center", direction = "row" }) => {
  return css`
    display: flex;
    align-items: ${align};
    justify-content: ${jusify};
    flex-direction: ${direction};
  `;
};

export default flex;
