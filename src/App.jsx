import { useState } from "react";
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
  });

  return (
    <>
      <h1>App component</h1>
      <UserContext.Provider value={{ loggedInUser }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/topics/:topic/:article_title"
            element={<ArticlePage />}
          />
          <Route path="/topics/:topic" element={<TopicPage />} />
          <Route path="/:user_name" element={<UserPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
