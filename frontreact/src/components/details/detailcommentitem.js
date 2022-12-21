import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __getComments,
  __commentDelete,
  __commentEdit,
} from "../../redux/modules/detailmodule";
import styled from "styled-components";

const Detailcommentitem = ({ comment }) => {
  const dispatch = useDispatch();
  const params = useParams().id;
  //수정하기open 스테이트
  const [editOpen, setEditOpen] = useState(true);
  //수정하기버튼,수정완료버튼으로 변경 수정하기input창오픈
  const inputopen = () => {
    setEditOpen(!editOpen);
  };
  const [editComment, setEditComment] = useState("");
  //수정하기완료버튼,클릭시닫게하고 수정상태 post
  const ChangeCommentHandler = (e) => {
    setEditComment(e.target.value);
  };
  const inputcomplete = () => {
    dispatch(__commentEdit(params, setEditComment()));
    setEditOpen(!editOpen);
  };
  return (
    <Commentlayout>
      <Commentbox>
        <Commentnickname>{comment.nickname}</Commentnickname>
        <Commentcontent ket={comment.commentId} isOpen={editOpen}>
          {comment.comment}
        </Commentcontent>
        <Editcommentinput
          isOpen={editOpen}
          placeholder="수정사항을입력해주세요"
          onChange={ChangeCommentHandler}
        />
      </Commentbox>
      <Commenteditcomletebutton isOpen={editOpen} onClick={inputcomplete}>
        수정완료
      </Commenteditcomletebutton>
      <Commenteditbutton onClick={inputopen} isOpen={editOpen}>
        수정하기
      </Commenteditbutton>
      <Commentdelitebutton
        btnColor="red"
        value={comment.commentId}
        onClick={() => dispatch(__commentDelete([comment.commentId, params]))}
      >
        삭제하기
      </Commentdelitebutton>
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
