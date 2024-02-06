import { useEffect, useState } from "react";
import ArticleCard from "../Cards/ArticleCard";
import { fetchArticles } from "../../api/api";
import { Link } from "react-router-dom";

export default function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchArticles().then((response) => {
      setArticles(response.data.articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="articles">
      <ul>
        {isLoading ? (
          <li>
            <p>Loading...</p>
          </li>
        ) : (
          articles.map((article) => {
            return (
              <li key={article.article_id}>
                <Link
                  to={`/topics/${article.topic}/${article.title}`}
                  state={article.article_id}
                >
                  <ArticleCard article={article} />
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
