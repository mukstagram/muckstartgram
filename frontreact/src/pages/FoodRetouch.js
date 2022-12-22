import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __putFood } from '../redux/modules/foodRetouchmodule';
import { __getTargetFood } from '../redux/modules/foodRetouchmodule';

const FoodRetouch = () => {
  const params = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //payload로 갈 formData
  const formData = new FormData();

  //에러메시지 관련
  const [timeErrormsg, setTimeErrormsg] = useState('');
  const [nameErrormsg, setNameErrormsg] = useState('');
  const [descErrormsg, setDescErrormsg] = useState('');
  const [imgErrormsg, setImgErrormsg] = useState('');
  const [imgErrormsg2, setImgErrormsg2] = useState('');
  const [imgErrormsg3, setImgErrormsg3] = useState('');

  //식사시간 관련
  const [time, setTime] = useState('');
  const timeChangeHandler = (e) => {
    let value = e.target.value;
    setTime(value);
    if (timeErrormsg) {
      if (value) {
        setTimeErrormsg('');
      }
    }
  };

  //음식이름 관련
  const [foodName, setFoodName] = useState('');
  const foodNameChangeHandler = (e) => {
    let value = e.target.value;
    setFoodName(value);
    if (nameErrormsg) {
      if (value) {
        setNameErrormsg('');
      }
    }
  };

  //작성내용 관련
  const [foodDesc, setFoodDesc] = useState('');
  const foodDescChangeHandler = (e) => {
    let value = e.target.value;
    setFoodDesc(value);
    if (descErrormsg) {
      if (value) {
        setDescErrormsg('');
      }
    }
  };

  //업로드 이미지 관련
  const [imgFile, setImgFile] = useState('');
  const foodImgChangeHandler = (e) => {
    //첨부파일 정보 변수화
    let value = e.target.files[0];
    setImgFile(value);
    if (imgErrormsg) {
      if (value) {
        setImgErrormsg('');
      }
      if (
        imgFile.type !== undefined &&
        imgFile.type !== 'image/png' &&
        imgFile.type !== 'image/jpg' &&
        imgFile.type !== 'image/jpeg'
      ) {
        setImgErrormsg2('확장자는 jpg, jpeg, png만 가능합니다.');
      } else {
        setImgErrormsg2('');
      }
      //사진 크기 유효성 검사
      if (imgFile.size > 3 * 1024 * 1024) {
        setImgErrormsg3('파일의 최대 크기는 3mb입니다.');
      } else {
        setImgErrormsg3('');
      }
    }
  };

  //불러온 특정 게시물
  const { isLoading, TargetFood } = useSelector(
    (state) => state.foodRetouchmodule
  );
  const targetFood = TargetFood.data;
  const first = () => {
    if (!isLoading) {
      if (targetFood) {
        setTime(targetFood.category);
        setFoodName(targetFood.title);
        setFoodDesc(targetFood.content);
      }
    }
  };

  useEffect(() => {
    dispatch(__getTargetFood(params));
  }, []);
  useEffect(() => {
    first();
  }, [targetFood]);

  //등록버튼 onClcik함수
  const submitHandler = () => {
    //시간 선택 유무 유효성 검사
    if (!time) {
      setTimeErrormsg('식사시간을 선택해주세요');
    } else {
      setTimeErrormsg('');
    }
    //음식 이름 작성 유무 유효성 검사
    if (!foodName) {
      setNameErrormsg('음식 이름을 입력해주세요');
    } else {
      setNameErrormsg('');
    }
    //내용 작성 유무 유효성 검사
    if (!foodDesc) {
      setDescErrormsg('내용을 입력해주세요');
    } else {
      setDescErrormsg('');
    }
    //사진 유무 유효성 검사
    if (!imgFile) {
      setImgErrormsg('사진을 첨부해주세요');
    } else {
      setImgErrormsg('');
      //사진 확장자 유효성 검사
      if (
        imgFile.type !== 'image/png' &&
        imgFile.type !== 'image/jpg' &&
        imgFile.type !== 'image/jpeg'
      ) {
        setImgErrormsg2('확장자는 jpg, jpeg, png만 가능합니다.');
      } else {
        setImgErrormsg2('');
      }
      //사진 크기 유효성 검사
      if (imgFile.size > 3 * 1024 * 1024) {
        setImgErrormsg3('파일의 최대 크기는 3mb입니다.');
      } else {
        setImgErrormsg3('');
      }
    }

    //만약 정상적으로 값이 입력되어 있고, 각 조건을 통과하여 에러메시지가 없다면
    if (
      time &&
      foodName &&
      foodDesc &&
      imgFile &&
      !timeErrormsg &&
      !nameErrormsg &&
      !descErrormsg &&
      !imgErrormsg &&
      !imgErrormsg2 &&
      !imgErrormsg3
    ) {
      //전달할 객체 생성
      formData.append('category', time);
      formData.append('title', foodName);
      formData.append('content', foodDesc);
      formData.append('thumbnail', imgFile);
      // 데이터 전달 명령 필요
      dispatch(__putFood({ formData: formData, params: params })).then(() => {
        navigate('/');
      });
    } else {
      alert('작성 내용을 확인해주세요!');
    }
  };

  //취소버튼 onClick함수
  const postCancleClickHandler = () => {
    if (window.confirm('글 수정을 취소하시겠습니까?')) {
      navigate(`/detail/${params}`);
    }
  };

  return (
    <Wrap>
      <div style={{ height: '100px', backgroundColor: '#fafafa ' }}></div>
      <WrapWrap>
        <Partition>
          <div>
            식사 시간{' '}
            <TimeSelector value={time} onChange={timeChangeHandler}>
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
            음식 이름{' '}
            <InputTitleSpace
              type="text"
              value={foodName}
              maxLength="20"
              placeholder="음식이름을 입력해주세요"
              onChange={foodNameChangeHandler}
            />
          </div>
          <ErrorMsg>{nameErrormsg}</ErrorMsg>
        </Partition>
        <Partition>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div>내용 작성 </div>
            <InputDescSpace
              type="text"
              cols="13"
              value={foodDesc}
              maxLength="100"
              placeholder="내용을 입력해주세요"
              onChange={foodDescChangeHandler}
            />
          </div>
          <ErrorMsg>{descErrormsg}</ErrorMsg>
        </Partition>
        <Partition>
          업로드 사진{' '}
          <InputImgSpace
            onChange={foodImgChangeHandler}
            type="file"
            accept="image/*"
          />
          <ErrorMsg>{imgErrormsg}</ErrorMsg>
          <ErrorMsg>{imgErrormsg2}</ErrorMsg>
          <ErrorMsg>{imgErrormsg3}</ErrorMsg>
        </Partition>
        <WrapButton>
          <SubmitButton onClick={submitHandler}>등록하기</SubmitButton>
          <CancleButton onClick={postCancleClickHandler}>취소</CancleButton>
        </WrapButton>
      </WrapWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: block;
  padding: 10px;
`;

const WrapWrap = styled.div`
  margin: auto;
  font-size: 30px;
  font-weight: bold;
  padding: 60px;
  max-width: 700px;
  border: 5px solid rgb(255, 220, 169);
  border-radius: 20px;
  background-color: rgb(253, 244, 230);
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

const InputDescSpace = styled.textarea`
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
  gap: 10px;
`;

const SubmitButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  background-color: rgb(252, 249, 190);
  &:hover {
    background-color: #ece9a6;
  }
`;

const CancleButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  background-color: rgb(250, 200, 184);
  &:hover {
    background-color: rgb(247, 169, 145);
  }
`;
export default FoodRetouch;
