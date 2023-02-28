import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import Image from 'next/image';
import {
  Collapse,
  Container,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0/client';
import PageLink from './PageLink';
import AnchorLink from './AnchorLink';
import { VscAccount } from 'react-icons/vsc';
import Search from '../pages/Search';
import { BiSearch } from 'react-icons/bi';
import { TiHome } from 'react-icons/ti';

const Navbar = ({ title, links }) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  const { user, isLoading } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (event.target.closest('.dropdown') === null) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [isRuggmobileOpen, setIsRuggmobileOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (event.target.closest('.dropdown') === null) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleRuggmobile = () => {
    setIsRuggmobileOpen(!isRuggmobileOpen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
        rel="stylesheet"></link>
      <div className="logo-container">
        <div className="logo" onClick={toggleRuggmobile}>
          <span className="logoSpan heroic-text" heroic="Tasty designs for great">
            <Image src="/ruggmobile2.png" alt="GLAM Logo" width={70} height={70} />
            RUGGMOBILE IMPORTS
          </span>
          {isRuggmobileOpen && (
            <div className="dropdown-menu1">
              <Link href="/category1">
                <a className="dropdown-item">Laptop</a>
              </Link>
              <Link href="/category2">
                <a className="dropdown-item">Phone</a>
              </Link>
              <Link href="/category3">
                <a className="dropdown-item">Iphone</a>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>
        <Link href="/" className="Home-page">
          <div>
            <TiHome className="home-button" />
            <a className="Home-page">Home</a>
          </div>
        </Link>
      </div>

      <AnchorLink href="/Search" tabIndex={0} testId="navbar-login-mobile">
        <BiSearch className="iconsearch toggle" id="direction-toggle" size={25} />
      </AnchorLink>

      <div className="dropdown">
        {!isLoading && !user && (
          <Nav className="d-md-none" navbar>
            <AnchorLink href="/api/auth/login" tabIndex={0} testId="navbar-login-mobile">
              <VscAccount className="iconAcc" size={25} />
            </AnchorLink>
          </Nav>
        )}
        {user && (
          <Nav id="nav-mobile" className="profile-dropdown" navbar data-testid="navbar-menu-mobile">
            <NavItem>
              <span className="user-info">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="imageacc"
                  width="30"
                  height="30"
                  decode="async"
                  data-testid="navbar-picture-mobile"
                />

                <button className="dropdown-button" onClick={toggleDropdown}>
                  <h6 className="username dropdown for-dropdown" for="dropdown" data-testid="navbar-user-mobile">
                    {user.name}
                  </h6>
                </button>
              </span>
            </NavItem>
            <div class="sec-center">
              {isOpen && (
                <div className="dropdown-menu ">
                  <NavItem className="log">
                    <PageLink href="/profile" icon="user" testId="navbar-profile-mobile">
                      Profile
                    </PageLink>
                  </NavItem>
                  <NavItem className="log">
                    <PageLink href="/Contact" icon="user" testId="navbar-profile-mobile">
                      Contact Us
                    </PageLink>
                  </NavItem>
                  <NavItem className="log" id="qsLogoutBtn">
                    <AnchorLink href="/api/auth/logout" icon="power-off" testId="navbar-logout-mobile">
                      Log out
                    </AnchorLink>
                  </NavItem>
                </div>
              )}
            </div>
          </Nav>
        )}
      </div>
      <button className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
