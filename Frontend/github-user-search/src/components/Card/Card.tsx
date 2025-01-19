import React, { Dispatch, SetStateAction } from "react";
import { sliceText } from "../../utils/utils";
import "./card.css";

interface ICardProps {
  id: number;
  login: string;
  avatar: string;
  selectedUsers: number[];
  setSelectedUsers: Dispatch<SetStateAction<number[]>>;
  isEditing: boolean;
}

const labels = {
  viewProfile: "View profile",
  avatar: "Avatar",
};

const Card = ({
  id,
  login,
  avatar,
  selectedUsers,
  setSelectedUsers,
  isEditing,
}: ICardProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectedUsers((users) => {
      if (isChecked) {
        return [...users, id];
      } else {
        return users.filter((userId) => userId !== id);
      }
    });
  };

  return (
    <div className="card">
      {isEditing && (
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleCheckboxChange}
          checked={selectedUsers.includes(id)}
        />
      )}
      <div className="cardContent">
        <img src={avatar} alt={labels.avatar} className="avatar" />
        <div>
          <p>{id}</p>
          <p>{sliceText(login, 8)}</p>
        </div>
      </div>
      <button className="button">{labels.viewProfile}</button>
    </div>
  );
};

export default Card;
