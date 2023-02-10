import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Cart } from './'
import { useStateContext } from '../context/StateContext'
import Image from 'next/image'
import { SearchBar } from '../components'
import { VscAccount } from 'react-icons/vsc'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()
  return (
    <div className="navbar-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
        rel="stylesheet"
      ></link>
      <p className="logo">
        <Link href={'/'}>
          <span
            className="logoSpan heroic-text"
            heroic="Tasty designs for great"
          >
            <Image
              src="/ruggmobile2.png"
              alt="GLAM Logo"
              width={70}
              height={70}
            />
            RUGGMOBILE IMPORTS
          </span>
        </Link>
      </p>
      <span className="cart-icon">
        <SearchBar />
      </span>
      <button className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
