import { useParams } from "react-router-dom";
import ArticleManager from "../Managers/ArticleManager";
import FilterManager from "../Managers/FilterManager/FilterManager";

export default function TopicPage({
  topics,
  setTopics,
  searchesDisabled,
  setIsLoading,
  isLoading,
}) {
  const { topic } = useParams();
  const topicObj = topics.find((aTopic) => aTopic.slug === topic);
  const topicObjCopy = { ...topicObj };

  return (
    <div className="topic-page page layout">
      <FilterManager
        className="filter"
        topics={topics}
        setTopics={setTopics}
        searchesDisabled={searchesDisabled}
      />
      {!topicObj ? (
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
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </div>
  );
}
