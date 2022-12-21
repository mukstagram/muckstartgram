import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apis } from '../../shared/api';

//초기값
const initialState = {
  isLoading: false,
  TargetFood: [],
  error: null,
};

//thunk
//수정페이지 게시물 조회
export const __getTargetFood = createAsyncThunk(
  'getTargetFood',
  async (payload, thunkAPI) => {
    try {
      const { data } = await apis.foodget(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
//수정페이지 게시물 수정
export const __putFood = createAsyncThunk(
  'putFood',
  async (payload, thunkAPI) => {
    try {
      await apis.foodput(payload).then((res) => {
        //정상작동시 알림
        if (res.status === 200) {
          window.alert('수정이 완료되었습니다.');
        }
      });
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      //토큰이 비정상적일 때 알림
      // if (err.response.status === 400) {
      //   window.alert(
      //     '비정상적인 접근입니다.\n로그아웃 후 다시 로그인해주세요!'
      //   );
      // }
      // console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//리듀서
const foodRetouchmodule = createSlice({
  name: 'foodpatch',
  initialState,
  reducers: {},
  //thunk용 리듀서
  extraReducers: (builder) => {
    builder
      // -------------------------------------------------------------
      //본문 조회하기
      // 로딩 시작
      .addCase(__getTargetFood.pending, (state) => {
        state.isLoading = true;
      })
      //로딩 완료. 성공 시
      .addCase(__getTargetFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.TargetFood = action.payload;
      })
      //로딩 완료. 실패 시
      .addCase(__getTargetFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // -------------------------------------------------------------
      //본문 추가하기
      // 로딩 시작
      .addCase(__putFood.pending, (state) => {
        state.isLoading = true;
      })
      //로딩 완료. 성공 시
      .addCase(__putFood.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      //로딩 완료. 실패 시
      .addCase(__putFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = foodRetouchmodule.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default foodRetouchmodule.reducer;
