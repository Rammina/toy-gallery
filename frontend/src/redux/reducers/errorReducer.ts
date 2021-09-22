// Reducer related to error state management
// package imports
import { Reducer } from "redux";
// Non-package imports
import { ErrorObject } from "appTypes";
import { ActionTypes, ErrorAction } from "../actions";

const initialState: ErrorObject = {
  message: null,
  status: null,
  id: null,
};

//TODO: might need to change the structure of this
const errorReducer: Reducer = (state = initialState, action: ErrorAction) => {
  switch (action.type) {
    case ActionTypes.RETURN_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };
    case ActionTypes.CLEAR_ERRORS:
      return {
        message: null,
        status: null,
        id: null,
      };
    default:
      return state;
  }
};
export default errorReducer;
