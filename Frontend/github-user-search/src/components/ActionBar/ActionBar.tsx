import React, { Dispatch, RefObject, SetStateAction } from "react";
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
  cardListRef?: RefObject<HTMLDivElement | null>;
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
  cardListRef,
}: ISelectedCounterProps) => {
  // Check if all users are selected
  const allUsersSelected =
    selectedUsers.length === users.length && users.length > 0;

  // Check if there are any selected users
  const hasSelectedUsers = selectedUsers.length > 0;

  // Remove selected users from the list of users
  const handleDelete = () => {
    const updatedUsers = users.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedUsers([]);
  };

  // Duplicate selected users and add them to the list of users
  const handleDuplicate = () => {
    const usersToDuplicate = users.filter((user) =>
      selectedUsers.includes(user.id)
    );

    // Find the max ID in the list of users and increment it
    const maxId = Math.max(...users.map((u) => u.id), 0);
    let newId = maxId + 1;

    const duplicatedUsers = usersToDuplicate.map((user) => ({
      ...user,
      id: newId++,
    }));
    setUsers((prevUsers) => [...prevUsers, ...duplicatedUsers]);
    // Use requestAnimationFrame with ref to scroll to the bottom of the list when duplicating
    requestAnimationFrame(() => {
      cardListRef?.current?.scrollTo({
        top: cardListRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
    // Clear selectedUsers after duplicating
    setSelectedUsers([]);
  };

  /**
   * Handle the change event of the select all checkbox
   */
  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const allUserIds = users.map((user) => user.id);
      // Combine current and all user IDs, removing duplicates with Set
      const uniqueIds = new Set([...selectedUsers, ...allUserIds]);
      setSelectedUsers(Array.from(uniqueIds));
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
          {isEditing ? labels.exitEditMode : labels.enterEditMode}
        </button>
      </div>
      <div className="actionBar">
        {isEditing ? (
          <label className="userCounter" htmlFor="selectAllCheckbox">
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
          // Display the number of users and the pluralized text
          <div className="userCounter">
            <span>
              {users.length} {pluralizeText(users.length, labels.element)}
            </span>
          </div>
        )}
        {isEditing && (
          <div className="icons">
            <img
              src="/assets/icons/trash.svg"
              alt={labels.delete}
              className={`icon ${!hasSelectedUsers ? "disabled" : ""}`}
              onClick={hasSelectedUsers ? handleDelete : undefined}
            />
            <img
              src="/assets/icons/copy.svg"
              alt={labels.duplicate}
              className={`icon ${!hasSelectedUsers ? "disabled" : ""}`}
              onClick={hasSelectedUsers ? handleDuplicate : undefined}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ActionBar;
