// package imports
import React, { useEffect, useContext, FC } from "react";
import ReactDOM from "react-dom";
import { reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
// non-package
import { Field, ReduxInput, ReduxTextarea } from "redux/FormComponents";
import { Toy } from "appTypes";
import { ToyFormErrors } from "../aliasInterfaces";
import {
  AppDispatch,
  clearErrors,
  createToy,
  actionShowLoader,
} from "redux/actions";
import ErrorNotifications from "components/ui/FormElements/ErrorNotifications/ErrorNotifications";
import Modal from "components/ui/Modal/Modal";
import LoadingSpinner from "components/ui/loaders/LoadingSpinner";
import { RootState } from "redux/reducers";
import { ModalReduxFormContext } from "AppContext";

//TODO: go through the type definition files and find out the correct typings
interface Props {
  handleSubmit: any;
  onModalClose?: any;
}

const CreateToy: FC<Props> = ({ handleSubmit }) => {
  const { onModalClose } = useContext(ModalReduxFormContext);
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector((state: RootState) => state.error);
  const showLoader = useSelector(
    (state: RootState) => state.loader.showCreateToyFormLoader
  );

  useEffect(() => {
    // make sure to remove any leftover errors from other forms and to clean up when closing this form
    dispatch(clearErrors());
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  const onModalCloseHandler = (): void => {
    if (onModalClose) onModalClose();
  };

  // submit handler
  const onSubmit = (formValues: Toy) => {
    const createToySuccessCb: VoidFunction = () => {
      onModalCloseHandler();
    };
    // run action + loader that indicates that the action is running
    dispatch(actionShowLoader("createToyForm", true));
    dispatch(createToy(formValues, createToySuccessCb));
  };

  const renderErrorNotifications = (): JSX.Element | null => {
    const errorMessage = error.message;

    return errorMessage ? (
      <ErrorNotifications message={errorMessage || null} />
    ) : null;
  };

  //TODO: refactor renderLoader
  const renderLoader = () => <LoadingSpinner showLoader={showLoader} />;

  const renderContent = (): JSX.Element => {
    return (
      <Modal
        className="create-toy"
        headingText="Create a Toy"
        onModalClose={onModalCloseHandler}
        ariaLabel="create toy modal"
      >
        <form id="create-toy-form" autoComplete="off">
          <div className="create-toy form__div--content modal__div--content">
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
                  id: "create-toy-name-field",
                  type: "text",
                  autoFocus: true,
                },
                labelProps: {
                  className: "form__label",
                  text: "Toy Name *",
                  id: "create-toy-name-label",
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
                  id: "create-toy-franchise-field",
                  type: "text",
                },
                labelProps: {
                  className: "form__label",
                  text: "Franchise",
                  id: "create-toy-franchise-label",
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
                  id: "create-toy-series-field",
                  type: "text",
                },
                labelProps: {
                  className: "form__label",
                  text: "Series",
                  id: "create-toy-series-label",
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
                  id: "create-toy-manufacturer-field",
                  type: "text",
                },
                labelProps: {
                  className: "form__label",
                  text: "Toy Manufacturer",
                  id: "create-toy-manufacturer-label",
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
                  id: "create-toy-description-field",
                },
                labelProps: {
                  className: "form__label",
                  text: "Description ",
                  id: "create-toy-description-label",
                },
              }}
            />
            <div className="form__div--button">
              <button
                id="create-toy-submit"
                className={"form__button submit"}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {renderLoader()} Create Toy
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
  form: "createToyModal",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(CreateToy);
