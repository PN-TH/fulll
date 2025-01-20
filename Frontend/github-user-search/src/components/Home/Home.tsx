import { useEffect, useRef, useState } from "react";
import { IGetUsersResponse, IUser } from "../../interfaces/users";
import { fetchUsers } from "../../services/userService";
import { useFetch } from "../../hooks/useFetch/useFetch";
import SearchBar from "../SearchBar/SearchBar";
import ActionBar from "../ActionBar/ActionBar";
import CardList from "../CardList/CardList";
import "./home.css";
import ErrorToast from "../ErrorToast/ErrorToast";

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
  const cardListRef = useRef<HTMLDivElement>(null);

  // Custom hook to fetch data with the fetch function as a parameters
  const { data, loading, error } = useFetch<IGetUsersResponse | null>(
    () => fetchUsers(query),
    [query]
  );

  // Check if the error is a rate limit error
  const isRateLimitError =
    error &&
    (error.includes("403") || error.toLowerCase().includes("rate limit"));

  // Check if the action bar should be rendered
  const shouldRenderActionBar =
    !error && query.length > 0 && !loading && users && users.length > 0;

  useEffect(() => {
    setSelectedUsers([]);
    setIsEditing(false);
    if (data) setUsers(data.items);
    else setUsers([]);
  }, [data]);

  return (
    <section className="home">
      <SearchBar query={query} setQuery={setQuery} />
      {shouldRenderActionBar && (
        <ActionBar
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          users={users}
          setUsers={setUsers}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          cardListRef={cardListRef}
        />
      )}
      {loading && <p>{labels.loading}</p>}
      {isRateLimitError ? (
        <ErrorToast message={labels.rateLimitExceeded} />
      ) : (
        error && <ErrorToast message={`${labels.error} ${error}`} />
      )}
      {users && users.length > 0 && !loading ? (
        <div className="cardListContainer">
          <CardList
            users={users}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            isEditing={isEditing}
            cardListRef={cardListRef}
          />
        </div>
      ) : (
        query.length > 0 && !error && !loading && <p>{labels.noUsersFound}</p>
      )}
    </section>
  );
};

export default Home;
