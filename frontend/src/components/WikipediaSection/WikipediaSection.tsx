// Package imports
import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
// Non-package imports
import { AppDispatch, ActionTypes } from "redux/actions";
import { RootState } from "redux/reducers";
import { Toy } from "appTypes";
import { searchWiki } from "helpers";
import "./WikipediaSection.scss";

const WikipediaSection: FC = (): JSX.Element | null => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const toy: Toy = useSelector((state: RootState) => state.selectedToy);
  const wikiSearchValues: any[] = useSelector(
    (state: RootState) => state.wikiSearchValues
  );

  const searchWikiHandler = (): void => {
    if (toy) searchWiki(toy.name, dispatch);
  };

  useEffect(() => {
    searchWikiHandler();
    return () => {
      // cleanup redux store by removing search values to prevent page switching glitches
      dispatch({ type: ActionTypes.CLEAR_WIKI_SEARCH_VALUES });
    };
  }, [toy, location.search]);

  const renderWikiSearchResults = () => {
    if (wikiSearchValues.length < 1)
      return (
        <div className="wikipedia-section__div--item">
          <h3>No Wikipedia results found.</h3>
        </div>
      );
    let wikiSearchResultsElem = [];

    for (let key in wikiSearchValues) {
      wikiSearchResultsElem.push(
        <div className="wikipedia-section__div--item" key={key}>
          <h3>
            <a href={wikiSearchValues[key].queryResultPageFullURL}>
              {wikiSearchValues[key].queryResultPageTitle}
            </a>
          </h3>
          <p
            className="wikipedia-section__p"
            dangerouslySetInnerHTML={{
              __html: wikiSearchValues[key].queryResultPageSnippet,
            }}
          ></p>
        </div>
      );
    }
    return wikiSearchResultsElem;
  };

  return !toy ? null : (
    <section className="wikipedia-section__section">
      <h2 className="wikipedia-section__h2">WikiTrivia</h2>
      {renderWikiSearchResults()}
    </section>
  );
};

export default WikipediaSection;
