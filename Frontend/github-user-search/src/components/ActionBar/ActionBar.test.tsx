import { render, screen, fireEvent } from "@testing-library/react";
import ActionBar from "./ActionBar";
import { IUser } from "../../interfaces/users";

const mockSetSelectedUsers = jest.fn();
const mockSetUsers = jest.fn();
const mockSetIsEditing = jest.fn();

const mockUsers = [
  { id: 1, login: "User 1" },
  { id: 2, login: "User 2" },
  { id: 3, login: "User 3" },
] as IUser[];

const renderActionBar = (isEditing: boolean) => {
  render(
    <ActionBar
      users={mockUsers}
      selectedUsers={[1]}
      setSelectedUsers={mockSetSelectedUsers}
      setUsers={mockSetUsers}
      isEditing={isEditing}
      setIsEditing={mockSetIsEditing}
    />
  );
};

describe("ActionBar", () => {
  it("should return correct count of users", () => {
    renderActionBar(false);
    expect(screen.getByText("3 elements")).toBeInTheDocument();
  });

  it("should return correct count of selectedUsers", () => {
    renderActionBar(true);
    expect(screen.getByText("1 element selected")).toBeInTheDocument();
  });

  it("should change edit button to exit button when isEditing is true", () => {
    let isEditing = false;

    mockSetIsEditing.mockImplementation((callback) => {
      isEditing = callback(isEditing);
      renderActionBar(isEditing);
    });

    renderActionBar(isEditing);
    const editButton = screen.getByText("Enter Edit Mode");
    fireEvent.click(editButton);

    expect(mockSetIsEditing).toHaveBeenCalled();
    expect(screen.getByText("Exit Edit Mode")).toBeInTheDocument();
  });

  it("should delete selected users", () => {
    renderActionBar(true);
    const deleteButton = screen.getByAltText("Delete");
    fireEvent.click(deleteButton);

    const usersToKeep = mockUsers.filter((user) => user.id !== 1);

    expect(mockSetUsers).toHaveBeenCalledWith(usersToKeep);
    expect(mockSetSelectedUsers).toHaveBeenCalledWith([]);
  });

  it("should duplicate selected users", () => {
    renderActionBar(true);
    const duplicateButton = screen.getByAltText("Duplicate");
    fireEvent.click(duplicateButton);

    const expectedUsers = [...mockUsers, { id: 4, login: "User 1" }];

    expect(mockSetUsers).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = mockSetUsers.mock.calls[0][0];
    const updatedUsers = updaterFunction(mockUsers);
    expect(updatedUsers).toEqual(expectedUsers);
  });

  it("should select all users", () => {
    renderActionBar(true);
    const selectAllCheckbox = screen.getByRole("checkbox");
    fireEvent.click(selectAllCheckbox);

    expect(mockSetSelectedUsers).toHaveBeenCalledWith([1, 2, 3]);
  });
});
