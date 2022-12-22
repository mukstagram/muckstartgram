import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";

function Layout({ children }) {
  return (
    <Wrap>
      <Header />
      <div>{children}</div>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  min-width: 800px;
  background-color: #fbf8f1;
`;

export default Layout;
