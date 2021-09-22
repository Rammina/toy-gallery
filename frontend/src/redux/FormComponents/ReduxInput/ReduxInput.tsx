// Package imports
import React, { FC } from "react";
// Non-package imports
import ReduxError from "../ReduxError/ReduxError";
import { FieldProps } from "../index";

export const ReduxInput: FC<FieldProps> = ({
  input,
  meta,
  formName,
  inputProps,
  labelProps,
}) => {
  // check if there is any error for this input, and if it is already touched
  const { error, touched } = meta;
  // className styling variables the prevent clutter
  const errorClass = error && touched ? "error" : null;
  const labelClass = labelProps.className || "";
  const labelId = labelProps.id || "";
  // render
  return (
    <div className="form__div--input">
      <label
        htmlFor={inputProps.id}
        className={`${errorClass} ${labelClass}`}
        id={labelId || ""}
      >
        {labelProps.text}
      </label>
      <input
        {...inputProps}
        {...input}
        className={`${inputProps.className} ${errorClass}`}
        autoFocus={inputProps.autoFocus || false}
        ref={inputProps.ref || null}
      />
      <ReduxError error={error} touched={touched} formName={formName} />
    </div>
  );
};

export default ReduxInput;
