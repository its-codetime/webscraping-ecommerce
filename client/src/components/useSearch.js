import { useState, useEffect } from "react";
import axios from "axios";

const useSearch = (searchTerm) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const updatePage = (pageNo) => {
    setPage(pageNo);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (searchTerm === "") {
          setIsLoading(false);
          setError("Please enter a search term");
          return;
        }
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL + "/search",
          {
            params: {
              search: searchTerm,
              page: page,
              limit: 10,
            },
          }
        );
        setItems(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [searchTerm, page]);

  return [items, isLoading, error, totalPages, updatePage];
};

export default useSearch;
