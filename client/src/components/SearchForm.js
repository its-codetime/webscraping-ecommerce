import { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const SearchForm = ({ updateSearchTerm }) => {
  const [search, setSearch] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSearchTerm(search);
    setSearch("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        fullWidth
        label="phone brand name or model"
        id="fullWidth"
        value={search}
      />
      <IconButton type="submit" aria-label="delete" size="large">
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </form>
  );
};

export default SearchForm;
