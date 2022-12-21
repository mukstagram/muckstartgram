# 2조 먹스타그램

- 프로젝트소개 : 일상의 맛있는 음식을 공유하는 플랫폼 입니다 :)

- frontend : React, backend : NodeJS

---

## 실행화면 및 배포주소 (최종 배포 후 작성)

---

## 사용 패키지

- react, @reduxjs/toolkit, axios, react-dom, react-redux, react-router-dom, react-scripts, styled-components

---

## trouble shooting (FE)

---

- 발생
  로그인, 회원가입 후에 성공시에만 메인페이지로 이동하는 기능을 구현하려고 하였으나 실패시에도 메인페이지로 이동하는 문제 발생

- 원인
  로그인 또는 회원가입 버튼을 클릭하면 navigate('/') 가 작동하는 식으로 페이지간 이동 기능을 구현했지만 이것은 실패시에도 작동함

- 해결
  로그인 또는 회원가입이 성공하면 메인페이지로 이동하도록 모듈 thunk 함수에
  window.location.href = "https://fe-deploy-nu.vercel.app/"; 추가

---

- 발생
  회원가입시에 비밀번호와 비밀번호확인이 문자열이 같은데도 다른 것으로 인식하는 문제

- 원인
  참고해서 가져온 code에서 useCallback을 사용하고 있었는데 이것으로 인해 state가 변경된것이 인지되지 않아서 발생하는 문제였다.

- 해결
  useCallback을 삭제한 뒤에 제대로 인식되는 것을 확인. 앞으로 코드를 참조할때는 정확하게 왜 쓰는 것인지 이해하고 상황에 맞게 적용하여 써야겠다.

---

- 발생
  패키지 history와 connecte-react-dom 을 설치하고 실행하였을 때 아래와 같은 에러가 발생
  Uncaught ReferenceError: Cannot access '**WEBPACK_DEFAULT_EXPORT**' before initialization

- 원인
  redux toolkit에 맞지 않거나 버전이 맞지 않는 패키지를 설치하여서 발생한 문제

- 해결
  맞지 않는 패키지를 삭제한 후에 정상 작동 확인

---

- 발생
  초기에 폴더구조를 만들고 기본적인 파일들을 만들어 주면서 소문자로 생성한 파일명을 대문자로 수정해주었는데도 brach checkout 후에 소문자로 다시 변경되는 문제

- 원인
  git에서 애초에 대문자 소문자 변경을 인식하지 못해서 발생한 문제였음

- 해결
  git 에서 대문자 파일을 인식하도록 git config core.ignorecase false를 터미널에 입력하여 설정변경
  branch 삭제 후 재생성, local repo 삭제후 재생성

---

## 코드리뷰

- 1번리뷰

- 2번리뷰

- 3번리뷰

---
