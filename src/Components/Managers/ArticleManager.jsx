import { useEffect, useState } from "react";
import ArticleCard from "../Cards/ArticleCard";
import { fetchArticles } from "../../api/api";
import { useParams } from "react-router-dom";

export default function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    fetchArticles(topic)
      .then((response) => {
        setArticles(response.data.articles);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log("fetch articles err: ", err);
      });
  }, [topic]);

  return (
    <>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="articles">
          <ul>
            {articles.map((article) => {
              return (
                <li key={article.article_id}>
                  <ArticleCard article={article} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
