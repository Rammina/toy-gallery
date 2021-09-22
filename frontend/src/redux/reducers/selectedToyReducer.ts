// reducer that stores information about the current selected toy
// (typically, the toy data inside the toy page )
// package import
import { Reducer } from "redux";
// Non-package imports
import { ActionTypes, ToysAction } from "../actions";
import { Toy } from "appTypes";

type SelectedToy = Toy | null;

const initialState: SelectedToy = null;

const selectedToyReducer: Reducer = (
  state = initialState,
  action: ToysAction
) => {
  switch (action.type) {
    case ActionTypes.GET_TOY_SUCCESS:
    case ActionTypes.EDIT_TOY_SUCCESS:
    case ActionTypes.UPLOAD_TOY_IMAGE_SUCCESS:
      return { ...action.payload };
    // after closing a toy page, it should reset back to null
    case ActionTypes.CLOSE_TOY_PAGE:
    case ActionTypes.DELETE_TOY_SUCCESS:
      return null;
    case ActionTypes.GET_TOY_FAIL:
    case ActionTypes.EDIT_TOY_FAIL:
    default:
      return state;
  }
};

export default selectedToyReducer;
