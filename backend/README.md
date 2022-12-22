# 먹스타그램
프로젝트소개 : 일상의 맛있는 음식을 공유하는 플랫폼 입니다 :)

frontend : React, backend : NodeJS

--- 

## 사전 와이어 프레임

![waieopeuleim1](https://user-images.githubusercontent.com/86142878/209071883-e58243b8-ab05-48e8-bbdd-f574e386ce31.png)
![waieopeuleim2](https://user-images.githubusercontent.com/86142878/209071888-10ab5b6b-e41f-4fa7-bee5-7170eebed05b.png)
![waieopeuleim3](https://user-images.githubusercontent.com/86142878/209071891-d33a04a2-9d2d-4e09-91a8-22c6dbbacdac.png)
![waieopeuleim4](https://user-images.githubusercontent.com/86142878/209071893-84fd124b-07e5-4a78-888c-bdbc27d411d5.png)
![waieopeuleim5](https://user-images.githubusercontent.com/86142878/209071897-a367c578-8160-4ca3-9fe3-974ae1bfce78.png)


## 사용 패키지

express, aws-sdk, cors, dotenv, prettier, jest, joi, jsonwebtoken, morgan, multer, mysql2, sequelize, winston


## API

https://www.notion.so/7d99131b1ba74629b8ddb35c27fd1499?v=7619688d3695469aa714c606d88fae85


## trouble shooting(BA)

1. CORS 문제 -> CORS 라이브러리를 설치해서 해결
2. 프론트에서 JWT 토큰을 삭제 했는데도 로그인 되었다고 나타나는 문제 -> null이 string으로 전달되어 분기 추가
3. JWT 토큰이 Header에 전달 되지 않아 Access-Control-Allow-Origin 추가
4. backend서버 HTTP 문제 -> Nginx + cetbot을 사용해 SSL 적용
5. dispatch명령 후 렌더링이 되지 않는 문제 -> .then()을 사용하여 동기 처리하도록 하여 해결
6. 이미지를 File형식 그대로 객체에 담아 전달할 때 빈 객체가 payload에 담기는 문제 -> 객체로 전달하는 것을 FormData에 담아 이미지 전달 해결
7. 로그인, 회원가입 실패시에도 메인페이지로 이동하는 문제 -> 기존에는 버튼클릭시에 navigate('/') 가 작동하는 식으로 페이지간 이동 기능을 구현했지만 module에서 성공시에 windows.location.href 가 작동하도록 하여 해결
8. 회원가입시에 비밀번호와 비밀번호확인이 문자열이 같은데도 다른 것으로 인식하는 문제 -> useCallback을 사용해서 발생하는 문제였음 useCallback 삭제
9. http://localhost:3000/undefined/post 404 (Not Found) 에러 발생 -> .env 파일이 같은 폴더내에 있지 않아 발생하는 문제였음 같은 폴더로 이동 후 해결
10. 회원가입시에 아이디를 제대로 입력했는데도 아이디 양식이 맞지 않다고 에러메세지가 오는 문제 -> axios instance에서 인자를 구조분해 할당으로 전달해주지 않아서 생기는 문제였음. 구조분해할당 적용 후에 해결
11. Uncaught ReferenceError: Cannot access '__WEBPACK_DEFAULT_EXPORT__' before initialization -> 버전이 맞지 않는 패키지를 설치해서 발생한 문제 패키지 삭제 후 해결
12. 초기에 폴더구조를 만들면서 소문자로 생성한 파일명을 대문자로 수정해주었는데 brach checkout 후에 소문자로 다시 변경되는 문제 -> git 에서 대문자 파일을 인식하도록 설정 변경, branch 삭제 후 재생성, local repo 삭제후 재생성
13. Uncaught TypeError : Cannot read properties of undefined / dispatch구문에서 오류가 발생한 문제 -> Thunk함수를 import하는데, export로 보냈으므로 중괄호를 사용하여 정상적으로 import하도록 변경
14. Nginx 파일업로드 설정 문제 -> Nginx가 default로 1MB로 설정되어 있어 /etc/nginx/nginx.conf경로의 client_max_body_size 3M를 3MB로 수정하였습니다.


## 코드 리뷰
PR을 날린 후 merge전에 한명이상의 리뷰를 받고 승인을 받아야 merge가 가능하게 하였습니다.
