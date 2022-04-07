import SearchResults from "./components/SearchResults";
import SearchForm from "./components/SearchForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  const updateSearchTerm = (searchTerm) => {
    setSearch(searchTerm);
  };

  return (
    <div className="App">
      <Box
        sx={{
          padding: "2em",
        }}
      >
        <Typography align="center" variant="h3" component="h1">
          Smartphone Scraper
        </Typography>
      </Box>
      <SearchForm updateSearchTerm={updateSearchTerm} />
      <SearchResults searchTerm={search} />
    </div>
  );
}

export default App;
