import { configureStore } from '@reduxjs/toolkit';

import detailmodule from '../modules/detailmodule';
import foodPostmodule from '../modules/foodPostmodule';
import homemodule from '../modules/homemodule';
import loginmodule from '../modules/loginmodule';
import signupmodule from '../modules/signupmodule';

const store = configureStore({
  reducer: {
    detailmodule: detailmodule,
    foodPostmodule: foodPostmodule,
    homemodule: homemodule,
    loginmodule: loginmodule,
    signupmodule: signupmodule,
  },
  //devtools 배포환경에선 사용못하도록 막기위함
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
