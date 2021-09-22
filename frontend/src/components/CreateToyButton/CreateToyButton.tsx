// Package import
import React, { useState, FC } from "react";
import { useSelector } from "react-redux";
// Non-package import
import CreateToyForm from "components/forms/toy/CreateToy/CreateToy";
import { ModalReduxFormContext } from "AppContext";
import { RootState } from "redux/reducers";
import history from "browserHistory";
import "./CreateToyButton.scss";
import PlusImg from "assets/icons/plus.png";

interface Props {
  className?: string;
  text?: string;
}

const CreateToyButton: FC<Props> = ({ className, text }) => {
  const { isSignedIn, user } = useSelector((state: RootState) => state.auth);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const onClickHandler = (): void => {
    // Only allow logged in users to create a toy page
    // TODO: Add toastify notification that tells users to log in first
    if (!isSignedIn || !user) history.push("/login");
    else setIsModalShown(true);
  };

  const onModalCloseHandler = (): void => {
    setIsModalShown(false);
  };

  const renderModal = (): JSX.Element | null =>
    !isModalShown ? null : <CreateToyForm ariaLabel="create toy modal" />;

  const getFormContext = () => ({
    onModalClose: onModalCloseHandler,
  });

  //TODO: if there is time to spare, make a mobile and desktop version of the button

  return (
    <>
      <ModalReduxFormContext.Provider value={getFormContext()}>
        {renderModal()}
        <button
          className={`btn btn--create ${className || ""}`}
          onClick={onClickHandler}
          title="Add a toy page"
          type="button"
          aria-label="Create toy"
        >
          <img
            className={`img--btn ${className || ""}`}
            src={PlusImg}
            alt="Plus"
          />
          {text || null}
        </button>
      </ModalReduxFormContext.Provider>
    </>
  );
};

export default CreateToyButton;
