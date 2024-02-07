import { useEffect, useState } from "react";
import ArticleCard from "../Cards/ArticleCard";
import { fetchArticles } from "../../api/api";
import { Link } from "react-router-dom";

export default function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((response) => {
        setArticles(response.data.articles);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log("fetch articles err: ", err);
      });
  }, []);

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
