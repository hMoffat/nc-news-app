import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";

export default function Search({ searchesDisabled }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderQuery = searchParams.get("order");
  const sort_byQuery = searchParams.get("sort_by");
  const [order, setOrder] = useState(orderQuery === "asc" ? "desc" : "asc");
  const [sort_by, setSort_by] = useState(
    sort_byQuery ? sort_byQuery : "Select..."
  );
  const { topic } = useParams();

  useEffect(() => {
    setSort_by("Sort by ...");
    setOrder("asc");
  }, [topic]);

  const handleSortOptionChange = (event) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("sort_by", event.target.value);

    setSearchParams(newParams);
    setSort_by(event.target.value);
  };

  const handleSearchOrderClick = (event) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("order", order === "asc" ? "desc" : "asc");
    setOrder((order) => {
      return order === "asc" ? "desc" : "asc";
    });
    setSearchParams(newParams);
  };

  return (
    <div className="search">
      <div className="search-order">
        <label htmlFor="order">
          Sort order: {order === "asc" ? "Ascending" : "Descending"}
        </label>
        <button
          id="order"
          type="button"
          onClick={handleSearchOrderClick}
          value={order}
          disabled={searchesDisabled.order}
        >
          {order === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>
      <div className="search-sort_by">
        <label htmlFor="sort_by">Sort by...</label>
        <select
          id="sort_by"
          value={sort_by}
          onChange={handleSortOptionChange}
          disabled={searchesDisabled.selectSort}
        >
          <option value="Select..." key="select">
            Select...
          </option>
          <option value="created_at" key="created_at">
            Date
          </option>
          <option value="comment_count" key="comment_count">
            Number of Comments
          </option>
          <option value="votes" key="votes">
            Votes
          </option>
        </select>
      </div>
    </div>
  );
}
