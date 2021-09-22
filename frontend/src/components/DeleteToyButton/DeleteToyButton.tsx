// Package imports
import React, { useState, FC, MouseEvent } from "react";
// Non-package imports
import DeleteToyForm from "components/forms/toy/DeleteToy/DeleteToy";
import { Toy } from "appTypes";
import "./DeleteToyButton.scss";
import TrashImg from "assets/icons/trash.png";

interface Props {
  toy: Toy;
  className?: string;
  text?: string;
}

const DeleteToyButton: FC<Props> = ({ toy, className, text }) => {
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

  const renderModal = () =>
    !isModalShown ? null : (
      <DeleteToyForm onModalClose={onModalCloseHandler} toy={toy} />
    );

  // conditional text being rendered depending on passed down value from parent component
  const renderText = () =>
    text ? (
      <span className={`span--btn ${className || ""}`}>{text}</span>
    ) : null;

  return (
    <>
      {renderModal()}
      <button
        className={`btn btn--delete danger ${className || ""}`}
        onClick={onClickHandler}
        title="Delete this toy"
        type="button"
      >
        <img
          className={`img--btn danger ${className || ""}`}
          src={TrashImg}
          alt="Trash"
        />
        {renderText()}
      </button>
    </>
  );
};

export default DeleteToyButton;
