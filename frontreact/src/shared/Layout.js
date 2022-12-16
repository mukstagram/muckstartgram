import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';

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
  maxwidth: 1200px;
  minwidth: 800px;
`;

export default Layout;
