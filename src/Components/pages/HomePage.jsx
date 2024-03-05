import { useEffect } from "react";
import ArticleManager from "../Managers/ArticleManager";
import FilterManager from "../Managers/FilterManager/FilterManager";
import "../pages/HomePage.css";
import { useParams } from "react-router-dom";

export default function HomePage({
  topics,
  setTopics,
  searchesDisabled,
  isLoading,
  setIsLoading,
  filter,
}) {
  const { topic } = useParams();
  const topicObj = topics.find((aTopic) => aTopic.slug === topic);
  const topicObjCopy = { ...topicObj };

  return (
    <div className="home-page page layout">
      {filter && (
        <FilterManager
          className="filter"
          topics={topics}
          setTopics={setTopics}
          searchesDisabled={searchesDisabled}
        />
      )}
      <div className="articles">
        {!topic ? null : !topicObj ? (
          <p>Loading {topic}...</p>
        ) : (
          <div className="topic-header">
            <h1>{topic}</h1>
            <h2>{topicObjCopy.description}</h2>
          </div>
        )}
        <ArticleManager
          className="articles"
          topic={topic}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
