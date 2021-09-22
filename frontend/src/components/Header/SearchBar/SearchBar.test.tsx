import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("SearchBar", () => {
  // setup before each test
  beforeEach(() => {
    render(<SearchBar />);
  });

  test("renders the component without errors", async () => {
    const searchBar = screen.getByRole("textbox");
    expect(searchBar).toBeInTheDocument();
  });
}
