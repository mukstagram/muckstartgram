import axios from "axios";

// axios instance 생성자 입니다.
const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/api/`,
  // headers: {
  //   "content-type": "application/json;charset=UTF-8",
  //   accept: "application/json,",
  // },
});

// intercepter로 localstorage에 있는 token을 request header에 넣어 보내줍니다.
// api.interceptors.request.use(
//   function (config) {
//     const accessToken = localStorage.getItem("token");
//     if (accessToken) {
//       config.headers.authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   function (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

export const apis = {
  // login
  login: ({ loginId, password }) =>
    api.post("/login", { loginId: loginId, password: password }),

  // signup
  signup: ({ loginId, password, nickname }) =>
    api.post("/signup", {
      loginId: loginId,
      password: password,
      nickname: nickname,
    }),
};
