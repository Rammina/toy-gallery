// Package imports
import React, { useEffect, useContext, FC } from "react";
import ReactDOM from "react-dom";
import { reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
// Non-package imports
import { Toy } from "appTypes";
import { ToyFormErrors } from "../aliasInterfaces";
import {
  AppDispatch,
  clearErrors,
  editToy,
  actionShowLoader,
} from "redux/actions";
import ErrorNotifications from "components/ui/FormElements/ErrorNotifications/ErrorNotifications";
import Modal from "components/ui/Modal/Modal";
import { Field, ReduxInput, ReduxTextarea } from "redux/FormComponents/index";
import { RootState } from "redux/reducers";
import LoadingSpinner from "components/ui/loaders/LoadingSpinner";
import { ModalReduxFormContext } from "AppContext";
import "./EditToy.scss";

interface Props {
  toy: Toy;
  handleSubmit: Function;
  onModalClose?: Function;
}

const EditToy: FC<Props> = ({ handleSubmit }) => {
  const { toy, onModalClose } = useContext(ModalReduxFormContext);
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector((state: RootState) => state.error);
  const showLoader = useSelector(
    (state: RootState) => state.loader.showEditToyFormLoader
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

  // submit handler
  const onSubmit = async (formValues: Toy) => {
    const onSuccessCb = () => {
      onModalCloseHandler();
    };
    if (toy) {
      // run action + loader that indicates that the action is running
      dispatch(actionShowLoader("editToyForm", true));
      const toyId = toy.id || toy._id;
      dispatch(editToy(toyId, formValues, onSuccessCb));
    }
  };

  const renderErrorNotifications = () => {
    //TODO: check the structure for this again I think I got it wrong
    const errorMessage = error.message;

    return errorMessage ? (
      <ErrorNotifications message={errorMessage || null} />
    ) : null;
  };

  const renderLoader = () => <LoadingSpinner showLoader={showLoader} />;

  const renderContent = () => {
    return (
      <Modal
        className="edit-toy"
        headingText="Edit a Toy"
        onModalClose={onModalCloseHandler}
        ariaLabel="create toy modal"
      >
        <form id="edit-toy-form" autoComplete="off">
          <div className="edit-toy form__div--content modal__div--content">
            {renderErrorNotifications()}
            <Field
              name="name"
              component={ReduxInput}
              type="text"
              props={{
                formName: "toy",
                inputProps: {
                  className: "form__input",
                  maxLength: "60",
                  autoComplete: "off",
                  type: "text",
                  autoFocus: true,
                },
                labelProps: {
                  className: "form__label",
                  text: "Toy Name *",
                },
              }}
            />
            <Field
              name="franchise"
              component={ReduxInput}
              type="text"
              props={{
                formName: "toy",
                inputProps: {
                  className: "form__input",
                  maxLength: "60",
                  autoComplete: "off",
                  type: "text",
                },
                labelProps: {
                  className: "form__label",
                  text: "Franchise",
                },
              }}
            />
            <Field
              name="series"
              component={ReduxInput}
              type="text"
              props={{
                formName: "toy",
                inputProps: {
                  className: "form__input",
                  maxLength: "60",
                  autoComplete: "off",
                  type: "text",
                },
                labelProps: {
                  className: "form__label",
                  text: "Series",
                },
              }}
            />
            <Field
              name="manufacturer"
              component={ReduxInput}
              type="text"
              props={{
                formName: "toy",
                inputProps: {
                  className: "form__input",
                  maxLength: "60",
                  autoComplete: "off",
                  type: "text",
                },
                labelProps: {
                  className: "form__label",
                  text: "Toy Manufacturer",
                },
              }}
            />
            <Field
              name="description"
              component={ReduxTextarea}
              props={{
                formName: "toy",
                inputProps: {
                  className: "form__input",
                  autoComplete: "off",
                },
                labelProps: {
                  className: "form__label",
                  text: "Description ",
                },
              }}
            />

            <div className="form__div--button">
              <button
                className={"form__button submit"}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {renderLoader()} Edit Toy
              </button>
            </div>
          </div>
        </form>
      </Modal>
    );
  };

  // render
  return ReactDOM.createPortal(
    renderContent(),
    document.getElementById("modal")!
  );
};

/**
 *redux-form's validate function for checking form values
 *@function validate
 *@returns {Object} - Object containing errors
 */
const validate = (formValues: Toy) => {
  const errors: ToyFormErrors = {};
  if (!formValues.name) {
    errors.name = "Please input a toy name.";
  }
  return errors;
};

export default reduxForm<Toy, any, string>({
  form: "editToyModal",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(EditToy);
