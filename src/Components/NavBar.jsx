import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext } from "react";

export default function NavBar() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to={`/${loggedInUser.username}`} className="nav-link">
        <img
          src={loggedInUser.avatar_url}
          alt={`${loggedInUser.username}'s avatar`}
          className="avatar"
        />
        <p>{loggedInUser.username}</p>
      </Link>
    </nav>
  );
}
