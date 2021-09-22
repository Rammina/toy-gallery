// Package imports
import React, { FC } from "react";
import { Link } from "react-router-dom";
// Non-package imports
import "./ListItem.scss";

export interface ListItemProps {
  children: JSX.Element | null;
  to?: string;
  className?: string;
  style?: {} | null;
}

const ListItem: FC<ListItemProps> = ({
  to,
  className,
  style,
  children,
}): JSX.Element => {
  //with to, it becomes a link that points to a URL address
  if (to)
    return (
      <Link to={to} className={`list-item ${className}`} style={style || {}}>
        {children}
      </Link>
    );
  // otherwise just render a normal list item
  return (
    <li className={`list-item ${className}`} style={style || {}}>
      {children}
    </li>
  );
};

export default ListItem;
