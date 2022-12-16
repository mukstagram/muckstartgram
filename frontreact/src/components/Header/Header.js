import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  //글작성 이동핸들러
  const foodPostHandler = () => {
    //추후 로그인여부 확인하는 조건 필요
    navigate('/foodPost');
  };

  const loginHandler = () => {
    navigate('/login');
  };

  const signupHandler = () => {
    navigate('/signUp');
  };
  return (
    <Wrapheader>
      <PageTitle>먹스타그램</PageTitle>
      <WrapButton>
        <ButtonStyle onClick={foodPostHandler}>글 작성</ButtonStyle>
        <ButtonStyle onClick={loginHandler}>로그인</ButtonStyle>
        <ButtonStyle onClick={signupHandler}>회원가입</ButtonStyle>
        <NickTitle>닉네임</NickTitle>
      </WrapButton>
    </Wrapheader>
  );
};

const Wrapheader = styled.div`
  width: 100%;
  height: 70px;
  margin-bottom: 50px;
  position: fixed;
  left: 50%;
  top: 0;
  z-index: 2000;
  transform: translateX(-50%);
  width: 1200px;
  height: 70px;
  background-color: #ffdca9;
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const PageTitle = styled.h1`
  margin-left: 500px;
  font-size: 40px;
  font-weight: bold;
`;

const WrapButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ButtonStyle = styled.button`
  width: 100px;
  height: 35px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: #e8f3d6;
  border-radius: 5px;
  &:hover {
    background-color: #dae6c8;
  }
`;

const NickTitle = styled.div`
  font-size: large;
  font-weight: 600;
`;

export default Header;
