import React, { useState, useCallback } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// function

// styled
import styled from "styled-components";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Text from "../elements/Text";

const Login = () => {
  const dispatch = useDispatch();

  // // 아이디, 비밀번호, 비밀번호 확인
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // //오류메시지 상태저장
  const [loginIdMessage, setLoginIdMessage] = useState("");
  const [loginPasswordMessage, setLoginPasswordMessage] = useState("");

  // // 유효성 검사
  const [isLoginId, setIsLoginId] = useState(false);
  const [isLoginPassword, setIsLoginPassword] = useState(false);

  // 로그인아이디
  const onChangeLoginId = useCallback((e) => {
    setLoginId(e.target.value);
    if (e.target.value.length < 5 || e.target.value.length > 8) {
      setLoginIdMessage("아이디 형식이 맞지 않습니다.");
      setIsLoginId(false);
    } else {
      setLoginIdMessage("올바른 아이디 입니다.)");
      setIsLoginId(true);
    }
  }, []);

  // 비밀번호
  const onChangeLoginPassword = useCallback((e) => {
    const loginPasswordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+=~₩])(?=.*[0-9]).{8,15}$/;
    const logiPpasswordCurrent = e.target.value;
    setLoginPassword(logiPpasswordCurrent);

    if (!loginPasswordRegex.test(logiPpasswordCurrent)) {
      setLoginPasswordMessage("비밀번호 조건이 맞지 않습니다!");
      setIsLoginPassword(false);
    } else {
      setLoginPasswordMessage("안전한 비밀번호에요 :)");
      setIsLoginPassword(true);
    }
  }, []);

  // const logIn = () => {
  //   if (userId === "") {
  //     window.alert("아이디를 입력해주세요!");
  //     return;
  //   }

  //   if (password === "") {
  //     window.alert("비밀번호를 입력해주세요!");
  //     return;
  //   }

  //   if (!userIdCheck(userId)) {
  //     window.alert("아이디 형식을 확인해 주세요");
  //     return;
  //   }

  //   if (!passwordCheck(password)) {
  //     window.alert("비밀번호 형식을 확인해 주세요");
  //     return;
  //   }

  //   if (password !== passwordConfirm) {
  //     window.alert("비밀번호가 일치하지 않습니다.");
  //     return;
  //   }

  //   // dispatch(
  //   //   __registerDB({ loginId: userId, password: password, nickname: nickName })
  //   // );
  // };

  return (
    <LogInBox>
      <Text fs="36px" fw="700" mg="15px 0 15px 0">
        🙏 안녕하세요 🙏
      </Text>
      <Text fs="24px" fw="400" mg="0 0 36px 0">
        🍚남들은 뭐먹지? 먹스타그램입니다🍚
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
              onChange={onChangeLoginId}
              placeholder="🔑 아이디를 입력해주세요"
            />
            {loginId.length > 0 && (
              <Text
                fs="14px"
                fw="400"
                color={`${isLoginId ? "green" : "red"}`}
                className={`message ${isLoginId ? "success" : "error"}`}
              >
                {loginIdMessage}
              </Text>
            )}
          </InputBox>
          <Text fs="20px" fw="400">
            비밀번호
          </Text>
          <InputBox>
            <Input
              onChange={onChangeLoginPassword}
              title="비밀번호"
              typeTitle="password"
              fs="14px"
              fw="400"
              placeholder="🔒 비밀번호를 입력해주세요"
            />
            {loginPassword.length > 0 && (
              <Text
                fs="14px"
                fw="400"
                color={`${isLoginPassword ? "green" : "red"}`}
                className={`message ${isLoginPassword ? "success" : "error"}`}
              >
                {loginPasswordMessage}
              </Text>
            )}
          </InputBox>
        </div>
        <ButtonSet>
          <Button type="button" size="medium">
            로그인
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
  height: 500px;
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
