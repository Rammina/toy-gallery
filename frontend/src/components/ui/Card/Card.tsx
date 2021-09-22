// Package imports
import React, { FC } from "react";
// Non-package imports
import "./Card.scss";

interface Props {
  className?: string;
  style?: {
    [x: string]: any;
  };
  onMouseEnter?: Function;
  onMouseLeave?: Function;
  children: JSX.Element;
}

const Card: FC<Props> = (props) => {
  const onMouseEnterHandler = () => {
    if (props.onMouseEnter) props.onMouseEnter();
  };
  const onMouseLeaveHandler = () => {
    if (props.onMouseLeave) props.onMouseLeave();
  };

  return (
    <div
      className={`card ${props.className}`}
      style={props.style}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {props.children}
    </div>
  );
};

export default Card;
