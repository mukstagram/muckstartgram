import { configureStore } from "@reduxjs/toolkit";

// reducers
import detailmodule from "../modules/detailmodule";
import foodPostmodule from "../modules/foodPostmodule";
import homemodule from "../modules/homemodule";
import signupmodule from "../modules/signupmodule";
import loginmodule from "../modules/loginmodule";

// redux router
// history는 방문기록 조작을 쉽게 하도록 도와주는 라이브러리 입니다.
// 설치방법 : yarn add history
// import { createBrowserHistory } from "history";

// Connected React Router란 리덕스에서 주소 변경 및 확인하기 위해 history객체를 관리, 필요에 의해 꺼내쓸 수 있는 라이브러리입니다.
// 설치방법 : yarn add connected-react-router
// import { ConnectedRouter } from "connected-react-router";

// const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    detailmodule: detailmodule,
    foodPostmodule: foodPostmodule,
    homemodule: homemodule,
    signupmodule: signupmodule,
    loginmodule: loginmodule,
    // router: ConnectedRouter(history),
  },

  //devtools 배포환경에선 사용못하도록 막기위함
  devTools: process.env.NODE_ENV !== "production",
});

// export { history };
export default store;
