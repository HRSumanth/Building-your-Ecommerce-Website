import React ,{useContext}from "react";

import Productlist from "../products/productlist"
import About from "../layout/About"
import ContactUs from "../layout/CantactUs";
import { Route, Routes, Navigate } from 'react-router-dom';
import { RoutePath } from "./const.js";
import Tours from "../layout/Home";
import ProductPage from "../products/ProductPage";
import AuthForm from "../Auth/AuthForm";
import AuthContext from "../Store/AuthContext";


const Routers = () => {
  const {isLoggedIn} =useContext(AuthContext)
  return (
    <div>
      <Routes>
        <Route path={RoutePath.Home} element={<Tours></Tours>} />
        <Route path={RoutePath.Default} element={<Tours></Tours>} />
        <Route path={RoutePath.Store} element={isLoggedIn ?<Productlist /> : <Navigate to={RoutePath.Login}/>} />
        <Route path={RoutePath.ProductPage} element={<ProductPage />} />
        <Route path={RoutePath.About} element={<About />} />
        <Route path={RoutePath.Login} element={<AuthForm />} />
        <Route path={RoutePath.CantactUs} element={<ContactUs />} />
      </Routes>
    </div>
  );
};

export default Routers;
