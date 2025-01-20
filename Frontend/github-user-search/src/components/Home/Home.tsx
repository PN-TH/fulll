import { useEffect, useState } from "react";
import { IGetUsersResponse, IUser } from "../../interfaces/users";
import { fetchUsers } from "../../services/userService";
import { useFetch } from "../../hooks/useFetch/useFetch";
import SearchBar from "../SearchBar/SearchBar";
import ActionBar from "../ActionBar/ActionBar";
import CardList from "../CardList/CardList";
import "./home.css";

const labels = {
  loading: "Loading...",
  noUsersFound: "No users found",
  rateLimitExceeded: "Rate limit exceeded... Please try again later.",
  error: "Error: ",
};

const Home = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const { data, loading, error } = useFetch<IGetUsersResponse | null>(
    () => fetchUsers(query),
    [query]
  );

  const isRateLimitError =
    error &&
    (error.includes("403") || error.toLowerCase().includes("rate limit"));

  useEffect(() => {
    setSelectedUsers([]);
    setIsEditing(false);
    if (data) setUsers(data.items);
    else setUsers([]);
  }, [data]);

  return (
    <section>
      <SearchBar query={query} setQuery={setQuery} />
      {!error && query.length > 0 && !loading && (
        <ActionBar
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          users={users}
          setUsers={setUsers}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
      {loading && <p>{labels.loading}</p>}
      {isRateLimitError ? (
        <p className="error">{labels.rateLimitExceeded}</p>
      ) : (
        error && (
          <p className="error">
            {labels.error}: {error}
          </p>
        )
      )}
      {users && users.length > 0 && !loading ? (
        <div className="cardListContainer">
          <CardList
            users={users}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            isEditing={isEditing}
          />
        </div>
      ) : (
        query.length > 0 && !error && !loading && <p>{labels.noUsersFound}</p>
      )}
    </section>
  );
};

export default Home;
