import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Item = ({ food }) => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <ImgSpace
        onClick={() => navigate(`/detail/:${food.foodId}`)}
        src="https://img.freepik.com/premium-vector/vector-photo-frame-design-realistic-photograph-with-blank-space-for-image_100456-341.jpg"
      />
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

const ImgSpace = styled.img`
  width: 180px;
  height: 180px;
  margin-bottom: 5px;
  cursor: pointer;
`;

const WrapTitle = styled.div`
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export default Item;
