import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//초기값
const initialState = {
  foodList: {},
  isLoading: false,
  error: null,
};
//thunk
//상세페이지 목록조회

export const __getFoodList = createAsyncThunk(
  "getFoodList",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://3.39.240.76:80/api/post/${payload}`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//리듀서
const foodListSlice = createSlice({
  name: "usedetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //본문 조회하기
      // 로딩 시작
      .addCase(__getFoodList.pending, (state) => {
        state.isLoading = true;
      })
      //로딩 완료. 성공 시
      .addCase(__getFoodList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foodList = action.payload;
      })
      //로딩 완료. 실패 시
      .addCase(__getFoodList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = foodListSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default foodListSlice.reducer;
