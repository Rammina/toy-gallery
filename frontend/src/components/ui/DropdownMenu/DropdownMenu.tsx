import "./DropdownMenu.scss";

import React, { useState, useEffect, useRef, FC, MouseEvent } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: JSX.Element | null;
  clientX?: number;
  clientY?: number;
  className?: string;
  style?: { [x: string]: string };
  onClose?: Function;
  noReactPortal?: boolean; //if true, renders it on its location
  onMouseEnterStopPropagation?: boolean; //if true, stops event propagation to outside
}

const DropdownMenu: FC<Props> = (props) => {
  const [menuLeft, setMenuLeft] = useState<number | null>(null);
  const [menuTop, setMenuTop] = useState<number | null>(null);

  let dropdownMenuDiv = useRef<HTMLDivElement | null>(null);

  let clickCoordsX;
  let clickCoordsY;

  // updated positionMenu function
  const positionMenu = () => {
    const menu = dropdownMenuDiv.current;
    if (menu === null || !props.clientX || !props.clientY) return null;

    clickCoordsX = props.clientX;
    clickCoordsY = props.clientY;

    let menuWidth = menu.offsetWidth + 10;
    let menuHeight = menu.offsetHeight + 10;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    if (windowWidth - clickCoordsX < menuWidth) {
      setMenuLeft(windowWidth - menuWidth);
    } else {
      setMenuLeft(clickCoordsX);
    }

    if (windowHeight - clickCoordsY < menuHeight) {
      setMenuTop(windowHeight - menuHeight);
    } else {
      setMenuTop(clickCoordsY);
    }
  };

  // explicit any because of the error:
  // EventTarget is not assignable to Node
  const handleClick = function (e: any) {
    if (
      dropdownMenuDiv.current &&
      !dropdownMenuDiv.current.contains(e.target)
    ) {
      console.log("clicking outside DropdownMenu");
      if (props.onClose) props.onClose();
    }
  };

  const handleResize = () => {
    if (props.onClose) props.onClose();
  };

  useEffect(() => {
    // after the first render the div ref will already have existed
    dropdownMenuDiv.current!.focus();
    document.body.addEventListener("click", handleClick);
    document.body.addEventListener("contextmenu", handleClick);
    window.addEventListener("resize", handleResize);
    // clean up function
    return () => {
      document.body.removeEventListener("click", handleClick);
      document.body.removeEventListener("contextmenu", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (dropdownMenuDiv.current === null) return;
    positionMenu();
  }, [dropdownMenuDiv.current]);

  const menuOnMouseEnterHandler = (e: MouseEvent) => {
    if (props.onMouseEnterStopPropagation) e.stopPropagation();
  };

  const content = (
    <div
      className={`dropdown__outer-div ${props.className || ""}`}
      onMouseEnter={menuOnMouseEnterHandler}
    >
      <div
        className={`dropdown__middle-div ${props.className || ""}`}
        onMouseEnter={menuOnMouseEnterHandler}
        style={
          // it is either custom style or based on click/hover event
          props.style || {
            left: `${menuLeft || 0}px`,
            top: `${menuTop || 0}px`,
          }
        }
        tabIndex={0}
        ref={dropdownMenuDiv}
      >
        <ul
          className={`dropdown__ul ${props.className || ""}`}
          onMouseEnter={menuOnMouseEnterHandler}
        >
          {props.children}
        </ul>
      </div>
    </div>
  );

  // normal rendering without portal
  if (props.noReactPortal) {
    return content;
  }
  // rendering via portal
  return ReactDOM.createPortal(
    content,
    document.getElementById("dropdown-menu")!
  );
};
export default DropdownMenu;
