import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import useDebounce from "../../hooks/useDebounce/useDebounce";

jest.mock("../../hooks/useDebounce/useDebounce");

describe("SearchBar", () => {
  const mockSetQuery = jest.fn();

  it("should render the search bar correctly", () => {
    render(<SearchBar query="react" setQuery={mockSetQuery} />);
    const input = screen.getByPlaceholderText("Search");
    expect(input).toHaveValue("react");
  });

  it("should call setQuery when input value changes", () => {
    (useDebounce as jest.Mock).mockImplementation((value) => value);

    render(<SearchBar query="" setQuery={mockSetQuery} />);
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "angular" } });
    expect(mockSetQuery).toHaveBeenCalledWith("angular");
  });
});
