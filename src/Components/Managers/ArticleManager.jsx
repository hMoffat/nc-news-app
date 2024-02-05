import { useEffect, useState } from "react";
import ArticleCard from "../Cards/ArticleCard";
import { fetchArticles } from "../../api/api";

export default function ArticleManager() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log("active!");
    fetchArticles()
      .then((response) => {
        console.log("active");
        setArticles(response.data.articles);
      })
      .catch((err) => {
        console.log("article manager fetch articles err: ", err);
      });
  }, []);

  console.log(articles);

  return (
    <>
      <h2>ArticleManager Component Placeholder</h2>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
