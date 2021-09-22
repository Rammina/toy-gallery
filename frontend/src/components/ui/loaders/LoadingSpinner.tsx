/* credits to:
https://loading.io/css/
*/

// Package imports
import React, { FC } from "react";
// Non-package imports
import "./LoadingSpinner.scss";

interface Props {
  showLoader?: boolean;
  className?: string;
}

// component methods' JSDoc are at the bottom of the file to prevent clutter
const LoadingSpinner: FC<Props> = ({ showLoader, className }) => {
  return showLoader ? (
    <div className={`lds-ring ${className || ""}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : null;
};

export default LoadingSpinner;
