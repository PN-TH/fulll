import { render, screen } from "@testing-library/react";
import CardList from "./CardList";
import { IUser } from "../../interfaces/users";

const mockUsers = [
  { id: 1, login: "react", avatar_url: "react.svg" },
  { id: 2, login: "angular", avatar_url: "angular.svg" },
];

const mockSetSelectedUsers = jest.fn();

describe("CardList", () => {
  it("should render the card list correctly", () => {
    render(
      <CardList
        users={mockUsers as IUser[]}
        selectedUsers={[]}
        setSelectedUsers={mockSetSelectedUsers}
        isEditing={false}
      />
    );

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("angular")).toBeInTheDocument();
  });
});
