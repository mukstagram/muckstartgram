import React from "react";
import styled from "styled-components";

const Detailcomment = () => {
  return (
    <>
      <Commentinputlayout>
        <Inputnickname>usernickname</Inputnickname>
        <Commentinput placeholder="댓글을입력해주세요" />
        <Commentbutton>댓글등록</Commentbutton>
      </Commentinputlayout>
      <Commentlayout>
        <Commentbox>
          <p>이학준</p>
          <p>너모맛있어요</p>
        </Commentbox>
        <Commenteditbutton>수정하기</Commenteditbutton>
        <Commenteditbutton>삭제하기</Commenteditbutton>
      </Commentlayout>
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
  background-color: aliceblue;
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
  background-color: aliceblue;
  margin-top: 8px;
  margin-right: 8px;
`;
