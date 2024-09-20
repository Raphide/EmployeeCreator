import React from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  onSearch: (term: FormDataEntryValue | null) => unknown;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();
    const form = e.target;
    const term = new FormData(form).get("search");
    onSearch(term);
  };
  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input type="text" placeholder="Search" name="search" />
      <button>Search</button>
    </form>
  );
};

export default SearchBar;
