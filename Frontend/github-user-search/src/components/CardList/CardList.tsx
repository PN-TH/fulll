import { Dispatch, SetStateAction } from "react";
import { IUser } from "../../interfaces/users";
import Card from "../Card/Card";
import "./card-list.css";

interface ICardListProps {
  users: IUser[];
  selectedUsers: number[];
  setSelectedUsers: Dispatch<SetStateAction<number[]>>;
  isEditing: boolean;
}
const CardList = ({
  users,
  selectedUsers,
  setSelectedUsers,
  isEditing,
}: ICardListProps) => {
  return (
    <div className="cardList">
      {users.map((user) => (
        <Card
          key={user.id}
          id={user.id}
          login={user.login}
          avatar={user.avatar_url}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          isEditing={isEditing}
        />
      ))}
    </div>
  );
};

export default CardList;
