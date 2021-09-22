// Package imports
import React, { useEffect, FC } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux"; //TODO: make sure that connect is converted to useSelector
import {
  AppDispatch,
  clearErrors,
  deleteToy,
  actionShowLoader,
} from "redux/actions";
import { RootState } from "redux/reducers";
// Non-package imports
import ErrorNotifications from "components/ui/FormElements/ErrorNotifications/ErrorNotifications";
import Modal from "components/ui/Modal/Modal";
import LoadingSpinner from "components/ui/loaders/LoadingSpinner";
import { Toy } from "appTypes";

interface Props {
  toy: Toy;
  onModalClose: VoidFunction;
}

const DeleteToy: FC<Props> = ({ toy, onModalClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector((state: RootState) => state.error);
  const showLoader = useSelector(
    (state: RootState) => state.loader.showDeleteToyFormLoader
  );

  useEffect(() => {
    dispatch(clearErrors());
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  const onModalCloseHandler = (): void => {
    if (onModalClose) onModalClose();
  };

  // just take into account both the form submission event and button click event
  const onSubmitHandler = (e: any): void => {
    const onSuccessCb = () => {
      onModalCloseHandler();
    };
    if (toy) {
      e.preventDefault();
      actionShowLoader("deleteToyForm", true);
      const toyId: string = toy.id! || toy._id!;
      //TODO: Fix this
      dispatch(deleteToy(toyId, onSuccessCb));
    }
  };

  const renderErrorNotifications = () => {
    const errorMessage = error.message;
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage || null} />;
    }
    return null;
  };

  const renderLoader = () => {
    return <LoadingSpinner className="white" showLoader={showLoader} />;
  };

  const content = (
    <>
      <Modal
        className="delete-toy"
        headingText="Delete Toy"
        onModalClose={onModalCloseHandler}
        ariaLabel="delete toy modal"
      >
        <form
          id="delete-toy-form"
          autoComplete="off"
          onSubmit={onSubmitHandler}
        >
          <div className="delete-toy modal__div--content">
            <p className="modal__modal-p delete-toy">
              Are you sure you want to delete this toy?
            </p>
            <p className="modal__modal-p delete-toy enlarged-text centered">
              {toy.name}
            </p>
            <p
              id="delete-toy-description-paragraph"
              className="modal__modal-p small-text danger"
            >
              Warning: Deleted toys cannot be restored.
            </p>

            {renderErrorNotifications()}

            <button
              id="delete-toy-submit"
              className={"form__button submit danger"}
              type="submit"
              onClick={onSubmitHandler}
            >
              {renderLoader()} Delete Toy
            </button>
          </div>
        </form>
      </Modal>
    </>
  );

  // render
  return ReactDOM.createPortal(content, document.getElementById("modal")!);
};

export default DeleteToy;
