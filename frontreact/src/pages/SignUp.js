import React from "react";
import styled from "styled-components";
const SignUp = () => {
  return (
    <div>
      <HeaderBox>header</HeaderBox>
      <SignUpBox>
        <FormSection>
          <span>Form section hi</span>
          <InputBox />
          <InputBox />
          <InputBox />
        </FormSection>
      </SignUpBox>
    </div>
  );
};
const InputBox = styled.input`
  margin: 20px;
`;
const HeaderBox = styled.div`
  border: 1px solid;
  border-color: black;
  width: 100%;
  height: 30px;
  padding: 10px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FormSection = styled.form`
  border: 1px solid;
  border-color: black;
  width: 400px;
  height: 500px;
  padding: 10px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SignUpBox = styled.div`
  border: 1px solid;
  border-color: black;
  width: 100%;
  height: 800px;
  padding: 10px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default SignUp;
