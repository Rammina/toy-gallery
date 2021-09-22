// Reducer related to async loader show and hide
// package import
import { Reducer } from "redux";
// Non-package imports
// reducer that manages whether a loader should be shown or not
import { ActionTypes, LoaderAction } from "../actions";

const initialState: { [x: string]: boolean } = {};

const loaderReducer: Reducer = (state = initialState, action: LoaderAction) => {
  switch (action.type) {
    case ActionTypes.ACTION_SHOW_LOADER:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default loaderReducer;
