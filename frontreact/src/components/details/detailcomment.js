import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __getComments } from "../../redux/modules/detailmodule";
import styled from "styled-components";
import Detailcommentitem from "./detailcommentitem";

const Detailcomment = () => {
  const params = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { comments, isLoading } = useSelector((state) => state.detailmodule);

  //메인페이지 이동핸들러
  const BackPageHandler = () => {
    navigate("/");
  };
  const commentList = comments.map((e) => {
    return <Detailcommentitem comments={e} />;
  });
  console.log(commentList);

  //수정하기open 스테이트
  const [editOpen, setEditOpen] = useState(true);
  //수정하기버튼,수정완료버튼으로 변경 수정하기input창오픈
  const inputopen = () => {
    setEditOpen(!editOpen);
  };
  //수정하기완료버튼,클릭시닫게하고 수정상태 post
  const inputcomplete = () => {
    setEditOpen(!editOpen);
  };
  useEffect(() => {
    dispatch(__getComments(params));
  }, [dispatch]);
  return (
    <>
      <LikeBackbox>
        <Backpagebutton onClick={BackPageHandler}>메인으로</Backpagebutton>
      </LikeBackbox>
      <Commentinputlayout>
        <Inputnickname>usernickname</Inputnickname>
        <Commentinput placeholder="댓글을입력해주세요" />
        {/*   댓글등록시 로그인안되어있을경우 로그인페이지로 이동 구현해야함 */}
        <Commentbutton>댓글등록</Commentbutton>
      </Commentinputlayout>
      {commentList}
    </>
  );
};

export default Detailcomment;

const Commentinputlayout = styled.div`
  width: 1020px;
  height: 150px;
  background-color: antiquewhite;
  margin-top: 50px;
  margin-left: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #f5b43d;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;
const Inputnickname = styled.p`
  font-size: 20px;
`;
const Commentinput = styled.input`
  width: 750px;
  height: 80px;
  margin-left: 20px;
  border-radius: 5px;
  background-color: aliceblue;
  font-size: 20px;
  overflow: auto;
`;
const Commentbutton = styled.button`
  width: 100px;
  height: 86px;
  border-radius: 5px;
  background-color: #7de5ed;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #81c6e8;
  }
`;
const Commentlayout = styled.div`
  width: 1020px;
  height: 100px;
  background-color: antiquewhite;
  margin-top: 10px;
  margin-left: 90px;
  border: 3px solid #f5b43d;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  display: flex;
`;
const Commentbox = styled.div`
  width: 910px;
  margin-left: 10px;
`;
const Commenteditbutton = styled.button`
  width: 100px;
  height: 86px;
  border-radius: 5px;
  background-color: #f0ff42;
  margin-top: 8px;
  margin-right: 8px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #ffe15d;
  }
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;
const Commenteditcomletebutton = styled.button`
  width: 100px;
  height: 86px;
  border-radius: 5px;
  background-color: #b6e2a1;
  margin-top: 8px;
  margin-right: 8px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #8ec3b0;
  }
  display: ${({ isOpen }) => (isOpen ? "none" : "block")};
`;
const Commentdelitebutton = styled.button`
  width: 100px;
  height: 86px;
  border-radius: 5px;
  background-color: #ffadbc;
  margin-top: 8px;
  margin-right: 8px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #dc3535;
  }
`;
const Editcommentinput = styled.input`
  width: 800px;
  height: 40px;
  outline: none;
  background-color: aliceblue;
  display: ${({ isOpen }) => (isOpen ? "none" : "block")};
`;
const Commentcontent = styled.p`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;
const Commentnickname = styled.p`
  font-weight: 800;
`;

const LikeBackbox = styled.div`
  margin: auto;
  margin-top: 20px;
  margin-bottom: -30px;
  width: 1000px;
  height: 50px;
`;
const Backpagebutton = styled.button`
  width: 150px;
  height: 50px;
  float: right;
  border-radius: 5px;
  background-color: #e8f3d6;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    background-color: #dae6c8;
  }
`;