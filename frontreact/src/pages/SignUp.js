import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Input from "../elements/Input";
import Button from "../elements/Button";

const SignUp = () => {
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
    if (e.target.value.length < 5 || e.target.value.length > 9) {
      setUserIdMessage("5글자 이상 9자 미만으로 입력해주세요.");
      setIsUserId(false);
    } else {
      setUserIdMessage("올바른 아이디 입니다.)");
      setIsUserId(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+=~₩])(?=.*[0-9]).{8,16}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 :)");
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  // 닉네임
  const onChangeNickName = useCallback((e) => {
    setNickName(e.target.value);

    if (e.target.value.length < 5 || e.target.value.length > 9) {
      setNickNameMessage("최소 2자이상 8자 미만으로 입력해주세요.");
      setIsNickName(false);
    } else {
      setNickNameMessage("맛있는 별명이에요 :)");
      setIsNickName(true);
    }
  }, []);

  const onSubmit = useCallback();
  // async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   try {
  //     await axios
  //       .post(REGISTER_USERS_URL, {
  //         username: name,
  //         password: password,
  //         email: email,
  //       })
  //       .then((res) => {
  //         console.log('response:', res)
  //         if (res.status === 200) {
  //           router.push('/sign_up/profile_start')
  //         }
  //       })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // },
  // [email, name, password, router]

  return (
    <div>
      <SignUpBox>
        <div>
          <h1>회원가입</h1>
        </div>
        <FormSection onSubmit={onSubmit}>
          <div>
            <div>
              <LabelBox>아이디</LabelBox>
              <InputBox>
                <Input
                  type="text"
                  typeName="userId"
                  onChange={onChangeUserId}
                  placeholder="아이디를 입력해주세요"
                  minLength={5}
                  maxLength={8}
                  size={20}
                />
                {userId.length > 0 && (
                  <span className={`message ${isUserId ? "success" : "error"}`}>
                    {userIdMessage}
                  </span>
                )}
                <Button type="button" size="small">
                  중복 확인
                </Button>
              </InputBox>
              <LabelBox>비밀번호</LabelBox>
              <InputBox>
                <Input
                  onChange={onChangePassword}
                  title="비밀번호"
                  typeTitle="password"
                  placeholder="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
                  minLength={8}
                  maxLength={15}
                  size={20}
                />
                {password.length > 0 && (
                  <span
                    className={`message ${isPassword ? "success" : "error"}`}
                  >
                    {passwordMessage}
                  </span>
                )}
              </InputBox>
              <LabelBox>비밀번호 확인</LabelBox>
              <InputBox>
                <Input
                  onChange={onChangePasswordConfirm}
                  title="비밀번호 확인"
                  typeTitle="passwordConfirm"
                  placeholder="비밀번호 한번 더 입력해주세요"
                  minLength={8}
                  maxLength={15}
                  size={20}
                />
                {passwordConfirm.length > 0 && (
                  <span
                    className={`message ${
                      isPasswordConfirm ? "success" : "error"
                    }`}
                  >
                    {passwordConfirmMessage}
                  </span>
                )}
              </InputBox>
              <LabelBox>닉네임</LabelBox>
              <InputBox>
                <Input
                  onChange={onChangeNickName}
                  title="닉네임"
                  typeTitle="nickName"
                  placeholder="닉네임을 입력해주세요"
                  minLength={2}
                  maxLength={7}
                  size={20}
                />
                {nickName.length > 0 && (
                  <span
                    className={`message ${isNickName ? "success" : "error"}`}
                  >
                    {nickNameMessage}
                  </span>
                )}
              </InputBox>
            </div>
            <ButtonSet>
              <Button type="button" size="medium">
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

const LabelBox = styled.label`
  margin: 5px;
`;
const InputBox = styled.div`
  margin: 10px;
`;

export default SignUp;
