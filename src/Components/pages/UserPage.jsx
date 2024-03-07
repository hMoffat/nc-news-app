import UserContext from "../UserContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../Cards/UserCard";
import CommentsManager from "../Managers/CommentsManager";
import "./UserPage.css";
import { fetchUserByUsername, fetchUserComments } from "../../api/api";
import ErrorPage from "./ErrorPage";

export default function UserPage() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { username } = useParams();
  const isLoggedInUser = loggedInUser.username === username;
  const [displayedUser, setDisplayedUser] = useState({});
  const [userPageComments, setUserPageComments] = useState([]);
  const [commentsAreLoading, setCommentsAreLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchUserByUsername(username)
      .then((results) => {
        setDisplayedUser({ ...results.data.user });
        return fetchUserComments(username);
      })
      .then((response) => {
        const fetchedComments = response.data.userComments;
        setUserPageComments(fetchedComments);
        setCommentsAreLoading(false);
      })
      .catch((error) => {
        setErr(error);
      });
  }, [username]);

  if (err) {
    return <ErrorPage />;
  }

  return (
    <div className="user-page page layout">
      <div className="user-card">
        <UserCard
          user={username}
          avatar={displayedUser.avatar_url}
          name={displayedUser.name}
        />
      </div>
      <>
        {commentsAreLoading ? (
          <p>Loading...</p>
        ) : (
          <CommentsManager
            userPageComments={userPageComments}
            setUserPageComments={setUserPageComments}
          />
        )}
      </>
    </div>
  );
}
