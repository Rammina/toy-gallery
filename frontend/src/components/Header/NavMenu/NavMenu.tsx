// package imports
import React, { useState, useEffect, useContext, FC, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Auth } from "aws-amplify";
// non- package imports

import ProfilePicture from "components/ui/ProfilePicture/ProfilePicture";
import DropdownMenu from "components/ui/DropdownMenu/DropdownMenu";
import CloseButton from "components/ui/buttons/CloseButton/CloseButton";

import { WindowContext } from "AppContext";
import { SITE_TITLE } from "utils/constants";
import { logoutUser } from "redux/actions";
import { RootState } from "redux/reducers";
import "./NavMenu.scss";
// <div>Icons made by <a href="" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
import HamburgerImage from "assets/icons/hamburger.png";
import HomeImage from "assets/icons/home.png";
import LoginImage from "assets/icons/login.svg";
import LogoutImage from "assets/icons/logout.svg";
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
import RegisterImage from "assets/icons/register.svg";
interface Props {}

const NavMenu: FC<Props> = () => {
  const { isSignedIn, user } = useSelector((state: RootState) => state.auth);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showUserDropdownMenu, setShowUserDropdownMenu] = useState(false);
  const { isNonMobileWidth, isNonMobileHeight } = useContext(WindowContext);
  const dispatch = useDispatch();

  const getNavMenuClass = () => (showNavMenu ? "show" : "hide");
  const getUserProfilePictureClass = () =>
    showUserDropdownMenu ? "active" : "";

  // event handler functions
  const navmenuOnOpenHandler = () => {
    setShowNavMenu(true);
  };

  const navmenuOnCloseHandler = () => {
    setShowNavMenu(false);
  };

  const userProfilePictureonClickHandler = (e: MouseEvent) => {
    e.stopPropagation();
    if (!showUserDropdownMenu) setShowUserDropdownMenu(true);
    else setShowUserDropdownMenu(false);
  };

  const userDropdownMenuOnCloseHandler = () => {
    setShowUserDropdownMenu(false);
  };

  const logoutHandler = async () => {
    dispatch(logoutUser());
    await Auth.signOut();
  };

  const renderUserDropdownMenu = (): JSX.Element | null => {
    if (!showUserDropdownMenu) return null;
    return (
      <DropdownMenu
        style={{
          position: "fixed",
          right: "1rem",
          top: "3.6rem",
          minWidth: "12rem",
        }}
        onClose={userDropdownMenuOnCloseHandler}
      >
        <div className="dropdown__item--flex" id="dropdown__profile">
          <div className="dropdown__img-div">
            <ProfilePicture className="user-dropdown" />
          </div>
          <div className="dropdown__text-div">
            <h4 className="dropdown__user">{user && user.username}</h4>
            <span className="dropdown__span">Registered User</span>
          </div>
        </div>
      </DropdownMenu>
    );
  };

  const renderConditionalItems = () =>
    !isSignedIn ? (
      <>
        <Link to="/register" className="navmenu__item">
          <img
            className="navmenu__item-img"
            src={RegisterImage}
            alt="Register Image"
          />
          <span>Sign Up</span>
        </Link>
        <Link to="/login" className="navmenu__item">
          <img
            className="navmenu__item-img"
            src={LoginImage}
            alt="Login Image"
          />
          <span>Login</span>
        </Link>
      </>
    ) : (
      <button className="navmenu__item" onClick={logoutHandler}>
        <img
          className="navmenu__item-img"
          src={LogoutImage}
          alt="Logout Image"
        />
        <span>Logout</span>
      </button>
    ); /*
    //TODO: Add a dashboard eventually
      (
        <>
          <Link to="/dashboard" className="navmenu__item">
            <img
              className="navmenu__item-img"
              src={DashboardImage}
              alt="Dashboard Image"
            />
            <span>Dashboard</span>
          </Link>
        </>
      );
    */

  // render component
  return (
    <>
      {renderUserDropdownMenu()}
      {/*hamburger*/}
      <button
        className="navmenu__button"
        id="navmenu__button--hamburger"
        onClick={navmenuOnOpenHandler}
      >
        <img
          className=""
          id="navmenu__img--hamburger"
          src={HamburgerImage}
          alt="hamburger icon"
        />
      </button>
      {/*navmenu container & items*/}
      <div
        className={`navmenu__backdrop backdrop mobile-only ${getNavMenuClass()}`}
        onClick={navmenuOnCloseHandler}
      ></div>
      <nav className={`navmenu__nav--outer ${getNavMenuClass()}`}>
        <div className="navmenu__title-close-container">
          <Link to="/" id="navmenu__title-link">
            {SITE_TITLE}
          </Link>
          <CloseButton
            hideOnDesktop={true}
            className="navmenu__close"
            onClickHandler={navmenuOnCloseHandler}
          />
        </div>
        <ul className="navmenu__items">
          <Link to="/" className="navmenu__item">
            <img
              className="navmenu__item-img"
              src={HomeImage}
              alt="Home Image"
            />
            <span>Home</span>
          </Link>
          {renderConditionalItems()}
        </ul>
      </nav>
    </>
  );
};

export default NavMenu;
