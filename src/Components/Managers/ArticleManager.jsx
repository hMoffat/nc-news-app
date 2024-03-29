import { useEffect, useState } from "react";
import ArticleCard from "../Cards/ArticleCard";
import { fetchArticles } from "../../api/api";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import {
  articleManager,
  articleManager__li,
  articleManager__loading,
} from "./ArticleManager.module.css";

export default function ArticleManager({ isLoading, setIsLoading }) {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort_byQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetchArticles(topic, sort_byQuery, orderQuery)
      .then((response) => {
        const fetchedArticles = response.data.articles;
        const articlesCopy = [...fetchedArticles];

        if (sort_byQuery === "comment_count") {
          const articlesCopyCounts = articlesCopy.map((article) => {
            return article.comment_count;
          });
          const highest = Math.max(...articlesCopyCounts);
          if (articlesCopy[0] === highest) {
            articlesCopy.sort((a, b) => {
              return a.comment_count - b.comment_count;
            });
          }
        }

        setArticles(articlesCopy);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log("fetch articles err: ", error);
        setErr(error);
      });
  }, [topic, sort_byQuery, orderQuery]);

  if (err) {
    return (
      <ErrorPage
        message={err.response.data.message}
        status={err.response.status}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <div className={articleManager}>
          <p className={articleManager__loading}>Loading...</p>
        </div>
      ) : (
        <ul className={articleManager}>
          {articles.map((article) => {
            return (
              <li key={article.article_id} className={articleManager__li}>
                <ArticleCard article={article} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
