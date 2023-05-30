import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Cart from "./Cart/cart";
import AuthContext from "../Store/AuthContext";

const Header = () => {
  const [showCart, setShowCart]= useState(false)

  const {isLoggedIn} =useContext(AuthContext)

  console.log (isLoggedIn)

  const cartShowHandler = ()=>{
    setShowCart(preShowcart => !showCart )
  }
  return (
    <div className="navbar">
      <header className="header"> 
            <div className="links">
              <Link  to="/home" key="Home"> Home </Link>
              {isLoggedIn && <Link  to="/store" key="Store"> Store </Link>}
              <Link  to="/about" key="About"> About </Link>
              <Link  to="/login" key="Login"> Login </Link>
              <Link  to="/cantactus" key="Cantact Us"> Cantact Us </Link>
            </div>
        <a href="#cart" className="cart-holder" onClick={cartShowHandler}>cart<span className="cart-number">0</span></a>
        {showCart && <Cart onCartShow ={cartShowHandler}></Cart>}
      </header>
      <h1>The Generics</h1>
    </div>
  );
};

export default Header;
