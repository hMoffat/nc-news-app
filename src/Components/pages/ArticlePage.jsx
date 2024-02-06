import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId } from "../../api/api";
import ArticleCard from "../Cards/ArticleCard";
import "./ArticlePage.css";
import AddComment from "../Forms/AddComment";
import CommentsManager from "../Managers/CommentsManager";

export default function ArticlePage() {
  const [article, setArticle] = useState({});
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState({
    articles: true,
    comments: true,
  });
  const [articleComments, setArticleComments] = useState([]);

  useEffect(() => {
    fetchArticleById(state).then((response) => {
      setArticle(response.data.article);
      setIsLoading((currVal) => {
        const copy = { ...currVal };
        copy.articles = false;
      });
    });
  }, []);

  useEffect(() => {
    fetchCommentsByArticleId(state).then((response) => {
      setArticleComments(response.data.comments);
      setIsLoading({ ...isLoading, comments: false });
    });
  }, []);

  return (
    <div className="article-page page layout">
      {isLoading ? (
        <p className="article">Loading...</p>
      ) : (
        <>
          <ArticleCard article={article} />
          <AddComment setArticleComments={setArticleComments} />
          <CommentsManager
            articleComments={articleComments}
            setArticleComments={setArticleComments}
          />
        </>
      )}
    </div>
  );
}
