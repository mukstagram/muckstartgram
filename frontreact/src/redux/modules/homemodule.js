import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//초기값
const initialState = {
  isLoading: false,
  error: null,
  Food: [],
};

//thunk
//메인페이지 음식리스트조회
export const __getFoods = createAsyncThunk(
  "getFoods",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/foods`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//리듀서
const homemodule = createSlice({
  name: "foodlist",
  initialState,
  reducers: {},
  //thunk용 리듀서
  extraReducers: (builder) => {
    builder
      // ----------------------------------------------------------
      //본문 리스트 조회
      // 로딩 시작
      .addCase(__getFoods.pending, (state) => {
        state.isLoading = true;
      })
      //로딩 완료. 성공 시
      .addCase(__getFoods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Food = action.payload;
      })
      //로딩 완료. 실패 시
      .addCase(__getFoods.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = homemodule.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default homemodule.reducer;
