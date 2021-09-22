import React from "react";
import { render, screen } from "@testing-library/react";
import App from "App";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("App", () => {
  const initialState = {};
  const mockStore = configureStore([thunk]);
  let store;

  test("renders the application without errors", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const appContainer = screen.getByTestId("app-outer-container");
    expect(appContainer).toBeInTheDocument();
  });
});
