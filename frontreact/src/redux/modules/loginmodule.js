import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

// instance
import { apis } from "../../shared/api";

const initialState = {
  loginInfo: {
    loginId: "",
    nickname: "",
  },
  isLogin: false,
  isLoading: false,
  error: null,
};

export const __setLogin = createAsyncThunk(
  "setLogin",
  async (payload, thunkAPI) => {
    try {
      await apis.login(payload).then((response) => {
        localStorage.setItem("token", response.headers.authorization);
        localStorage.setItem("nickname", response.data.nickname);
      });
      const data = await apis.login(payload);
      window.alert("로그인 성공!");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      window.alert("회원정보가 없습니다. 회원가입을 해주세요!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const loginmodule = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loginInfo.nickname = action.payload.nickname;
      state.isLogin = true;
    },
    logOut: (state, action) => {
      state.loginInfo.loginId = "";
      state.loginInfo.nickname = "";
      state.isLogin = false;
    },
  },
  extraReducers: {
    // __setLogin
    [__setLogin.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__setLogin.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.loginInfo = action.payload; // Store에 있는 서버에서 가져온 data를 넣습니다.
      state.loginInfo.isLogin = true;
    },
    [__setLogin.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const { login, logOut, loginCheck } = loginmodule.actions;
export default loginmodule.reducer;
