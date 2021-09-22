// Package imports
import React, { FC } from "react";
// Non-package imports
import CloseButton from "components/ui/buttons/CloseButton/CloseButton";
import "./ModalHeader.scss";

//note: test the use of context, remove  from the variables

interface Props {
  headingText?: string;
  className?: string;
  headerClassName?: string;
  onModalClose?: Function;
}

const ModalHeader: FC<Props> = ({
  headingText,
  headerClassName,
  className,
  onModalClose,
}) => {
  // guard against undefined
  const onModalCloseHandler = (): void => {
    if (onModalClose) onModalClose();
  };

  return (
    <header
      className={`modal__header ${className || ""} ${headerClassName || ""}`}
    >
      <div className="modal__div--header modal-header__div--content">
        <h3
          className={`modal__heading modal-header__heading ${className || ""} `}
        >
          {headingText || ""}
        </h3>
        <CloseButton
          className={`modal-header ${className || ""}`}
          onClickHandler={onModalCloseHandler}
        />
      </div>
    </header>
  );
};
export default ModalHeader;
