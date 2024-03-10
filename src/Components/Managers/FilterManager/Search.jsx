import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import {
  filterSearch,
  filterSearch__label,
  searchOrder,
  searchOrder__button,
  searchSortBy,
  searchSortBy__select,
  searchSortBy__option,
} from "./search.module.css";

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
    <div className={filterSearch}>
      <div className={searchOrder}>
        <label htmlFor="order" className={filterSearch__label}>
          Sort order: {order === "asc" ? "Ascending" : "Descending"}
        </label>
        <button
          id="order"
          type="button"
          onClick={handleSearchOrderClick}
          value={order}
          disabled={searchesDisabled.order}
          className={searchOrder__button}
        >
          {order === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>
      <div className={searchSortBy}>
        <label htmlFor="sort_by" className={filterSearch__label}>
          Sort by...
        </label>
        <select
          id="sort_by"
          value={sort_by}
          onChange={handleSortOptionChange}
          disabled={searchesDisabled.selectSort}
          className={searchSortBy__select}
        >
          <option
            value="Select..."
            key="select"
            className={searchSortBy__option}
          >
            Select...
          </option>
          <option
            value="created_at"
            key="created_at"
            className={searchSortBy__option}
          >
            Date
          </option>
          <option
            value="comment_count"
            key="comment_count"
            className={searchSortBy__option}
          >
            Number of Comments
          </option>
          <option value="votes" key="votes" className={searchSortBy__option}>
            Votes
          </option>
        </select>
      </div>
    </div>
  );
}
