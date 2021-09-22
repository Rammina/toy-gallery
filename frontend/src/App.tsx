// Package imports
import { useState, useEffect, FC } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
// Non-package imports
import history from "./browserHistory";
import ToyListPage from "pages/ToyListPage/ToyListPage";
import ToyPage from "pages/ToyPage/ToyPage";
import ErrorPage from "pages/ErrorPage/ErrorPage";
import Register from "pages/auth/Register/Register";
import Login from "pages/auth/Login/Login";
import ValidateEmail from "pages/auth/ValidateEmail/ValidateEmail";
import Header from "components/Header/Header";
// react context
import { WindowContext, WindowContextValues } from "AppContext";
import { appAuthSetupOnLoadHandler } from "helpers";
import * as constants from "utils/constants";

const App: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  // screen with variables
  const { NON_MOBILE_WIDTH, NON_MOBILE_HEIGHT, LAPTOP_WIDTH, LAPTOP_HEIGHT } =
    constants;
  const [isNonMobileWidth, setIsNonMobileWidth] = useState<boolean>(
    window.innerWidth >= NON_MOBILE_WIDTH
  );
  const [isNonMobileHeight, setIsNonMobileHeight] = useState<boolean>(
    window.innerHeight >= NON_MOBILE_HEIGHT
  );
  const [isLaptopWidth, setIsLaptopWidth] = useState<boolean>(
    window.innerWidth >= LAPTOP_WIDTH
  );
  const [isLaptopHeight, setIsLaptopHeight] = useState<boolean>(
    window.innerHeight >= LAPTOP_HEIGHT
  );

  const handleResize = (): void => {
    // check if isNonMobileWidth
    if (window.innerWidth >= NON_MOBILE_WIDTH) setIsNonMobileWidth(true);
    else setIsNonMobileWidth(false);
    // check if isNonMobileHeight
    if (window.innerHeight >= NON_MOBILE_HEIGHT) setIsNonMobileHeight(true);
    else setIsNonMobileHeight(false);
    // check if isLaptopWidth
    if (window.innerWidth >= LAPTOP_WIDTH) setIsLaptopWidth(true);
    else setIsLaptopWidth(false);
    // check if isLaptopHeight
    if (window.innerHeight >= LAPTOP_HEIGHT) setIsLaptopHeight(true);
    else setIsLaptopHeight(false);
  };

  // handle resizing-related and cognito authentication states after first render
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    appAuthSetupOnLoadHandler(dispatch);
    // cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // to be passed to the provider function
  const getWindowContextValue = (): WindowContextValues => {
    return {
      isNonMobileWidth,
      isNonMobileHeight,
      isLaptopWidth,
      isLaptopHeight,
    };
  };

  // render
  return (
    <div data-testid="app-outer-container">
      {/*react-toastify container used for notifications*/}
      <ToastContainer />
      <Router history={history}>
        <WindowContext.Provider value={getWindowContextValue()}>
          <Header />
          <Switch>
            <Route path={["/", "/toys"]} exact>
              <ToyListPage />
            </Route>
            <Route path="/toys/:toyId" exact>
              <ToyPage />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/validate-email" exact>
              <ValidateEmail />
            </Route>
            {/*if it's not any route of the above, show an error 404 page*/}
            <Route>
              <ErrorPage
                errorCode="404"
                errorHeading="Page not found."
                errorText="Sorry, we could not find the page you are looking for."
              />
            </Route>
          </Switch>
        </WindowContext.Provider>
      </Router>
    </div>
  );
};

export default App;
