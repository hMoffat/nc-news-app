import ArticleManager from "../Managers/ArticleManager";
import FilterManager from "../Managers/FilterManager/FilterManager";
import "../pages/HomePage.css";

export default function HomePage({
  topics,
  setTopics,
  searchesDisabled,
  isLoading,
  setIsLoading,
}) {
  return (
    <div className="home-page page layout">
      <FilterManager
        className="filter"
        topics={topics}
        setTopics={setTopics}
        searchesDisabled={searchesDisabled}
      />
      <ArticleManager
        className="articles"
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
