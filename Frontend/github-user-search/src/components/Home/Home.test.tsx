import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { fetchUsers } from "../../services/userService";

jest.mock("../../services/userService", () => ({
  fetchUsers: jest.fn(),
}));

describe("Home component", () => {
  it("should display loading text while fetching data", async () => {
    (fetchUsers as jest.Mock).mockResolvedValueOnce({ items: [] });

    render(<Home />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "react" } });

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });

  it("should display a rate limit error message when get 403 error", async () => {
    (fetchUsers as jest.Mock).mockRejectedValueOnce(new Error("403"));

    render(<Home />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "react" } });

    expect(
      await screen.findByText("Rate limit exceeded... Please try again later.")
    ).toBeInTheDocument();
  });
});
