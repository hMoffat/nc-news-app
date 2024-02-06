import ArticleManager from "../Managers/ArticleManager";
import FilterManager from "../Managers/FilterManager/FilterManager";
import "../pages/HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page page layout">
      <FilterManager className="filter" />
      <ArticleManager className="articles" />
    </div>
  );
}
