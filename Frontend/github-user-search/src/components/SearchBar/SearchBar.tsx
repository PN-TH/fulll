import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const debouncedValue = useDebounce(search);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
