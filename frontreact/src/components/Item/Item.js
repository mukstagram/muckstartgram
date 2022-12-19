import React from 'react';
import styled from 'styled-components';

const Item = () => {
  return (
    <ImgSpace src="https://img.freepik.com/premium-vector/vector-photo-frame-design-realistic-photograph-with-blank-space-for-image_100456-341.jpg"></ImgSpace>
  );
};

const ImgSpace = styled.img`
  width: 180px;
  height: 180px;
  margin-bottom: 10px;
`;

export default Item;
