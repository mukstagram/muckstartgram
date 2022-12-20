import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

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
        // localStorage.setItem("nickname", response.headers.nickname);
        console.log(response);
      });
      const data = await apis.login(payload);
      window.alert("로그인 성공!");
      console.log(data.data);
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
    loginCheck: (state, action) => {
      const tokeNicknameCheck = localStorage.getItem("nickname");
      if (tokeNicknameCheck) {
        login({ nickname: tokeNicknameCheck });
      } else {
        logOut();
      }
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

// // src/redux/modules/counterSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   number: 0,
// };

// const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     addNumber: (state, action) => {
//       state.number = state.number + action.payload;
//     },

//     minusNumber: (state, action) => {
//       state.number = state.number - action.payload;
//     },
//   },
// });

// // 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
// export const { addNumber, minusNumber } = counterSlice.actions;
// // reducer 는 configStore에 등록하기 위해 export default 합니다.
// export default counterSlice.reducer;
