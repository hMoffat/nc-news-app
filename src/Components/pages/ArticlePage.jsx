import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId } from "../../api/api";
import ArticleCard from "../Cards/ArticleCard";
import "./ArticlePage.css";
import AddComment from "../Forms/AddComment";
import CommentsManager from "../Managers/CommentsManager";

export default function ArticlePage() {
  const [article, setArticle] = useState({});
  const { state } = useLocation();
  const [articleIsLoading, setArticleIsLoading] = useState(true);
  const [commentsAreLoading, setCommentsAreLoading] = useState(true);
  const [articleComments, setArticleComments] = useState([]);

  useEffect(() => {
    fetchArticleById(state).then((response) => {
      setArticle(response.data.article);
      setArticleIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchCommentsByArticleId(state).then((response) => {
      setArticleComments(response.data.comments);
      setCommentsAreLoading(false);
    });
  }, []);

  return (
    <div className="article-page page layout">
      {articleIsLoading ? (
        <p className="article">Loading...</p>
      ) : (
        <>
          <ArticleCard article={article} />
          {commentsAreLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <AddComment setArticleComments={setArticleComments} />
              <CommentsManager
                articleComments={articleComments}
                setArticleComments={setArticleComments}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
