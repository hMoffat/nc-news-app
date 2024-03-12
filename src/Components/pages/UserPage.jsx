import { app__page } from "./page.module.css";
import UserContext from "../../Context/UserContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../Cards/UserCard";
import CommentsManager from "../Managers/CommentsManager";
import { userPage, userPage__loading } from "./UserPage.module.css";
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
    setDisplayedUser(null);
    setCommentsAreLoading(true);
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
    <div className={`${app__page} ${userPage}`}>
      {!displayedUser ? (
        <p className={userPage__loading}>Loading user...</p>
      ) : (
        <UserCard
          user={username}
          avatar={displayedUser.avatar_url}
          name={displayedUser.name}
        />
      )}
      {commentsAreLoading ? (
        <p className={userPage__loading}>Loading user comments...</p>
      ) : (
        <CommentsManager
          userPageComments={userPageComments}
          setUserPageComments={setUserPageComments}
        />
      )}
    </div>
  );
}
