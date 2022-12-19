import React from 'react';
import styled from 'styled-components';
import Item from '../components/Item/Item';
import Blankitem from '../components/Item/blankitem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { __getFoods } from '../redux/modules/homemodule';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, Food } = useSelector((state) => state.homemodule);
  const foodlist = Food.data;
  useEffect(() => {
    dispatch(__getFoods());
  }, [dispatch]);

  return (
    <Wrap>
      <MealTime>
        <div>아침</div>
      </MealTime>
      {isLoading ? (
        <WrapItems>
          <Blankitem />
          <Blankitem />
          <Blankitem />
          <Blankitem />
        </WrapItems>
      ) : foodlist ? (
        <WrapItems>
          {foodlist
            .filter((food) => food.category === '아침')
            .map((food) => {
              return <Item key={food.foodId} food={food} />;
            })}
        </WrapItems>
      ) : null}
      <MealTime>
        <div>점심</div>
      </MealTime>
      {isLoading ? (
        <WrapItems>
          <Blankitem />
          <Blankitem />
          <Blankitem />
          <Blankitem />
        </WrapItems>
      ) : foodlist ? (
        <WrapItems>
          {foodlist
            .filter((food) => food.category === '점심')
            .map((food) => {
              return <Item key={food.foodId} food={food} />;
            })}
        </WrapItems>
      ) : null}
      <MealTime>
        <div>저녁</div>
      </MealTime>
      {isLoading ? (
        <WrapItems>
          <Blankitem />
          <Blankitem />
          <Blankitem />
          <Blankitem />
        </WrapItems>
      ) : foodlist ? (
        <WrapItems>
          {foodlist
            .filter((food) => food.category === '저녁')
            .map((food) => {
              return <Item key={food.foodId} food={food} />;
            })}
        </WrapItems>
      ) : null}
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
