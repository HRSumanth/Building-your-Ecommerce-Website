import React from "react";

import Productlist from "../products/productlist"
import About from "../layout/About"
import Cart from "../Navbar/Cart/cart";
import { Route, Routes } from "react-router-dom";
import { RoutePath } from "./const.js";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path={RoutePath.Home} element={<Productlist></Productlist>} />
        <Route path={RoutePath.Store} element={<Productlist />} />
        <Route path={RoutePath.About} element={<About />} />
      </Routes>
    </div>
  );
};

export default Routers;
