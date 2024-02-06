import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchArticleById } from "../../api/api";
import ArticleCard from "../Cards/ArticleCard";
import "./ArticlePage.css";
import AddComment from "../Forms/AddComment";
import CommentsManager from "../Managers/CommentsManager";

export default function ArticlePage() {
  const [article, setArticle] = useState({});
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticleById(state).then((response) => {
      setArticle(response.data.article);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="article-page page layout">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ArticleCard article={article} />
          <AddComment />
          <CommentsManager />
        </>
      )}
    </div>
  );
}
