import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

// connected-react-router
// Connected React Router란 리덕스에서 주소 변경 및 확인하기 위해 history객체를 관리, 필요에 의해 꺼내쓸 수 있는 라이브러리입니다.
// 설치방법 : yarn add connected-react-router
// import { ConnectedRouter } from "connected-react-router";
// import { history } from "./redux/config/configStore";

// redux
import store from "./redux/config/configStore";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <ConnectedRouter> */}
    <App />
    {/* </ConnectedRouter> */}
  </Provider>
);

reportWebVitals();
