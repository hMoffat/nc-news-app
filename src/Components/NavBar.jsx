import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext } from "react";
import homeSymbol from "../assets/icons8-home.svg";

export default function NavBar() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-link">
        <img src={homeSymbol} alt="Home symbol" className="home-symbol" />
        <p>Home</p>
      </Link>
      <Link to={`/users/${loggedInUser.username}`} className="nav-link">
        <img
          src={loggedInUser.avatar_url}
          alt={`${loggedInUser.username}'s avatar`}
          className="avatar"
        />
        <p>You</p>
      </Link>
    </nav>
  );
}
