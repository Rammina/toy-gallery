import React from "react";
import { render, screen } from "@testing-library/react";
import SortToysButton from "./SortToysButton";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("SortToysButton", () => {
  // setup before each test
  beforeEach(() => {
    const initialState = {};
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    // create a mock div container for the modal to render into using createPortal
    render(
      <Provider store={store}>
        <SortToysButton />
      </Provider>
    );
  });

  test("renders the component without errors", async () => {
    const sortToysButton = screen.getByRole("button", { name: /sort toys/i });
    expect(sortToysButton).toBeInTheDocument();
  });
});
