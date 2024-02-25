import UserContext from "../UserContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../Cards/UserCard";
import CommentsManager from "../Managers/CommentsManager";
import "./UserPage.css";
import { fetchUserByUsername } from "../../api/api";

export default function UserPage() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { username } = useParams();
  const isLoggedInUser = loggedInUser.username === username;
  const [pageUser, setPageUser] = useState({});

  useEffect(() => {
    fetchUserByUsername(username).then((results) => {
      setPageUser({ ...results.data.user });
    });
  }, []);

  return (
    <div className="user-page page layout">
      {isLoggedInUser ? (
        <>
          <div className="user-card">
            <UserCard
              user={username}
              avatar={loggedInUser.avatar_url}
              name={loggedInUser.name}
            />
          </div>
          <div className="comments">
            <CommentsManager />
          </div>
        </>
      ) : (
        <>
          <div className="user-card">
            <UserCard
              user={username}
              avatar={pageUser.avatar_url}
              name={pageUser.name}
            />
          </div>
          <div className="comments">
            <CommentsManager />
          </div>
        </>
      )}
    </div>
  );
}
