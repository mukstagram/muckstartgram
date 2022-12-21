import axios from "axios";

// axios instance 생성자 입니다.

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/api`,
  // headers: {
  //   "content-type": "application/json",
  //   accept: "application/json",
  // },
});

// intercepter로 cookie로 token을 만들어 보내줍니다.
api.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("token");
    config.headers["Authorization"] = `${accessToken}`;
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (
      error.response.data.errorMessage ===
      "전달된 토큰에 오류가 발생하였습니다."
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("nickname");
      alert("다시 로그인 해주시길 바랍니다!");
    }
    return Promise.reject(error);
  }
);
export const apis = {
  //Home
  foodlist: () => api.get("/foods"),

  //foodPost
  foodpost: (payload) =>
    api.post("/foods", payload, {
      headers: { "content-type": "multipart/form-data" },
    }),

  //foodretouch
  foodget: (params) => api.get(`/foods/${params}`),
  foodput: ({ formData, params }) =>
    api.put(`/foods/${params}`, formData, {
      hedaers: { "content-type": "multipart/form-data" },
    }),

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

  //detail
  detailfoodlist: (payload) => api.get(`/foods/${payload}`),
  detailPostDel: (payload) => api.delete(`/foods/${payload}`),
  detailcommentlist: (payload) => api.get(`/foods/${payload}/comments`),
  detailcommentedit: ({ commentId, editCom, params }) =>
    api.patch(`/comment/${commentId}`, editCom, params),
  detailcommentpost: ({ params, newComment }) =>
    api.post(`/comment/${params}`, newComment),
  detailcommentdelete: (payload) => api.delete(`comment/${payload}`),
};
