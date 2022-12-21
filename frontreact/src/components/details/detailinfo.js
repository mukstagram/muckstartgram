import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getFoodList } from "../../redux/modules/detailmodule";

const Detailinfo = () => {
  const param = useParams().id;
  const dispatch = useDispatch();
  const { foodList, isLoading } = useSelector((state) => state.detailmodule);

  useEffect(() => {
    dispatch(__getFoodList(param));
  }, [dispatch]);

  return (
    <Detailcontainer>
      <Imagelayout>
        {!isLoading ? (
          <Image
            src={`${process.env.REACT_APP_IMGURL}/${foodList.thumbnail}`}
            alt={"사진을 불러오지 못했습니다"}
          />
        ) : (
          <span>로딩중입니다</span>
        )}
      </Imagelayout>
      <Infolayout>
        <Infotitle>
          {foodList.userId}의 {foodList.category} {foodList.title}
        </Infotitle>
        <Infocontent>{foodList.content}</Infocontent>
      </Infolayout>
    </Detailcontainer>
  );
};
export default Detailinfo;
const Detailcontainer = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
`;

const Imagelayout = styled.div`
  width: 450px;
  height: 450px;
  margin-top: 150px;
  margin-left: 90px;
  border: 5px solid #f5b43d;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;
const Image = styled.img`
  width: 450px;
  height: 450px;
`;
const Infolayout = styled.div`
  width: 450px;
  height: 450px;
  margin-top: 150px;
  margin-left: 100px;
`;
const Infotitle = styled.div`
  width: 450px;
  height: auto;
  background-color: #ffe5b5;
  font-size: 25px;
  text-align: center;
  border: 5px solid #f5b43d;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;

const Infocontent = styled.div`
  width: 450px;
  height: 395px;
  background-color: #ffe5b5;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  border-radius: 20px;
  border: 5px solid #f5b43d;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
`;
const Backpagebutton = styled.button`
  width: 30px;
  height: 50px;
  margin-top: 90px;
`;
