import UserContext from "../UserContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../Cards/UserCard";
import CommentsManager from "../Managers/CommentsManager";
import "./UserPage.css";

export default function UserPage() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { username } = useParams();
  const isLoggedInUser = loggedInUser.username === username;

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
            <CommentsManager userCardComments={loggedInUser.comments} />
          </div>
        </>
      ) : (
        <p>Still building this page, sorry...</p>
      )}
    </div>
  );
}
