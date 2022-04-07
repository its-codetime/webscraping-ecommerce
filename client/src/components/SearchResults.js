import React from "react";
import ItemList from "./ItemList";
import useSearch from "./useSearch";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SearchResults = ({ searchTerm }) => {
  const [items, isLoading, error, totalPages, updatePage] =
    useSearch(searchTerm);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {items.length > 0 && searchTerm !== "" ? <ItemList items={items} /> : ""}

      <div className="page-nav">
        <Stack spacing={2}>
          <Pagination
            onChange={(event, value) => {
              updatePage(value);
            }}
            count={totalPages}
            renderItem={(item) => (
              <PaginationItem
                components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </div>
    </div>
  );
};

export default SearchResults;
