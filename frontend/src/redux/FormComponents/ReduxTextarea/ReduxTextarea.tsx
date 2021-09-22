// Package imports
import React, { useEffect, useRef, FC } from "react";
// Non-package imports
import ReduxError from "../ReduxError/ReduxError";
import { FieldProps } from "../index";

export const ReduxTextarea: FC<FieldProps> = ({
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
  const labelId = labelProps.id || null;
  // ref
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const OnInput = () => {
    if (textareaRef.current === null) return null;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };
  // method that increases height when the text occupies the element width per row
  const autoIncreaseHeight = () => {
    if (textareaRef.current === null) return null;
    const textarea = textareaRef.current;
    //Responsive textarea that increases the row count depending on the text content
    textarea.setAttribute(
      "style",
      "height:" + textarea.scrollHeight + "px;overflow-y:hidden;"
    );
    textarea.addEventListener("input", OnInput, false);
  };

  const autoIncreaseHeightCleanup = () => {
    if (textareaRef.current === null) return null;
    const textarea = textareaRef.current;
    textarea.removeEventListener("input", OnInput);
  };

  useEffect(() => {
    autoIncreaseHeight();
    return () => {
      autoIncreaseHeightCleanup();
    };
  }, [textareaRef.current]);

  // get rid of description placeholders
  if (input.name === "description") {
    input.value = input.value !== "No description provided." ? input.value : "";
  }

  // render
  return (
    <div className="form__div--input">
      <label htmlFor={inputProps.id} className={`${errorClass} ${labelClass}`}>
        {labelProps.text}
      </label>
      <textarea
        {...inputProps}
        {...input}
        ref={textareaRef}
        className={`${inputProps.className} ${errorClass}`}
        disabled={inputProps.disabled || false}
      ></textarea>
      <ReduxError error={error} touched={touched} formName={formName} />
    </div>
  );
};

export default ReduxTextarea;
