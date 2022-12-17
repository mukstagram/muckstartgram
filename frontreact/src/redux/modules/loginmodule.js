// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   // 원하는 데이터형식의 틀을 짜준다.
//   // 객체 하나를 받아올 것이기 때문에 빈 객체를 initial state로 넣어주었다.
//   signUpInfo: {
//     loginId: "",
//     password: "",
//     nickname: "",
//   },
//   isLoading: false,
//   error: null,
// };

// // db에서 필요한 데이터의 id값을 payload로 넘겨 받아 data를 받아옴
// export const __registerDB = createAsyncThunk(
//   "getContents",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.get(
//         `https://deserted-workable-olive.glitch.me/memes/${payload}`
//       );
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// // // delete 기능에 필요한 data id와 새로 복사된 객체를 payload로 불러옴
// // // patch를 이용하여 해당 data를 update 해주었음.
// // // 우리가 다루는 data는 객체 안에 배열 요소 이기 때문에 속성을 한번 더 거쳐주는 과정이 꽤 까다롭다.
// // // post혹은 delete로는 객체 전체를 지우기때문에 맞지 않음
// // // 새로 복사된 data를 update해주는 형식으로 삭제와 수정기능을 구현하였음.
// // export const __deleteComment = createAsyncThunk(
// //   "deleteComment",
// //   async (payload, thunkAPI) => {
// //     try {
// //       const data = await axios.patch(
// //         `https://deserted-workable-olive.glitch.me/memes/${payload.paramId}`,
// //         payload.newMemeObj
// //       );
// //       return thunkAPI.fulfillWithValue(data.data);
// //     } catch (error) {
// //       console.log(error);
// //       return thunkAPI.rejectWithValue(error);
// //     }
// //   }
// // );

// // export const __editComment = createAsyncThunk(
// //   "editComment",
// //   async (payload, thunkAPI) => {
// //     try {
// //       const data = await axios.patch(
// //         `https://deserted-workable-olive.glitch.me/memes/${payload.paramId}`,
// //         payload.newMemeObj2
// //       );
// //       return thunkAPI.fulfillWithValue(data.data);
// //     } catch (error) {
// //       console.log(error);
// //       return thunkAPI.rejectWithValue(error);
// //     }
// //   }
// // );

// // //submit thunk 함수로 만드는 패치
// // export const __submitComment = createAsyncThunk(
// //   "submitComment", //Action Value
// //   async (payload, thunkAPI) => {
// //     try {
// //       //axios에 의해서 네트워크 요청을 시작한다.
// //       const data = await axios.patch(
// //         `https://deserted-workable-olive.glitch.me/memes/${payload.id}`,
// //         payload.data
// //         //업데이트할 데이터
// //       );
// //       //axios는 promise 객체를 반환한다. 따라서 data는 promise를 반환한다.
// //       return thunkAPI.fulfillWithValue(data.data);
// //     } catch (error) {
// //       console.log(error);
// //       return thunkAPI.rejectWithValue(error);
// //     }
// //   }
// // );

// // const detailMod = createSlice({
// //   name: "contents",
// //   initialState,
// //   reducers: {},
// //   extraReducers: {
// //     // __getContents
// //     [__getContents.pending]: (state) => {
// //       state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
// //     },
// //     [__getContents.fulfilled]: (state, action) => {
// //       state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
// //       state.meme = action.payload; // Store에 있는 서버에서 가져온 data를 넣습니다.
// //     },
// //     [__getContents.rejected]: (state, action) => {
// //       state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
// //       state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
// //     },
// //     // __deleteComment
// //     [__deleteComment.pending]: (state) => {
// //       state.isLoading = true;
// //     },
// //     [__deleteComment.fulfilled]: (state, action) => {
// //       state.isLoading = false;
// //       state.meme = action.payload;
// //     },
// //     [__deleteComment.rejected]: (state, action) => {
// //       state.isLoading = false;
// //       state.error = action.payload;
// //     },
// //     // __editComment
// //     [__editComment.pending]: (state) => {
// //       state.isLoading = true;
// //     },
// //     [__editComment.fulfilled]: (state, action) => {
// //       state.isLoading = false;
// //       state.meme = action.payload;
// //     },
// //     [__editComment.rejected]: (state, action) => {
// //       state.isLoading = false;
// //       state.error = action.payload;
// //     },
// //     //__submitComment
// //     [__submitComment.pending]: (state) => {
// //       state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
// //     },
// //     [__submitComment.fulfilled]: (state, action) => {
// //       state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
// //       state.meme = { ...action.payload }; // Store에 있는 meme에 서버에서 가져온 meme를 넣습니다.
// //     },
// //     [__submitComment.rejected]: (state, action) => {
// //       state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
// //       state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
// //     },
// //   },
// // });

// // export default detailMod.reducer;

// const userCreators = {
//   //   setLoginDB,
//   __registerDB,
//   //   logOutDB,
//   //   loginCheckDB,
//   //   userInfoDB,
// };

// export { userCreators };
