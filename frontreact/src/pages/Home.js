import React from 'react';
import styled from 'styled-components';
import Item from '../components/Item/Item';

const Home = () => {
  return (
    <Wrap>
      <MealTime>
        <div>아침</div>
      </MealTime>
      <WrapItems>
        {/* 서버에서 아침인 값들 map */}
        <Item />
      </WrapItems>
      <MealTime>
        <div>점심</div>
      </MealTime>
      <WrapItems>
        {/* 서버에서 점심인 값들 map */}
        <Item />
      </WrapItems>
      <MealTime>
        <div>저녁</div>
      </MealTime>
      <WrapItems>
        {/* 서버에서 저녁인 값들 map */}
        <Item />
      </WrapItems>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-top: 100px;
`;

const MealTime = styled.div`
  margin-bottom: 15px;
  font-size: 20px;
  border: 1px solid lightgrey;
  width: 130px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #ffdca9;
  border-radius: 15px;
  font-weight: bold;
  background-color: #fdf4e6;
`;

const WrapItems = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export default Home;
