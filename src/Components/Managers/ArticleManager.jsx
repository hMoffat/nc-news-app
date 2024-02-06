import { useEffect, useState } from "react";
import ArticleCard from "../Cards/ArticleCard";
import { fetchArticles } from "../../api/api";

export default function ArticleManager() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((err) => {
        console.log("article manager fetch articles err: ", err);
      });
  }, []);

  return (
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
  );
}
