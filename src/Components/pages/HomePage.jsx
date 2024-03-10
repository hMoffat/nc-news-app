import { app__page } from "./page.module.css";
import { useEffect } from "react";
import ArticleManager from "../Managers/ArticleManager";
import FilterManager from "../Managers/FilterManager/FilterManager";
import { homePage, homePage__articlesArea } from "../pages/HomePage.module.css";
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
    <div className={`${app__page} ${homePage}`}>
      {filter && (
        <FilterManager
          topics={topics}
          setTopics={setTopics}
          searchesDisabled={searchesDisabled}
        />
      )}
      <div className={`${homePage__articlesArea}`}>
        {!topic ? null : !topicObj ? (
          <p>Loading {topic}...</p>
        ) : (
          <div className="topic-header">
            <h1>{topic}</h1>
            <h2>{topicObjCopy.description}</h2>
          </div>
        )}
        <ArticleManager
          className="article-manager"
          topic={topic}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
