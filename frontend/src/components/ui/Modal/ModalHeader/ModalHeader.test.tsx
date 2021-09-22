import React from "react";
import { render, screen } from "@testing-library/react";
import ModalHeader from "./ModalHeader";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("ModalHeader", () => {
  // setup before each test
  beforeEach(() => {
    const initialState = {
      error: {
        message: null,
        status: null,
        id: null,
      },
      loader: { showCreateToyFormLoader: false },
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    // create a mock div container for the modal to render into using createPortal
    render(
      <div>
        <Provider store={store}>
          <ModalHeader />
        </Provider>
        <div id="modal"></div>
      </div>
    );
  });

  test("renders the component without errors", async () => {
    const createToyButton = screen.getByRole("button", { name: /create toy/i });
    expect(createToyButton).toBeInTheDocument();
  });

  //TODO: fix this test, because it raises an error with React.createPortal
  test("clicking the button should open the modal", async () => {
    const createToyButton = screen.getByRole("button", { name: /create toy/i });
    userEvent.click(createToyButton);

    const createToyModal = screen.getByRole("dialog", {
      name: /create toy modal/i,
    });
    console.log(createToyModal);
    expect(createToyModal).toBeInTheDocument();
  });
});
