import React, { Dispatch, SetStateAction } from "react";
import "./action-bar.css";
import { IUser } from "../../interfaces/users";
import { pluralizeText } from "../../utils/utils";

interface ISelectedCounterProps {
  selectedUsers: number[];
  setSelectedUsers: Dispatch<SetStateAction<number[]>>;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  users: IUser[];
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
}

const labels = {
  element: "element",
  enterEditMode: "Enter Edit Mode",
  exitEditMode: "Exit Edit Mode",
  delete: "Delete",
  duplicate: "Duplicate",
  selectAll: "Select all",
  selected: "selected",
};

const ActionBar = ({
  selectedUsers,
  setSelectedUsers,
  setUsers,
  users,
  setIsEditing,
  isEditing,
}: ISelectedCounterProps) => {
  const allUsersSelected =
    selectedUsers.length === users.length && users.length > 0;

  const handleDelete = () => {
    const updatedUsers = users.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedUsers([]);
  };

  const handleDuplicate = () => {
    const usersToDuplicate = users.filter((user) =>
      selectedUsers.includes(user.id)
    );

    const maxId = Math.max(...users.map((u) => u.id), 0);
    let newId = maxId + 1;

    const duplicatedUsers = usersToDuplicate.map((user) => ({
      ...user,
      id: newId++,
    }));
    setUsers((prevUsers) => [...duplicatedUsers, ...prevUsers]);
  };

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const allUsersIds = users.map((user) => user.id);
      const set = new Set([...selectedUsers, ...allUsersIds]);
      setSelectedUsers(Array.from(set));
    } else {
      setSelectedUsers([]);
    }
  };

  return (
    <>
      <div className="editMode">
        <button
          className="button"
          onClick={() => setIsEditing((isEditing) => !isEditing)}>
          {isEditing ? "Exit Edit Mode" : "Enter Edit Mode"}
        </button>
      </div>
      <div className="actionBar">
        {isEditing ? (
          <label className="customCheckbox">
            <input
              id="selectAllCheckbox"
              type="checkbox"
              checked={allUsersSelected}
              onChange={handleSelectAllChange}
            />
            <span className="customCheckmark"></span>
            {selectedUsers.length}{" "}
            {pluralizeText(selectedUsers.length, labels.element)}{" "}
            {labels.selected}
          </label>
        ) : (
          <p className="userCounter">
            {users.length} {pluralizeText(users.length, labels.element)}
          </p>
        )}
        {isEditing && (
          <div className="icons">
            <img
              src="/assets/icons/trash.svg"
              alt={labels.delete}
              className="icon"
              onClick={handleDelete}
            />
            <img
              src="/assets/icons/copy.svg"
              alt={labels.duplicate}
              className="icon"
              onClick={handleDuplicate}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ActionBar;
