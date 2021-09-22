// Package imports
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
// Non-package imports
import toysReducer from "./toysReducer";
import selectedToyReducer from "./selectedToyReducer";
import wikiSearchReducer from "./wikiSearchReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import loaderReducer from "./loaderReducer";

const rootReducer = combineReducers({
  form: formReducer,
  toys: toysReducer,
  selectedToy: selectedToyReducer,
  wikiSearchValues: wikiSearchReducer,
  auth: authReducer,
  error: errorReducer,
  loader: loaderReducer,
});

// export type of the root reducer using a Typescript utility function and typeof
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
