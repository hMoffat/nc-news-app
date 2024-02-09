import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useSearchParams } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/pages/HomePage";
import ArticlePage from "./Components/pages/ArticlePage";
import TopicPage from "./Components/pages/TopicPage";
import UserPage from "./Components/pages/UserPage";
import UserContext from "./Components/UserContext";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "happyamy2016",
    name: "Amy Happy",
    avatar_url:
      "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
    comments: [],
  });
  const [topics, setTopics] = useState([]);
  const [searchesDisabled, setSearchesDisabled] = useState({
    selectSort: false,
    order: false,
  });

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
    <div className="app layout">
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <NavBar className="nav-bar" />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                className="home-page page"
                topics={topics}
                setTopics={setTopics}
                searchesDisabled={searchesDisabled}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/topics/:topic/:article_title"
            element={<ArticlePage className="article-page page" />}
          />
          <Route
            path="/topics/:topic"
            element={
              <TopicPage
                className="topic-page page"
                topics={topics}
                setTopics={setTopics}
                searchesDisabled={searchesDisabled}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/users/:username"
            element={<UserPage className="user-page page" />}
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
