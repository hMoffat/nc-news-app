import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext, useEffect, useState } from "react";
import homeSymbol from "../assets/icons8-home.svg";

export default function NavBar({ setFilter, filter }) {
  const { loggedInUser } = useContext(UserContext);
  const [topicPage, setTopicPage] = useState();
  const location = useLocation();
  const [width, setWidth] = useState(
    window.innerWidth > 480 ? "desktop" : "mob"
  );

  useEffect(() => {
    if (location.pathname.includes("topics")) {
      const locationCopy = location.pathname;
      const locArr = locationCopy.split("/");
      setTopicPage(locArr[2]);
      console.log(topicPage);
    } else {
      setTopicPage(null);
    }
  }, [location]);

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
      <NavLink to="/" className="nav-link">
        {width === "mob" ? (
          <img src={homeSymbol} alt="Home symbol" className="home-symbol" />
        ) : null}
        <p>Home</p>
      </NavLink>
      <NavLink to={`/users/${loggedInUser.username}`} className="nav-link">
        <img
          src={loggedInUser.avatar_url}
          alt={`${loggedInUser.username}'s avatar`}
          className="avatar"
        />
        <p>{width === "mob" ? `You` : loggedInUser.username}</p>
      </NavLink>
      {topicPage && width === "desktop" && (
        <NavLink to={`/topics/${topicPage}`} className="nav-link">
          <p>{topicPage}</p>
        </NavLink>
      )}
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
