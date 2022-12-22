import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apis } from "../../shared/api";

//초기값
const initialState = {
  foodList: {},
  comments: [],
  isLoading: false,
  error: null,
};
//thunk
//상세페이지 목록조회
export const __getFoodList = createAsyncThunk(
  "getFoodList",
  async (payload, thunkAPI) => {
    try {
      const { data } = await apis.detailfoodlist(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
//상세페이지 목록삭제
export const __postDelete = createAsyncThunk(
  "postDelete",
  async (payload, thunkAPI) => {
    try {
      await apis.detailPostDel(payload);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// 상세페이지 댓글조회
export const __getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try {
      const { data } = await apis.detailcommentlist(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 상세페이지 댓글추가
export const __commentRegist = createAsyncThunk(
  "commentRegist",
  async ({ params, newComment }, thunkAPI) => {
    try {
      await apis.detailcommentpost({ params, newComment });
      const { data } = await apis.detailcommentlist(params);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 상세페이지 댓글삭제
export const __commentDelete = createAsyncThunk(
  "commentDelete",
  async (payload, thunkAPI) => {
    try {
      await apis.detailcommentdelete(payload[0]);
      const { data } = await apis.detailcommentlist(payload[1]);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 상세페이지 댓글수정
export const __commentEdit = createAsyncThunk(
  "commentEdit",
  async ({ commentId, editCom, params }, thunkAPI) => {
    try {
      await apis.detailcommentedit({ commentId, editCom, params });
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/foods/${params}/comments`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (err) {
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
      })
      //본문 삭제하기
      // 로딩 시작
      .addCase(__postDelete.pending, (state) => {
        state.isLoading = true;
      })
      //로딩 완료. 성공 시
      .addCase(__postDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foodList = action.payload;
      })
      //로딩 완료. 실패 시
      .addCase(__postDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 댓글 조회하기
      // 로딩 시작
      .addCase(__getComments.pending, (state) => {
        state.isLoading = true;
      })
      //로딩 완료. 성공 시
      .addCase(__getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      //로딩 완료. 실패 시
      .addCase(__getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //댓글추가하기
      // 로딩 시작
      .addCase(__commentRegist.pending, (state) => {
        state.isLoading = true;
      })
      //로딩 완료. 성공 시
      .addCase(__commentRegist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      //로딩 완료. 실패 시
      .addCase(__commentRegist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //댓글 삭제하기
      // 로딩 시작
      .addCase(__commentDelete.pending, (state) => {
        state.isLoading = true;
      })
      //로딩 완료. 성공 시
      .addCase(__commentDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      //로딩 완료. 실패 시
      .addCase(__commentDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //댓글 수정하기
      // 로딩 시작
      .addCase(__commentEdit.pending, (state) => {
        state.isLoading = true;
      })
      //로딩 완료. 성공 시
      .addCase(__commentEdit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      //로딩 완료. 실패 시
      .addCase(__commentEdit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = foodListSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default foodListSlice.reducer;
