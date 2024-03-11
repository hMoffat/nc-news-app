import { app } from "./app.module.css";
import { useEffect, useState } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/pages/HomePage";
import ArticlePage from "./Components/pages/ArticlePage";
import UserPage from "./Components/pages/UserPage";
import UserContext from "./Context/UserContext";
import ErrorPage from "./Components/pages/ErrorPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "happyamy2016",
    name: "Amy Happy",
    avatar_url:
      "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
  });

  const [searchesDisabled, setSearchesDisabled] = useState({
    selectSort: false,
    order: false,
  });
  const [filter, setFilter] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const sortQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  useEffect(() => {
    if (isLoading) {
      setSearchesDisabled((currVal) => {
        const copy = { ...currVal };
        currVal.order = true;
        currVal.selectSort = true;
        return copy;
      });
    } else {
      setSearchesDisabled((currVal) => {
        const copy = { ...currVal };
        currVal.order = false;
        currVal.selectSort = false;
        return copy;
      });
    }
  }, [sortQuery, orderQuery, isLoading]);

  return (
    <div className={app}>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <NavBar setFilter={setFilter} filter={filter} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                searchesDisabled={searchesDisabled}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                filter={filter}
              />
            }
          />
          <Route
            path="/topics/:topic/:article_title"
            element={<ArticlePage />}
          />
          <Route
            path="/topics/:topic"
            element={
              <HomePage
                searchesDisabled={searchesDisabled}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                filter={filter}
              />
            }
          />
          <Route path="/users/:username" element={<UserPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
