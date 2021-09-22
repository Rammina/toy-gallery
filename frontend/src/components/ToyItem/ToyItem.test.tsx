import React from "react";
import { render, screen } from "@testing-library/react";
import ToyItem from "./ToyItem";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Toy } from "appTypes";

describe("ToyItem", () => {
  // setup before each test
  beforeEach(() => {
    const initialState = {
      auth: {
        isSignedIn: false,
        user: {
          id: "000000000001",
          username: "papa Thor",
          toysOwned: [],
          registerDate: new Date(),
        },
      },
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
      <Provider store={store}>
        <ToyItem toy={mockToy} />
      </Provider>
    );
  });

  test("renders the component without errors", async () => {
    const toyItem = screen.getByTestId("toy-item");
    expect(toyItem).toBeInTheDocument();
  });
});
