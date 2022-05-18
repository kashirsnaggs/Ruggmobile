import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
        rel="stylesheet"
      ></link>
      <p className="logo">
        <Link href="/">
          <a style={{ fontFamily: '"Rajdhani", sans-serif' }}>MCJ Headphones</a>
        </Link>
      </p>
      <button className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
