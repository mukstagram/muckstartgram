import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apis } from '../../shared/api';

//초기값
const initialState = {
  isLoading: false,
  error: null,
};

//thunk
//생성페이지 음식 게시물 생성
export const __postFood = createAsyncThunk(
  'postFood',
  async (payload, thunkAPI) => {
    try {
      await apis.foodpost(payload);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//리듀서
const foodPostmodule = createSlice({
  name: 'foodpost',
  initialState,
  reducers: {},
  //thunk용 리듀서
  extraReducers: (builder) => {
    builder
      // -------------------------------------------------------------
      //본문 추가하기
      // 로딩 시작
      .addCase(__postFood.pending, (state) => {
        state.isLoading = true;
      })
      //로딩 완료. 성공 시
      .addCase(__postFood.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      //로딩 완료. 실패 시
      .addCase(__postFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = foodPostmodule.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default foodPostmodule.reducer;
