import { render, screen, fireEvent } from "@testing-library/react";
import { IUser } from "../../interfaces/users";
import Card from "./Card";

describe("Card", () => {
  const mockSetSelectedUsers = jest.fn();

  const defaultProps = {
    user: {
      id: 1,
      login: "john-doe-react",
      avatar_url: "react.svg",
      html_url: "",
    } as IUser,
    selectedUsers: [],
    setSelectedUsers: mockSetSelectedUsers,
    isEditing: false,
  };

  it("should render the card content correctly", () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText("john-doe...")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "react.svg");
    expect(
      screen.getByRole("button", { name: "View profile" })
    ).toBeInTheDocument();
  });

  it("should not render the checkbox when isEditing is false", () => {
    render(<Card {...defaultProps} />);
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("should render the checkbox when isEditing is true", () => {
    render(<Card {...defaultProps} isEditing={true} />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("should call setSelectedUsers when checkbox is clicked", () => {
    render(<Card {...defaultProps} isEditing={true} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockSetSelectedUsers).toHaveBeenCalledTimes(1);
  });
});
