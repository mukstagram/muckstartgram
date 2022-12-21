import axios from "axios";

// axios instance 생성자 입니다.
const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/api`,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// api에 합의된 사항이 없어 일단 보류
// intercepter로 cookie로 token을 만들어 보내줍니다.
api.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
export const apis = {
  //Home
  foodlist: () => api.get("/foods"),

  //foodPost
  foodpost: (payload) => api.post("/foods", payload),

  //foodretouch
  foodget: (params) => api.get(`/foods/${params}`),
  foodput: ({ formData, params }) => api.put(`/foods/${params}`, formData),

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
