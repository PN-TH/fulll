import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { sliceText } from "../../utils/utils";
import { IUser } from "../../interfaces/users";
import "./card.css";

interface ICardProps {
  user: IUser;
  selectedUsers: number[];
  setSelectedUsers: Dispatch<SetStateAction<number[]>>;
  isEditing: boolean;
}

const labels = {
  viewProfile: "View profile",
  avatar: "Avatar",
};

const Card = ({
  user: { id, login, avatar_url, html_url },
  selectedUsers,
  setSelectedUsers,
  isEditing,
}: ICardProps) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        <img src={avatar_url} alt={labels.avatar} className="avatar" />

        <div className="userInfo">
          <p>{id}</p>
          <p>{sliceText(login, 8)}</p>
        </div>
      </div>
      <a href={html_url} target="_blank" rel="noreferrer">
        <button className="button">{labels.viewProfile}</button>
      </a>
    </div>
  );
};

export default Card;
