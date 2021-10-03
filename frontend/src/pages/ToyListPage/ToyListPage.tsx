// Package imports
import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
// Non-package imports
import ToyItem from "components/ToyItem/ToyItem";
import CreateToyButton from "components/CreateToyButton/CreateToyButton";
import SortToysButton from "components/SortToysButton/SortToysButton";
import LoadingSpinner from "components/ui/loaders/LoadingSpinner";
import {
  AppDispatch,
  ActionTypes,
  getToyList,
  actionShowLoader,
} from "redux/actions";
import { RootState } from "redux/reducers";
import { MapIndex, Toy } from "appTypes";
import "./ToyListPage.scss";

/**
 *Functional react component for listing toys
 *@component ToyListPage
 *@returns {JSX.Element} - rendered page component that displays a list of toys
 */
const ToyListPage: FC = (): JSX.Element => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { sortOrder, sortPropName, filter } = queryString.parse(
    location.search
  );

  const toys: Toy[] = useSelector((state: RootState) => state.toys);
  const showLoader: boolean = useSelector(
    (state: RootState) => state.loader.showToyListPageLoader
  );

  const getToyListHandler = (): void => {
    dispatch(actionShowLoader("toyListPage", true));
    dispatch(getToyList({ sortOrder, sortPropName, filter }));
  };

  const unmountToyListHandler = (): void => {
    dispatch({ type: ActionTypes.CLEAR_TOY_LIST });
  };

  useEffect(() => {
    // always clear at first every time the list needs to be refreshed to prevent leftover items
    unmountToyListHandler();
    // get the list of toys after the first render
    getToyListHandler();
    return () => {
      // cleanup redux store by removing toy items to prevent page switching glitches
      unmountToyListHandler();
    };
  }, [location.search]);

  return (
    <main className="toy-list-page page-container">
      <h1 className="toy-list-page__heading heading--main">Displayed Toys</h1>
      <section className="toy-list-page__section">
        {/*shows a loader while application is still retrieving the list of toys */}
        {showLoader ? (
          <div className="toy-list-page__div">
            <LoadingSpinner
              className="toy-list-page__loader"
              showLoader={showLoader}
            />
          </div>
        ) : (
          <>
            {/*show the entire page after retrieving the list of toys*/}
            <div className="toy-list-page__section--action">
              <CreateToyButton
                className="toy-list-page__create"
                text="Add Toy"
              />
              <SortToysButton />
            </div>
            <ul className="toy-list-page__ul">
              {/*render nothing if there are no toys, otherwise render the toys*/}
              {!toys || toys.length < 1 ? (
                <h2 className="toy-list-page__heading">No toys were found.</h2>
              ) : (
                toys.map((toy: Toy, index: MapIndex) => (
                  <ToyItem toy={toy} key={index} />
                ))
              )}
            </ul>
          </>
        )}
      </section>
    </main>
  );
};

export default ToyListPage;
