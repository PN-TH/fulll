import { render, screen } from "@testing-library/react";
import ErrorToast from "./ErrorToast";

describe("ErrorToast", () => {
  it("should render the error toast correctly", () => {
    render(<ErrorToast message="Error" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
