// Package imports
import React, { useState, FC } from "react";
import { useSelector } from "react-redux";
// Non-package imports
import Card from "components/ui/Card/Card";
import EditToyButton from "../EditToyButton/EditToyButton";
import DeleteToyButton from "../DeleteToyButton/DeleteToyButton";
import { Toy, User } from "appTypes";
import { RootState } from "redux/reducers";
import history from "../../browserHistory";
import "./ToyItem.scss";
import DefaultToyImg from "assets/images/image-not-found.png";

interface ToyItemProps {
  toy: Toy;
  className?: string;
}

const ToyItem: FC<ToyItemProps> = ({ toy, className }) => {
  const { isSignedIn, user } = useSelector((state: RootState) => state.auth);
  const [isItemHovered, setIsItemHovered] = useState<boolean>(false);

  // handler functions
  const toyItemOnClickHandler = (): void => {
    history.push(`/toys/${toy.id || toy._id}`);
  };

  const toyItemOnMouseEnter = (): void => {
    setIsItemHovered(true);
  };
  const toyItemOnMouseLeave = (): void => {
    setIsItemHovered(false);
  };

  // conditional classnames based on events
  const getPopupShowClass = () => (isItemHovered ? "show" : "");

  // only render the user if it exists and has a username property
  const renderUser = () => {
    if (toy.user && typeof toy.user !== "string")
      return <h3>Posted by {toy.user.username}</h3>;
    return null;
  };

  //TODO: make this work for a simplified version of Toy
  const renderActionButtons = (): JSX.Element | null => {
    const toyUser = toy.user as User;
    if (!isSignedIn || user!.username !== toyUser.username) return null;
    return (
      <div className="toy-item__div--actions">
        <EditToyButton
          toy={toy}
          className="toy-item__button--action"
          text="Edit"
        />
        |
        <DeleteToyButton
          toy={toy}
          className="toy-item__button--action"
          text="Delete"
        />
      </div>
    );
  };

  return (
    <>
      <div
        className={`toy-item ${className || ""}`}
        onClick={toyItemOnClickHandler}
        data-testid="toy-item"
      >
        <Card
          className="toy-item__card"
          onMouseEnter={toyItemOnMouseEnter}
          onMouseLeave={toyItemOnMouseLeave}
        >
          <>
            <div className={`toy-item__div--image ${className || ""}}`}>
              <img src={toy.image_url || DefaultToyImg} alt="Toy thumbnail" />
            </div>
            <div className={`toy-item__div--popup ${getPopupShowClass()}`}>
              <div className="toy-item__div--info">
                <h2>{toy.name}</h2>
                {renderUser()}
              </div>

              {renderActionButtons()}
            </div>
          </>
        </Card>
      </div>
    </>
  );
};

export default ToyItem;
