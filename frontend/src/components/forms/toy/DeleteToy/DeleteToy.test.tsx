import React from "react";
import { render, screen } from "@testing-library/react";
import DeleteToy from "./DeleteToy";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Toy } from "appTypes";

describe("DeleteToy", () => {
  // setup before each test
  beforeEach(() => {
    const initialState = {
      error: {
        message: null,
        status: null,
        id: null,
      },
      loader: { showDeleteToyFormLoader: false },
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    const mockToy: Toy = {
      id: "000000000001",
      name: "Thor",
      description: "high quality",
      franchise: "Marvel",
      series: "Thor",
      manufacturer: "Hot Toys",
      image_url: "",
      user: "000000000002",
      date_posted: new Date(),
    };
    // create a mock div container for the modal to render into using createPortal
    render(
      <div>
        <Provider store={store}>
          <DeleteToy toy={mockToy} onModalClose={() => {}} />
        </Provider>
        <div id="modal"></div>
      </div>
    );
  });

  test("renders the component without errors", async () => {
    const deleteToy = screen.getByRole("dialog", {
      name: /delete toy modal/i,
    });
    expect(deleteToy).toBeInTheDocument();
  });
});
