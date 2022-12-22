import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// instance
import { apis } from "../../shared/api";

const initialState = {
  response: {},
  isLoading: false,
  error: null,
};

export const __signUp = createAsyncThunk(
  "signUpUser",
  async (payload, thunkAPI) => {
    try {
      await apis.signup(payload).then((response) => {
        return thunkAPI.fulfillWithValue(response.data);
      });
      window.alert("회원가입 성공!");
      window.location.href = "https://fe-deploy-nu.vercel.app/";
    } catch (error) {
      window.alert(error.response.data.errorMessage);
      return thunkAPI.rejectWithValue(error.response.data);
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
      state.response = action.payload; // Store에 있는 서버에서 가져온 data를 넣습니다.
    },
    [__signUp.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default signupmodule.reducer;
