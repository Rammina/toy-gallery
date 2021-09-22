// Package imports
import React, { useState, FC } from "react";
import { useLocation, Link } from "react-router-dom";
// Non-package imports
import queryString from "query-string";
import "./SortToysButton.scss";

const SortToysButton: FC = (): JSX.Element => {
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);
  const location = useLocation();
  const { filter } = queryString.parse(location.search);

  const getSortMenuShowClass = () => (showSortMenu ? "show" : "hide");

  const toggleMenuHandler = () => {
    if (!showSortMenu) setShowSortMenu(true);
    else setShowSortMenu(false);
  };

  return (
    <div className="sort-toys-button__div--sort">
      <button
        className="sort-toys-button__button sort-toys-button__button--sort"
        onClick={toggleMenuHandler}
        aria-label="sort toys"
      >
        Sort
      </button>
      <div
        className={`backdrop sort-toys-button ${getSortMenuShowClass()}`}
        onClick={toggleMenuHandler}
      ></div>
      <ul className={`sort-toys-button__ul--sort ${getSortMenuShowClass()}`}>
        <Link
          to={`/toys?sortPropName=name&sortOrder=asc${
            filter ? `&filter=${filter}` : ""
          }`}
          className="sort-toys-button__item--sort"
        >
          Name (asc)
        </Link>
        <Link
          to={`/toys?sortPropName=name&sortOrder=desc${
            filter ? `&filter=${filter}` : ""
          }`}
          className="sort-toys-button__item--sort"
        >
          Name (desc)
        </Link>
        <Link
          to={`/toys?sortPropName=user&sortOrder=asc${
            filter ? `&filter=${filter}` : ""
          }`}
          className="sort-toys-button__item--sort"
        >
          User (asc)
        </Link>
        <Link
          to={`/toys?sortPropName=user&sortOrder=desc${
            filter ? `&filter=${filter}` : ""
          }`}
          className="sort-toys-button__item--sort"
        >
          User (desc)
        </Link>
        <Link
          to={`/toys?sortPropName=franchise&sortOrder=asc${
            filter ? `&filter=${filter}` : ""
          }`}
          className="sort-toys-button__item--sort"
        >
          Franchise (asc)
        </Link>
        <Link
          to={`/toys?sortPropName=franchise&sortOrder=desc${
            filter ? `&filter=${filter}` : ""
          }`}
          className="sort-toys-button__item--sort"
        >
          Franchise (desc)
        </Link>
      </ul>
    </div>
  );
};

export default SortToysButton;
