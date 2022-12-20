import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { __setLogin } from "../redux/modules/loginmodule";

// function

// styled
import styled from "styled-components";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Text from "../elements/Text";

const Login = ({}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // isLogin 값이 ture이면은 home으로 돌아감
  const isLogin = useSelector((store) => store.loginmodule.isLogin);
  if (isLogin) {
    navigate("/");
  }

  // // 아이디, 비밀번호, 비밀번호 확인
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginButtonHandler = (e) => {
    e.preventDefault();

    dispatch(__setLogin({ loginId: loginId, password: loginPassword }));

    navigate("/");
  };

  return (
    <LogInBox>
      <Text fs="36px" fw="700" mg="15px 0px 15px 0px">
        🙏 안녕하세요 🙏
      </Text>
      <Text fs="24px" fw="400" mg="0 0 36px 0">
        🍚남들은 뭐먹지? 먹스타그램입니다🍚
      </Text>
      <Text fs="24px" fw="400" mg="0 0 36px 0">
        🍗로그인 해주세요🍗
      </Text>
      <FormSection>
        <div>
          <Text fs="20px" fw="400">
            아이디
          </Text>
          <InputBox>
            <Input
              type="text"
              typeName="userId"
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="🔑 아이디를 입력해주세요"
            />
          </InputBox>
          <Text fs="20px" fw="400">
            비밀번호
          </Text>
          <InputBox>
            <Input
              onChange={(e) => setLoginPassword(e.target.value)}
              title="비밀번호"
              typeTitle="password"
              fs="14px"
              fw="400"
              placeholder="🔒 비밀번호를 입력해주세요"
            />
          </InputBox>
        </div>
        <ButtonSet>
          <Button type="button" size="medium" onClick={loginButtonHandler}>
            로그인하기
          </Button>
        </ButtonSet>
      </FormSection>
    </LogInBox>
  );
};

const FormSection = styled.form`
  border: 5px solid;
  border-color: #f5b43d;
  background-color: #ffe5b5;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogInBox = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonSet = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  margin: 10px;
`;

export default Login;
