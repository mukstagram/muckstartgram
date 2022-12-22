import React from 'react';
import styled from 'styled-components';

const Blankitem = () => {
  return (
    <Wrap>
      <ImgSpace />
      <WrapTitle>
        <div>now Loading...</div>
      </WrapTitle>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 180px;
  height: 220px;
  display: block;
  border: 2px solid lightgrey;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ImgSpace = styled.div`
  width: 180px;
  height: 180px;
  margin-bottom: 5px;
  background-color: #b4b4b4;
`;

const WrapTitle = styled.div`
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export default Blankitem;
