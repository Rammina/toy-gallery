// package imports
import React, { useEffect, FC } from "react";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import "crypto-js/lib-typedarrays";
import { Auth } from "aws-amplify";
// non- package imports
import { Field, ReduxInput } from "redux/FormComponents";
import { User } from "appTypes";

import {
  AppDispatch,
  returnErrors,
  clearErrors,
  retrieveUserInfo,
  actionShowLoader,
  ActionTypes,
} from "redux/actions";
import ErrorNotifications from "components/ui/FormElements/ErrorNotifications/ErrorNotifications";
import LoadingSpinner from "components/ui/loaders/LoadingSpinner";
import { RootState } from "redux/reducers";
import history from "browserHistory";

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

const Login: FC<Props> = ({ handleSubmit }) => {
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector((state: RootState) => state.error);
  const showLoader = useSelector(
    (state: RootState) => state.loader.showLoginFormLoader
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
    dispatch(actionShowLoader("loginForm", true));
    // AWS Cognito integration here
    const { username, password } = formValues;
    console.log(username);
    console.log(password);
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      dispatch(retrieveUserInfo(user.username));
      // redirect to validation page
      history.push("/");
    } catch (error: any) {
      console.error(error);
      if (error.message)
        dispatch(returnErrors(error.message, 400, ActionTypes.LOGIN_FAIL));
      dispatch({ type: ActionTypes.LOGIN_FAIL });
    } finally {
      dispatch(actionShowLoader("loginForm", false));
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
        <h1 className="auth__heading--main">Login</h1>
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
                id: "login-form-username-field",
                // autoFocus: true,
              },
              labelProps: {
                className: "form__label",
                text: "Username *",
                id: "login-form-username-label",
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
                id: "login-form-password-field",
              },
              labelProps: {
                className: "form__label",
                text: "Password *",
                id: "login-form-password-label",
              },
            }}
          />

          <div className="form__div--center">
            <button
              className="form__button submit"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {renderLoader()} Sign In
            </button>
          </div>
        </form>
        <Link className="form__link" to={`/register`}>
          Don't have an account? Click here to sign up!
        </Link>
      </section>
    </main>
  );
};

interface LoginFormErrors {
  username?: string;
  password?: string;
}

const validate = (formValues: FormValues) => {
  console.log(formValues);
  const errors: LoginFormErrors = {};
  if (!formValues.username) {
    errors.username = "Please input a username.";
  }
  if (!formValues.password) {
    errors.password = "Please input a password.";
  } else if (formValues.password.length < 8) {
    errors.password = "Password needs to be at least 8 characters.";
  }
  //TODO: Should guard for lack of uppercase, number, special characters
  return errors;
};

export default reduxForm({
  form: "loginForm",
  destroyOnUnmount: true,
  validate,
})(Login);
