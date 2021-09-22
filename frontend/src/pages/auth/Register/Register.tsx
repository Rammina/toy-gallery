// package imports
import React, { useEffect, FC } from "react";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { Auth } from "aws-amplify";
// non- package imports
import { Field, ReduxInput } from "redux/FormComponents";
//TODO: maybe I can just let AWS amplify handle the registration process
//TODO: but I still probably want to store user details on a database
import {
  AppDispatch,
  returnErrors,
  clearErrors,
  registerUser,
  actionShowLoader,
  ActionTypes,
} from "redux/actions";
import ErrorNotifications from "components/ui/FormElements/ErrorNotifications/ErrorNotifications";
import LoadingSpinner from "components/ui/loaders/LoadingSpinner";
import { RootState } from "redux/reducers";
import { validateEmail } from "helpers";

//TODO: go through the type definition files and find out the correct typings
interface Props {
  handleSubmit: any;
}

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: FC<Props> = ({ handleSubmit }) => {
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector((state: RootState) => state.error);
  const showLoader = useSelector(
    (state: RootState) => state.loader.showRegisterFormLoader
  );

  useEffect(() => {
    // make sure to remove any leftover errors from other forms and to clean up when closing this form
    dispatch(clearErrors());
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  // submit handler
  const onSubmit = async (formValues: any) => {
    dispatch(actionShowLoader("registerForm", true));
    // AWS Cognito integration here
    const { username, email, password } = formValues;

    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
        },
      });
      dispatch(registerUser(username));
    } catch (error: any) {
      console.error(error);
      // display error notification for the form
      if (error.message) dispatch(returnErrors(error.message, null, null));
      dispatch({ type: ActionTypes.REGISTER_FAIL });
    } finally {
      dispatch(actionShowLoader("registerForm", false));
    }
  };

  // render functions
  const renderErrorNotifications = (): JSX.Element | null => {
    const errorMessage = error.message;

    return errorMessage ? (
      <ErrorNotifications message={errorMessage || null} />
    ) : null;
  };

  const renderLoader = () => <LoadingSpinner showLoader={showLoader} />;

  return (
    <main className="auth page-container">
      <section className="auth__section--form">
        <h1 className="auth__heading--main">Account Registration</h1>
        <form className="auth__form" autoComplete="off">
          {renderErrorNotifications()}
          <Field
            name="username"
            component={ReduxInput}
            type="text"
            props={{
              inputProps: {
                className: "form__input",
                maxLength: "30",
                autoComplete: "off",
                id: "register-form-username-field",
              },
              labelProps: {
                className: "form__label",
                text: "Username *",
                id: "register-form-username-label",
              },
            }}
          />
          <Field
            name="email"
            component={ReduxInput}
            type="text"
            props={{
              inputProps: {
                className: "form__input",
                maxLength: "64",
                autoComplete: "off",
                id: "register-form-email-field",
              },
              labelProps: {
                className: "form__label",
                text: "Email *",
                id: "register-form-email-label",
              },
            }}
          />
          <Field
            name="password"
            component={ReduxInput}
            type="password"
            props={{
              inputProps: {
                className: "form__input",
                maxLength: "30",
                autoComplete: "off",
                type: "password",
                id: "register-form-password-field",
              },
              labelProps: {
                className: "form__label",
                text: "Password *",
                id: "register-form-password-label",
              },
            }}
          />
          <Field
            name="confirmPassword"
            component={ReduxInput}
            type="password"
            props={{
              inputProps: {
                className: "form__input",
                maxLength: "30",
                autoComplete: "off",
                type: "password",
                id: "register-form-confirm-password-field",
              },
              labelProps: {
                className: "form__label",
                text: "Confirm Password *",
                id: "register-form-confirm-password-label",
              },
            }}
          />
          <div className="form__div--center">
            <button
              className="form__button submit"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {renderLoader()} Sign Up
            </button>
          </div>
        </form>
        <Link className="form__link" to={`/login`}>
          Click here to login instead.
        </Link>
      </section>
    </main>
  );
};

interface RegisterFormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const validate = (formValues: FormValues) => {
  console.log(formValues);
  const errors: RegisterFormErrors = {};
  if (!formValues.email) {
    errors.email = "Please input an email.";
  } else if (!validateEmail(formValues.email)) {
    errors.email = "Invalid email address.";
  }
  if (!formValues.username) {
    errors.username = "Please input a username.";
  }
  if (!formValues.password) {
    errors.password = "Please input a password.";
  } else if (formValues.password.length < 8) {
    errors.password = "Password needs to be at least 8 characters.";
  }
  if (!formValues.confirmPassword) {
    errors.confirmPassword = "Please input your password again.";
  } else if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};

export default reduxForm({
  form: "registerForm",
  destroyOnUnmount: true,
  validate,
})(Register);
