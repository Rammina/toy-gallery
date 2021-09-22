// Package imports
import React, { useState, FC, MouseEvent } from "react";
// Non-package imports
import EditToyForm from "components/forms/toy/EditToy/EditToy";
import { Toy } from "appTypes";
import { ModalReduxFormContext } from "AppContext";
import "./EditToyButton.scss";
import WrenchImg from "assets/icons/wrench.png";

interface Props {
  toy: Toy;
  className?: string;
  text?: string;
}

const EditToyButton: FC<Props> = ({ toy, className, text }) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const onClickHandler = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalShown(true);
  };

  // TODO: There is a memory leak when updating this component after unmounting
  const onModalCloseHandler = (): void => {
    setIsModalShown(false);
  };

  const renderModal = (): JSX.Element | null =>
    !isModalShown ? null : <EditToyForm initialValues={{ ...toy }} />;

  // conditional text being rendered depending on passed down value from parent component
  const renderText = (): JSX.Element | null =>
    text ? (
      <span className={`span--btn ${className || ""}`}>{text}</span>
    ) : null;

  // values are placed here to prevent cluttering
  const getFormContext = () => ({
    onModalClose: onModalCloseHandler,
    toy: toy,
  });

  return (
    <>
      <ModalReduxFormContext.Provider value={getFormContext()}>
        {renderModal()}
        <button
          className={`btn btn--edit ${className || ""}`}
          onClick={onClickHandler}
          title="Edit this toy"
          type="button"
        >
          <img
            className={`img--btn ${className || ""}`}
            src={WrenchImg}
            alt="Wrench"
          />
          {renderText()}
        </button>
      </ModalReduxFormContext.Provider>
    </>
  );
};

export default EditToyButton;
