import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext } from "react";

export default function NavBar() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to={`/${loggedInUser.username}`}>
        <img
          src={loggedInUser.avatar_url}
          alt={`${loggedInUser.username}'s avatar`}
        />
        <p>{loggedInUser.username}</p>
      </Link>
    </nav>
  );
}
