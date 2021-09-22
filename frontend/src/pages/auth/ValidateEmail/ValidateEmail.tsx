// Package imports
import React, { FC } from "react";
import { Link } from "react-router-dom";
// Non-package imports
import { SITE_TITLE } from "utils/constants";
import "./ValidateEmail.scss";

interface Props {}

const ValidateEmail: FC<Props> = () => {
  return (
    <main className="validate-email page-container">
      <div className="validate-email__message-container">
        <h1 className="validate-email__heading">Email validation required.</h1>
        <p className="validate-email__p">
          You have successfully registered a new account for {SITE_TITLE}.
        </p>
        <br />
        <p>
          We've sent you a email. Please click on the confirmation link to
          verify your account.
        </p>
        <br />
        <p className="validate-email__p">
          Click any of the links below to leave this page.
        </p>
        <div className="validate-email button-container">
          <Link to="/login" className="validate-email__link">
            Login
          </Link>
          <Link to="/" className="validate-email__link">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ValidateEmail;
