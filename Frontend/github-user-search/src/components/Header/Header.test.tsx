import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("should render the header correctly", () => {
    render(<Header />);
    const headerElement = screen.getByText("Github Search");
    expect(headerElement).toBeInTheDocument();
  });
});
