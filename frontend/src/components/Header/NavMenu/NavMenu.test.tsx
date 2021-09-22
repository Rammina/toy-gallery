import React from "react";
import { render, screen } from "@testing-library/react";
import NavMenu from "./NavMenu";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("NavMenu", () => {
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

    render(
      <div>
        <Provider store={store}>
          <NavMenu />
        </Provider>
      </div>
    );
  });

  test("renders the component without errors", async () => {
    //note: there is only one nav element in the entire application right now, so there is no need for name
    const navMenu = screen.getByRole("navigation");
    expect(navMenu).toBeInTheDocument();
  });
});
