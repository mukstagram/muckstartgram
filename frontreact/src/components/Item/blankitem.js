import React from 'react';
import styled from 'styled-components';

const Blankitem = () => {
  return (
    <Wrap>
      <ImgSpace />
      <WrapTitle>
        <div>요리타이틀</div>
      </WrapTitle>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 180px;
  height: 220px;
  display: block;
  border: 1px solid lightgrey;
  margin-bottom: 10px;
`;

const ImgSpace = styled.div`
  width: 180px;
  height: 180px;
  margin-bottom: 5px;
  background-color: gray;
`;

const WrapTitle = styled.div`
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export default Blankitem;
