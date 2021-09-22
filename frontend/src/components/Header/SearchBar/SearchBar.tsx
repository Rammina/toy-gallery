// Package imports
import React, { FC, ChangeEvent, FormEvent, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
// Non-package imports
import { WindowContext } from "AppContext";
import history from "browserHistory";
import "./SearchBar.scss";
/* <div>Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */
import MagnifyingGlassImg from "assets/icons/magnifying-glass.svg";

interface Props {}

const SearchBar: FC<Props> = (props) => {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { isLaptopWidth } = useContext(WindowContext);
  const location = useLocation();
  const { sortOrder, sortPropName, filter } = queryString.parse(
    location.search
  );

  const getMobileSearchBarShowClass = () => (showSearchBar ? "show" : "");

  const toggleSearchBarHandler = (): void => {
    if (!showSearchBar) setShowSearchBar(true);
    else setShowSearchBar(false);
  };

  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // keep any sort settings that a user chose
    if (!sortPropName || !sortOrder) history.push(`/toys?filter=${inputValue}`);
    else
      history.push(
        `/toys?filter=${inputValue}&sortPropName=${sortPropName}&sortOrder=${sortOrder}`
      );
    setShowSearchBar(false);
  };

  const renderMobileSearchBar = () =>
    !isLaptopWidth ? (
      <>
        {/* show clickable magnifying glass that toggles the actual search bar when clicked */}
        <button
          className="searchbar__button--input mobile switch"
          onClick={toggleSearchBarHandler}
        >
          <img
            src={MagnifyingGlassImg}
            alt="magnifying glass"
            className="searchbar__img--input mobile switch"
          />
        </button>
        <form
          className={`searchbar__form--input mobile ${getMobileSearchBarShowClass()}`}
          onSubmit={onSubmitHandler}
        >
          <input
            className="searchbar__input mobile"
            placeholder="Looking for a toy?"
            onChange={inputOnChangeHandler}
          />
          <button className="searchbar__button--input mobile">
            <img
              src={MagnifyingGlassImg}
              alt="magnifying glass"
              className="searchbar__img--input"
            />
          </button>
        </form>
      </>
    ) : null;

  // Show actual search bar
  const renderDesktopSearchBar = () =>
    isLaptopWidth ? (
      <form className="searchbar__form--input" onSubmit={onSubmitHandler}>
        <input
          className="searchbar__input"
          placeholder="Looking for a toy?"
          onChange={inputOnChangeHandler}
        />
        <button className="searchbar__button--input">
          <img
            src={MagnifyingGlassImg}
            alt="magnifying glass"
            className="searchbar__img--input"
          />
        </button>
      </form>
    ) : null;

  return (
    <>
      {renderMobileSearchBar()}
      {renderDesktopSearchBar()}
    </>
  );
};

export default SearchBar;
