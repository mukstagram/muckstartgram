import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Item = ({ food }) => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <ImgSpace
        onClick={() => navigate(`/detail/${food.foodId}`)}
        src={`${process.env.REACT_APP_IMGURL}/${food.thumbnail}`}
      />
      <WrapTitle>
        <div style={{ height: '7px' }}></div>
        <div
          style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {food.title}
        </div>
      </WrapTitle>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 180px;
  height: 220px;
  display: block;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ImgSpace = styled.img`
  width: 180px;
  height: 180px;
  display: block;
  border-top: 1px solid #dbdbdb;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  cursor: pointer;
`;

const WrapTitle = styled.div`
  height: 38px;
  display: block;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  font-weight: 400;
  letter-spacing: 1px;
  border-top: 1px solid #dbdbdb;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: white;
`;

export default Item;
