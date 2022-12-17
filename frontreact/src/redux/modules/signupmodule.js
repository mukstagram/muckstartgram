import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// instance
import { apis } from "../../shared/api";

const initialState = {
  signUpInfo: {
    loginId: "",
    password: "",
    nickname: "",
  },
  isLoading: false,
  error: null,
};

export const __signUp = createAsyncThunk(
  "signUpPost",
  async (payload, thunkAPI) => {
    try {
      const data = await apis.signup(payload).then(() => {
        history.push("/login");
      });
      console.log(data.data);
      console.log(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      console.log(payload);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const signupmodule = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: {
    // __signUp
    [__signUp.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__signUp.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.signUpInfo = action.payload; // Store에 있는 서버에서 가져온 data를 넣습니다.
    },
    [__signUp.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default signupmodule.reducer;
