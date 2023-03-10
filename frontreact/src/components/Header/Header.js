import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { logOut } from '../../redux/modules/loginmodule';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    getUser();
  }, [userName, userToken]);

  const getUser = () => {
    setUserName(localStorage.getItem('nickname'));
    setUserToken(localStorage.getItem('token'));
  };

  //글작성 이동핸들러
  const foodPostHandler = () => {
    if (userToken) {
      navigate('/foodPost');
    } else if (!userToken) {
      if (
        window.confirm(
          '글 작성은 로그인 이후 가능합니다.\n로그인 페이지로 이동하시겠습니까?'
        )
      ) {
        navigate('/login');
      }
    }
  };
  //로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    window.location.reload();
    dispatch(logOut());
  };
  //로그인 이동 핸들러
  const loginHandler = () => {
    navigate('/login');
  };
  //회원가입 이동 핸들러
  const signupHandler = () => {
    navigate('/signUp');
  };

  return (
    <Wrapheader>
      <Link
        style={{
          marginLeft: '500px',
          fontSize: '40px',
          fontWeight: 'bold',
          color: 'black',
          textDecoration: 'none',
          userSelect: 'none',
        }}
        to="/"
      >
        먹스타그램
      </Link>
      <WrapButton>
        <ButtonStyle onClick={foodPostHandler}>글 작성</ButtonStyle>
        <WithTokenButtonStyle userToken={userToken} onClick={logoutHandler}>
          로그아웃
        </WithTokenButtonStyle>
        <WithoutTokenButtonStyle userToken={userToken} onClick={loginHandler}>
          로그인
        </WithoutTokenButtonStyle>
        <WithoutTokenButtonStyle userToken={userToken} onClick={signupHandler}>
          회원가입
        </WithoutTokenButtonStyle>
        <NickTitle userName={userName}>{userName}님</NickTitle>
      </WrapButton>
    </Wrapheader>
  );
};

const Wrapheader = styled.div`
  width: 100%;
  height: 70px;
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

const WrapButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  gap: 10px;
`;

const ButtonStyle = styled.button`
  width: 100px;
  height: 35px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: #fcf9be;
  border-radius: 5px;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: #ece9a6;
  }
`;

const WithoutTokenButtonStyle = styled.button`
  width: 100px;
  height: 35px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: #fcf9be;
  border-radius: 5px;
  user-select: none;
  display: ${({ userToken }) => (userToken ? 'none' : 'block')};
  cursor: pointer;
  &:hover {
    background-color: #ece9a6;
  }
`;

const WithTokenButtonStyle = styled.button`
  width: 100px;
  height: 35px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: #fcf9be;
  border-radius: 5px;
  user-select: none;
  display: ${({ userToken }) => (userToken ? 'block' : 'none')};
  cursor: pointer;
  &:hover {
    background-color: #ece9a6;
  }
`;
const NickTitle = styled.div`
  font-size: large;
  font-weight: 600;
  margin-right: 5px;
  display: ${({ userName }) => (userName ? 'block' : 'none')};
  color: black;
`;

export default Header;
