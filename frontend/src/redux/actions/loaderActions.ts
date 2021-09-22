// Package imports
import { ActionCreator, AnyAction } from "redux";
// Non-package imports
import { ActionTypes } from "./types";
import { capitalizeFirstLetter } from "helpers";

export const actionShowLoader: ActionCreator<AnyAction> = (
  formName: string,
  show: boolean
) => {
  return {
    type: ActionTypes.ACTION_SHOW_LOADER,
    payload: { ["show" + capitalizeFirstLetter(formName) + "Loader"]: show },
  };
};
