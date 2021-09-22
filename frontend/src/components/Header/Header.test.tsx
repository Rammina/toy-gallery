import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { SITE_TITLE } from "utils/constants";

describe("Header", () => {
  // setup before each test
  beforeEach(() => {
    const initialState = {};
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    // create a mock div container for the modal to render into using createPortal
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });

  test("renders the component without errors", async () => {
    const headerTitle = screen.getByText(SITE_TITLE);
    expect(headerTitle).toBeInTheDocument();
  });
});
