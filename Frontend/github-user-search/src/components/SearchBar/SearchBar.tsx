import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useDebounce from "../../hooks/useDebounce/useDebounce";
import "./search-bar.css";

interface ISearchBarProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const labels = {
  search: "Search",
};

const SearchBar = ({ query, setQuery }: ISearchBarProps) => {
  const [search, setSearch] = useState(query);
  // Custom hook to wait 500ms before updating the query
  const debouncedValue = useDebounce(search);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Update the query when get the debounced value
  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue, setQuery]);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  return (
    <input
      type="text"
      className="search-bar"
      placeholder={labels.search}
      onChange={handleChangeInput}
      value={search}
    />
  );
};

export default SearchBar;
