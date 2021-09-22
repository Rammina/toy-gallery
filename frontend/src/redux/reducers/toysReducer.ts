// reducer that contains the list of all toys
// package import
import { Reducer } from "redux";
// Non-package imports
import { ActionTypes, ToysAction } from "../actions";
import { Toy } from "appTypes";

const initialState: Toy[] = [];

const toysReducer: Reducer = (state = initialState, action: ToysAction) => {
  switch (action.type) {
    case ActionTypes.GET_TOY_LIST_SUCCESS:
      return action.payload;
    case ActionTypes.CREATE_TOY_SUCCESS:
      return [...state, action.payload];
    // replace the toy with the same id with the one in the payload
    case ActionTypes.EDIT_TOY_SUCCESS:
    case ActionTypes.UPLOAD_TOY_IMAGE_SUCCESS:
      return state.map((toy: Toy) => {
        const toyId = toy.id! || toy._id!;
        if (toyId === action.payload.id || toyId === action.payload._id) {
          toy = action.payload;
        }
        return toy;
      });
    case ActionTypes.DELETE_TOY_SUCCESS:
      return state.filter((toy: Toy) => toy.id !== action.payload.toyId);
    case ActionTypes.CLEAR_TOY_LIST:
      return [];
    case ActionTypes.GET_TOY_LIST_FAIL:
    default:
      return state;
  }
};

export default toysReducer;
