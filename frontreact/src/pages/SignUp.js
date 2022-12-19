import React, { useState, useCallback } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { __signUp } from "../redux/modules/signupmodule";

// instance
import { userIdCheck, nickNameCheck, passwordCheck } from "../shared/regExp";

// styled
import styled from "styled-components";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Text from "../elements/Text";

const SignUp = () => {
  const dispatch = useDispatch();

  // 아이디, 비밀번호, 비밀번호 확인
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickName, setNickName] = useState("");

  //오류메시지 상태저장
  const [userIdMessage, setUserIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");

  // 유효성 검사
  const [isUserId, setIsUserId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isNickName, setIsNickName] = useState(false);

  // 아이디
  const onChangeUserId = useCallback((e) => {
    setUserId(e.target.value);
    if (e.target.value.length < 5 || e.target.value.length > 8) {
      setUserIdMessage("아이디 형식이 맞지 않습니다.");
      setIsUserId(false);
    } else {
      setUserIdMessage("올바른 아이디 입니다.)");
      setIsUserId(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+=~₩])(?=.*[0-9]).{8,15}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("비밀번호 조건이 맞지 않습니다!");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 :)");
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback((e) => {
    const passwordConfirmCurrent = e.target.value;
    setPasswordConfirm(passwordConfirmCurrent);

    if (password === passwordConfirmCurrent) {
      setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
      setIsPasswordConfirm(false);
    }
  }, []);

  // 닉네임
  const onChangeNickName = useCallback((e) => {
    setNickName(e.target.value);

    if (e.target.value.length < 2 || e.target.value.length > 8) {
      setNickNameMessage("최소 2자이상 8자 미만으로 입력해주세요.");
      setIsNickName(false);
    } else {
      setNickNameMessage("맛있는 별명이에요 :)");
      setIsNickName(true);
    }
  }, []);

  const signUp = () => {
    if (userId === "") {
      window.alert("아이디를 입력해주세요!");
      return;
    }

    if (password === "") {
      window.alert("비밀번호를 입력해주세요!");
      return;
    }

    if (passwordConfirm === "") {
      window.alert("비밀번호를 확인해주세요!");
      return;
    }

    if (nickName === "") {
      window.alert("닉네임을 입력해주세요!");
      return;
    }

    if (!userIdCheck(userId)) {
      window.alert("아이디 형식을 확인해 주세요");
      return;
    }

    if (!passwordCheck(password)) {
      window.alert("비밀번호 형식을 확인해 주세요");
      return;
    }

    if (password !== passwordConfirm) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    dispatch(
      __signUp({ loginId: userId, password: password, nickname: nickName })
    );
  };

  return (
    <div>
      <SignUpBox>
        <Text fs="36px" fw="700" mg="15px 0 15px 0">
          🙌 환영합니다 🙌
        </Text>
        <Text fs="24px" fw="400" mg="0 0 36px 0">
          회원가입을 위해 아래 정보를 입력해 주세요
        </Text>
        <FormSection>
          <div>
            <div>
              <Text fs="20px" fw="400">
                아이디
              </Text>
              <InputBox>
                <Input
                  type="text"
                  typeName="userId"
                  onChange={onChangeUserId}
                  placeholder="🔑 아이디를 입력해주세요"
                />
                {userId.length > 0 ? (
                  <Text
                    fs="14px"
                    fw="400"
                    color={`${isUserId ? "green" : "red"}`}
                    className={`message ${isUserId ? "success" : "error"}`}
                  >
                    {userIdMessage}
                  </Text>
                ) : (
                  <Text fs="14px" fw="400" color="black">
                    영문자+숫자 조합으로 5자 이상 9자 미만으로 입력해주세요.
                  </Text>
                )}
                {/* <Button type="button" size="medium">
                  중복 확인
                </Button> */}
              </InputBox>
              <Text fs="20px" fw="400">
                비밀번호
              </Text>
              <InputBox>
                <Input
                  onChange={onChangePassword}
                  title="비밀번호"
                  typeTitle="password"
                  fs="14px"
                  fw="400"
                  placeholder="🔒 비밀번호 "
                />
                {password.length > 0 ? (
                  <Text
                    fs="14px"
                    fw="400"
                    color={`${isPassword ? "green" : "red"}`}
                    className={`message ${isPassword ? "success" : "error"}`}
                  >
                    {passwordMessage}
                  </Text>
                ) : (
                  <Text fs="14px" fw="400" color="black">
                    숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.
                  </Text>
                )}
              </InputBox>
              <Text fs="20px" fw="400">
                비밀번호 확인
              </Text>
              <InputBox>
                <Input
                  onChange={onChangePasswordConfirm}
                  title="비밀번호 확인"
                  typeTitle="passwordConfirm"
                  placeholder="비밀번호 한번 더 입력해주세요"
                />
                {passwordConfirm.length > 0 ? (
                  <Text
                    fs="14px"
                    fw="400"
                    color={`${isPasswordConfirm ? "green" : "red"}`}
                    className={`message ${
                      isPasswordConfirm ? "success" : "error"
                    }`}
                  >
                    {passwordConfirmMessage}
                  </Text>
                ) : (
                  <Text fs="14px" fw="400" color="black">
                    비밀번호를 다시 한번 입력해주세요.
                  </Text>
                )}
              </InputBox>
              <Text fs="20px" fw="400">
                닉네임
              </Text>
              <InputBox>
                <Input
                  onChange={onChangeNickName}
                  title="닉네임"
                  typeTitle="nickName"
                  placeholder="닉네임을 입력해주세요"
                />
                {nickName.length > 0 ? (
                  <Text
                    fs="14px"
                    fw="400"
                    color={`${isNickName ? "green" : "red"}`}
                    className={`message ${isNickName ? "success" : "error"}`}
                  >
                    {nickNameMessage}
                  </Text>
                ) : (
                  <Text fs="14px" fw="400" color="black">
                    2자 이상 8자 미만으로 입력해주세요.
                  </Text>
                )}
              </InputBox>
            </div>
            <ButtonSet>
              <Button type="button" size="medium" onClick={signUp}>
                회원가입하기
              </Button>
            </ButtonSet>
          </div>
        </FormSection>
      </SignUpBox>
    </div>
  );
};

// const messageBox = styled.span`
//   font-size: small;
// `;

const FormSection = styled.form`
  border: 5px solid;
  border-color: #f5b43d;
  background-color: #ffe5b5;
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SignUpBox = styled.div`
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

export default SignUp;
