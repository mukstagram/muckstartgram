import { configureStore } from '@reduxjs/toolkit';
// reducers
import detailmodule from '../modules/detailmodule';
import foodPostmodule from '../modules/foodPostmodule';
import homemodule from '../modules/homemodule';
import signupmodule from '../modules/signupmodule';
import loginmodule from '../modules/loginmodule';
import foodRetouchmodule from '../modules/foodRetouchmodule';

const store = configureStore({
  reducer: {
    detailmodule: detailmodule,
    foodPostmodule: foodPostmodule,
    homemodule: homemodule,
    signupmodule: signupmodule,
    loginmodule: loginmodule,
    foodRetouchmodule: foodRetouchmodule,
  },

  //devtools 배포환경에선 사용못하도록 막기위함
  devTools: process.env.NODE_ENV !== 'production',
});

// export { history };
export default store;
