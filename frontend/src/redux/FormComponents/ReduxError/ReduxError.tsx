// Package imports
import React, { FC } from "react";
// Non-package imports
import warningImg from "assets/icons/warning.png";

interface Props {
  error?: string;
  touched: boolean;
  formName: string;
}

export const ReduxError: FC<Props> = ({ error, touched, formName }) => {
  // Creates an error message if there is an error and if the input field is touched
  return error && touched ? (
    <div className={`${formName} redux-error__div`}>
      <img className="error__img" src={warningImg} alt="warning sign"></img>
      {error}
    </div>
  ) : null;
};

export default ReduxError;
