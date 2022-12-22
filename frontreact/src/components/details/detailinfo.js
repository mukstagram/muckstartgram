import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getFoodList } from "../../redux/modules/detailmodule";

const Detailinfo = () => {
  const param = useParams().id;
  const dispatch = useDispatch();
  const { foodList } = useSelector((state) => state.detailmodule);
  useEffect(() => {
    dispatch(__getFoodList(param));
  }, [dispatch, param]);

  return (
    <Detailcontainer>
      <Imagelayout>
        <Image
          src={
            foodList.thumbnail &&
            `${process.env.REACT_APP_IMGURL}/${foodList.thumbnail}`
          }
          alt={"사진을 불러오지 못했습니다"}
        />
      </Imagelayout>
      <Infolayout>
        <Infotitle>
          {foodList.nickname}의 {foodList.category} {foodList.title}
        </Infotitle>
        <Infocontent>
          <Contentcontent>{foodList.content}</Contentcontent>
        </Infocontent>
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
  height: 50px;
  line-height: 50px;
  background-color: #ffe5b5;
  font-size: 21px;
  text-align: center;
  border: 5px solid #f5b43d;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const Infocontent = styled.div`
  width: 450px;
  height: 380px;
  background-color: #ffe5b5;
  margin-top: 15px;
  display: flex;
  font-size: 30px;
  border-radius: 20px;
  border: 5px solid #f5b43d;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  overflow: auto;
`;
const Contentcontent = styled.p`
  padding-left: 10px;
`;
