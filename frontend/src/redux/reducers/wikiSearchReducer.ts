// Reducer related to wiki search data state management
// package imports
import { Reducer } from "redux";
// Non-package imports
import { ActionTypes, WikiSearchAction } from "../actions";

const initialState: any[] = [];

//TODO: might need to change the structure of this
const wikiSearchReducer: Reducer = (
  state = initialState,
  action: WikiSearchAction
) => {
  switch (action.type) {
    case ActionTypes.ADD_WIKI_SEARCH_RETURN_VALUES_SUCCESS:
      return action.payload;
    case ActionTypes.ADD_WIKI_SEARCH_RETURN_VALUES_FAIL:
    case ActionTypes.CLEAR_WIKI_SEARCH_VALUES:
      return [];
    default:
      return state;
  }
};
export default wikiSearchReducer;
