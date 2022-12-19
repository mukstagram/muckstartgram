import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FoodPost = () => {
  const navigate = useNavigate();
  //에러메시지 관련
  const [timeErrormsg, setTimeErrormsg] = useState("");
  const [nameErrormsg, setNameErrormsg] = useState("");
  const [descErrormsg, setDescErrormsg] = useState("");
  const [imgErrormsg, setImgErrormsg] = useState("");

  //식사시간 관련
  const [time, setTime] = useState("");
  const timeChangeHandler = (e) => {
    let value = e.target.value;
    setTime(value);
  };

  //음식이름 관련
  const [foodName, setFoodName] = useState("");
  const foodNameChangeHandler = (e) => {
    let value = e.target.value;
    setFoodName(value);
  };

  //작성내용 관련
  const [foodDesc, setFoodDesc] = useState("");
  const foodDescChangeHandler = (e) => {
    let value = e.target.value;
    setFoodDesc(value);
  };

  //업로드 이미지 관련
  const [imgFile, setImgFile] = useState("");
  const foodImgChangeHandler = (e) => {
    let value = e.target.files[0];
    setImgFile(value);
  };
  //등록버튼 onClcik함수
  const submitHandler = () => {
    if (!time) {
      setTimeErrormsg("식사시간을 선택해주세요");
    } else {
      setTimeErrormsg("");
    }

    if (!foodName) {
      setNameErrormsg("음식 이름을 입력해주세요");
    } else {
      setNameErrormsg("");
    }

    if (!foodDesc) {
      setDescErrormsg("내용을 입력해주세요");
    } else {
      setDescErrormsg("");
    }

    if (!imgFile) {
      setImgErrormsg("사진을 첨부해주세요");
    } else {
      setImgErrormsg("");
    }
    //데이터 전달 명령 필요

    //메인페이지로 이동
    // navigate('/');
  };

  useEffect(() => {}, [timeErrormsg]);

  return (
    <Wrap>
      <WrapWrap>
        <Partition>
          <div>
            식사 시간{" "}
            <TimeSelector onChange={timeChangeHandler}>
              <option value="">---선택---</option>
              <option value="아침">아침</option>
              <option value="점심">점심</option>
              <option value="저녁">저녁</option>
            </TimeSelector>
          </div>
          <ErrorMsg>{timeErrormsg}</ErrorMsg>
        </Partition>
        <Partition>
          <div>
            음식 이름{" "}
            <InputTitleSpace
              type="text"
              maxLength="20"
              placeholder="음식이름을 입력해주세요"
              onChange={foodNameChangeHandler}
            />
          </div>
          <ErrorMsg>{nameErrormsg}</ErrorMsg>
        </Partition>
        <Partition>
          <div>
            내용 작성{" "}
            <InputDescSpace
              type="text"
              maxLength="100"
              placeholder="내용을 입력해주세요"
              onChange={foodDescChangeHandler}
            />
          </div>
          <ErrorMsg>{descErrormsg}</ErrorMsg>
        </Partition>
        <Partition>
          업로드 사진{" "}
          <InputImgSpace
            onChange={foodImgChangeHandler}
            type="file"
            accept="image/*"
          />
          <ErrorMsg>{imgErrormsg}</ErrorMsg>
        </Partition>
        <WrapButton>
          <SubmitButton onClick={submitHandler}>등록하기</SubmitButton>
        </WrapButton>
      </WrapWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-top: 100px;
  display: block;
  padding: 10px;
`;

const WrapWrap = styled.div`
  margin: auto;
  font-size: 30px;
  font-weight: bold;
  padding: 60px;
  max-width: 700px;
  border: 5px solid lightgrey;
  border-radius: 20px;
`;

const Partition = styled.div`
  margin-bottom: 20px;
`;

const TimeSelector = styled.select`
  width: 508px;
  height: 40px;
  font-size: 25px;
  text-align: center;
`;

const ErrorMsg = styled.div`
  margin-top: 5px;
  margin-left: 140px;
  font-size: 18px;
  color: red;
`;

const InputTitleSpace = styled.input`
  width: 500px;
  height: 40px;
  font-size: 25px;
`;

const InputDescSpace = styled.input`
  width: 500px;
  height: 200px;
  font-size: 25px;
`;

const InputImgSpace = styled.input`
  width: 300px;
  font-size: 20px;
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

const SubmitButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgb(250, 200, 184);
  &:hover {
    background-color: rgb(247, 169, 145);
  }
`;
export default FoodPost;
