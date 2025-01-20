import { Dispatch, RefObject, SetStateAction } from "react";
import { IUser } from "../../interfaces/users";
import Card from "../Card/Card";
import "./card-list.css";

interface ICardListProps {
  users: IUser[];
  selectedUsers: number[];
  setSelectedUsers: Dispatch<SetStateAction<number[]>>;
  isEditing: boolean;
  cardListRef: RefObject<HTMLDivElement | null>;
}
const CardList = ({
  users,
  selectedUsers,
  setSelectedUsers,
  isEditing,
  cardListRef,
}: ICardListProps) => {
  return (
    <div className="cardList" ref={cardListRef}>
      {users.map((user) => (
        <Card
          key={user.id}
          user={user}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          isEditing={isEditing}
        />
      ))}
    </div>
  );
};

export default CardList;
