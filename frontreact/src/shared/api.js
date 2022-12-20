import axios from "axios";

// axios instance 생성자 입니다.
const api = axios.create({
  baseURL: "http://3.39.240.76:80/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// api에 합의된 사항이 없어 일단 보류
// intercepter로 cookie로 token을 만들어 보내줍니다.
api.interceptors.request.use(
  function (config) {
    // document.cookie cookie 값을 읽고 쓸수 있게 해주는 메소드 입니다.
    const accessToken = document.cookie.split("=")[1];
    // token을 config에 header 설정을 합니다.
    config.headers.common["X-AUTH-TOKEN"] = `${accessToken}`;
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export const apis = {
  // login
  login: ({ loginId, password }) =>
    api.post("/api/login", { loginId: loginId, password: password }),

  // signup
  signup: ({ loginId, password, nickname }) =>
    api.post("/api/signup", {
      loginId: loginId,
      password: password,
      nickname: nickname,
    }),
};