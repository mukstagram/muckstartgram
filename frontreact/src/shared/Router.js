import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import FoodPost from '../pages/FoodPost';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import FoodRetouch from '../pages/FoodRetouch';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/foodPost" element={<FoodPost />} />
          <Route path="/foodRetouch/:id" element={<FoodRetouch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
