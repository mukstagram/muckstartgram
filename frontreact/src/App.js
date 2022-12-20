import React, { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";

// share
import Router from "./shared/Router";

import { loginCheck } from "./redux/modules/loginmodule";

const App = () => {
  const dispatch = useDispatch();

  // app이 실행됨과 동시에 login여부를 확인합니다.
  // 인자로는 아무것도 전달되지 않습니다.
  useEffect(() => {
    dispatch(loginCheck());
  }, []);

  // 최상위 component이 App에서 Router연결
  return <Router />;
};

export default App;
