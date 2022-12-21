import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  __commentRegist,
  __getComments,
  __postDelete,
} from "../../redux/modules/detailmodule";
import styled from "styled-components";
import Detailcommentitem from "./detailcommentitem";

const Detailcomment = () => {
  const params = useParams().id;
  const { foodList } = useSelector((state) => state.detailmodule);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //로컬스토리지에서 유저닉네임받아오기
  const storedNickname = localStorage.getItem("nickname");
  const pageNickname = foodList.nickname;
  //셀렉터로 comment데이터값받아오기
  const comments = useSelector((state) => state.detailmodule.comments);

  //메인페이지 버튼
  const BackPageBtn = () => {
    navigate("/");
  };
  //수정하기페이지 이동버튼
  const EditPageBtn = () => {
    navigate(`/FoodRetouch/${params}`);
  };
  // 본문삭제하기버튼
  const DeletePageBtn = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(__postDelete(params));
      navigate("/");
      window.location.reload();
    }
  };

  //댓글등록관련
  const [commentInput, setCommentInput] = useState("");
  const commentHandler = (e) => {
    let value = e.target.value;
    setCommentInput(value);
  };

  const commentregistbutton = () => {
    const newComment = { comment: commentInput };
    if (!storedNickname) {
      alert("로그인이 필요합니다!");
      navigate("/login");
    }
    if (commentInput === "") {
      alert("댓글을 입력해주세요");
    }
    dispatch(__commentRegist({ params, newComment }));
    setCommentInput("");
  };

  useEffect(() => {
    dispatch(__getComments(params));
  }, [params, dispatch]);
  return (
    <>
      <LikeBackbox>
        {storedNickname === pageNickname && (
          <Editbuttonbox usernickname={storedNickname}>
            <Editmainbutton onClick={EditPageBtn} color={"yellow"}>
              수정하기
            </Editmainbutton>
            <Editmainbutton onClick={DeletePageBtn} color={"red"}>
              삭제하기
            </Editmainbutton>
          </Editbuttonbox>
        )}
        <Backpagebutton onClick={BackPageBtn} value={"main"}>
          메인으로
        </Backpagebutton>
      </LikeBackbox>
      <Commentinputlayout>
        <Inputnickname>
          {!storedNickname ? "usernickname" : storedNickname}
        </Inputnickname>
        <Commentinput
          type="text"
          value={commentInput}
          placeholder="댓글을입력해주세요"
          onChange={commentHandler}
        />

        <Commentbutton onClick={commentregistbutton}>댓글등록</Commentbutton>
      </Commentinputlayout>
      <>
        {comments.map((commentList) => {
          return (
            <Detailcommentitem
              key={commentList.commentId}
              comment={commentList}
            />
          );
        })}
      </>
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
  font-size: 25px;
  overflow: auto;
`;
const Commentbutton = styled.button`
  width: 100px;
  height: 86px;
  border-radius: 5px;
  background-color: #7de5ed;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  &:hover {
    background-color: #81c6e8;
  }
`;

const LikeBackbox = styled.div`
  margin: auto;
  margin-top: 20px;
  margin-bottom: -30px;
  width: 1000px;
  height: 50px;
  display: flex;
`;
const Editbuttonbox = styled.div`
  margin-left: 150px;
  position: absolute;
`;
const Editmainbutton = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 5px;
  background-color: #e8f3d6;
  font-size: 30px;
  background-color: ${({ color }) =>
    color === "yellow" ? "#f0ff42" : color === "red" ? "#ffadbc" : null};
  cursor: pointer;
  &:hover {
    background-color: ${({ color }) =>
      color === "yellow" ? "#ffe15d" : color === "red" ? "#dc3535" : "#dae6c8"};
  }
`;
const Backpagebutton = styled.button`
  position: relative;
  left: 850px;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  background-color: #e8f3d6;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    background-color: #ece9a6;
  }
`;
