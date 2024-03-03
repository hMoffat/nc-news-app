import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext, useEffect, useState } from "react";
import homeSymbol from "../assets/icons8-home.svg";

export default function NavBar({ setFilter, filter }) {
  const { loggedInUser } = useContext(UserContext);
  const [width, setWidth] = useState(
    window.innerWidth > 480 ? "desktop" : "mob"
  );

  useEffect(() => {
    const handleWidth = () => {
      const oldSize = width;
      setWidth(window.innerWidth > 480 ? "desktop" : "mob");
      if (window.innerWidth <= 480) setFilter(true);
      if (window.innerWidth > 480 && oldSize !== "desktop") {
        setFilter(false);
      }
    };
    window.addEventListener("resize", handleWidth);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  // const toggleFilter = () => {
  //   setFilter(filter ? false : true)
  // }

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
      {width === "desktop" && (
        <button
          onClick={() => {
            setFilter(!filter);
          }}
        >
          {filter ? `Hide` : `Show`} article filter options
        </button>
      )}
    </nav>
  );
}
