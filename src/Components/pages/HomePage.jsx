import { app__page } from "./page.module.css";
import { useState } from "react";
import ArticleManager from "../Managers/ArticleManager";
import FilterManager from "../Managers/FilterManager/FilterManager";
import {
  homePage,
  homePage__articlesArea,
  articles__topicHeader,
  articles,
} from "../pages/HomePage.module.css";
import { useParams } from "react-router-dom";

export default function HomePage({
  searchesDisabled,
  isLoading,
  setIsLoading,
  filter,
}) {
  const [topics, setTopics] = useState([]);
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
      <div className={`${homePage__articlesArea} ${articles}`}>
        {!topic ? null : !topicObj ? (
          <div className={articles__topicHeader}>
            <h1>Loading {topic}...</h1>
          </div>
        ) : (
          <div className={articles__topicHeader}>
            <h1>{topic}</h1>
            <h2>{topicObjCopy.description}</h2>
          </div>
        )}
        <ArticleManager
          topic={topic}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
