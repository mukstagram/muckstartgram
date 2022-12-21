import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __commentDelete,
  __commentEdit,
} from "../../redux/modules/detailmodule";
import styled from "styled-components";

const Detailcommentitem = ({ comment }) => {
  const dispatch = useDispatch();
  const params = useParams().id;

  //로컬스토리지에서 유저닉네임받아오기
  const storedNickname = localStorage.getItem("nickname");
  const commentNickname = comment.nickname;
  //수정하기open 스테이트
  const [editOpen, setEditOpen] = useState(true);
  //수정하기버튼,수정완료버튼으로 변경 수정하기input창오픈
  const inputopen = () => {
    setEditOpen(!editOpen);
  };
  const [editComment, setEditComment] = useState(comment.comment);
  //수정하기완료버튼,클릭시닫게하고 수정상태 post
  const ChangeCommentHandler = (e) => {
    let value = e.target.value;
    setEditComment(value);
  };
  const inputcomplete = () => {
    const editCom = { comment: editComment };
    const commentId = comment.commentId;
    if (editComment === "") {
      alert("수정 할 내용을 입력해주세요!");
    }
    dispatch(__commentEdit({ commentId, editCom, params }));
    setEditComment("");
    setEditOpen(!editOpen);
  };
  return (
    <Commentlayout>
      <Commentbox>
        <Commentnickname>{comment.nickname}</Commentnickname>
        <Commentcontent key={comment.commentId} isOpen={editOpen}>
          {comment.comment}
        </Commentcontent>
        <Editcommentinput
          isOpen={editOpen}
          value={editComment}
          onChange={ChangeCommentHandler}
        />
      </Commentbox>
      {storedNickname === commentNickname && (
        <>
          <Commenteditcomletebutton isOpen={editOpen} onClick={inputcomplete}>
            수정완료
          </Commenteditcomletebutton>
          <Commenteditbutton onClick={inputopen} isOpen={editOpen}>
            수정하기
          </Commenteditbutton>
          <Commentdelitebutton
            btnColor="red"
            value={comment.commentId}
            onClick={() =>
              dispatch(__commentDelete([comment.commentId, params]))
            }
          >
            삭제하기
          </Commentdelitebutton>
        </>
      )}
    </Commentlayout>
  );
};

export default Detailcommentitem;
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
  overflow: auto;
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
  font-weight: 800;
`;
const Commenteditcomletebutton = styled.button`
  width: 100px;
  height: 86px;
  border-radius: 5px;
  background-color: #b6e2a1;
  margin-top: 8px;
  margin-right: 8px;
  font-size: 18px;
  font-weight: 800;
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
  font-weight: 800;
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
  font-size: 18px;
`;
const Commentcontent = styled.p`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  font-size: 18px;
`;
const Commentnickname = styled.p`
  font-weight: 800;
`;
