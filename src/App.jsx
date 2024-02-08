import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
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
              />
            }
          />
          <Route
            path="/:username"
            element={<UserPage className="user-page page" />}
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
