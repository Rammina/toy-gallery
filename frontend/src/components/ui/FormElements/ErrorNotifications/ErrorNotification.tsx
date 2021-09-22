// Package imports
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux"; //TODO: make sure that connect is converted to useSelector
// Non-package imports
import { clearErrors, AppDispatch } from "redux/actions";
import { ErrorObject } from "appTypes";
import "./ErrorNotifications.scss";
import warningImg from "assets/icons/warning.png";

interface Props {
  message: ErrorObject;
}

const ErrorNotification: FC<Props> = ({ message }) => {
  const dispatch: AppDispatch = useDispatch();
  const [containerClass, setContainerClass] = useState<null | string>(null);

  const onCloseHandler = (): void => {
    setContainerClass("hide");
    setTimeout(() => {
      dispatch(clearErrors());
    }, 300);
  };

  return (
    <div className={`error-notification__div ${containerClass}`} role="alert">
      <div className="error-notification__div--text">
        <img
          className="server-side error__img"
          src={warningImg}
          alt="warning sign"
        ></img>

        <span>{message ? message : null}</span>
      </div>
      <button
        type="button"
        className="server-side error close-button"
        data-dismiss="alert"
        aria-label="Close"
        onClick={onCloseHandler}
      >
        x
      </button>
    </div>
  );
};

export default ErrorNotification;
