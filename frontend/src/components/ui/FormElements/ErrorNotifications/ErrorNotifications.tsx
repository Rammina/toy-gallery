// Package imports
import React, { FC } from "react";
// Non-package imports
import ErrorNotification from "./ErrorNotification";
import { ErrorObject } from "appTypes";
import "./ErrorNotifications.scss";

interface Props {
  message?: ErrorObject | null;
}

const ErrorNotifications: FC<Props> = ({ message }) => {
  //TODO: when there is extra time think about implementing displaying multiple error messages (probably make it into an array containing multiple error objects)
  return message ? (
    <div className="error-notifications__div" role="alert">
      <ErrorNotification message={message} />
    </div>
  ) : null;
};

export default ErrorNotifications;
