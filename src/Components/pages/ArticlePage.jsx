import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId } from "../../api/api";
import ArticleCard from "../Cards/ArticleCard";
import "./ArticlePage.css";
import AddComment from "../Forms/AddComment";
import CommentsManager from "../Managers/CommentsManager";
import ErrorPage from "./ErrorPage";

export default function ArticlePage() {
  const [article, setArticle] = useState({});
  const { state } = useLocation();
  const [articleIsLoading, setArticleIsLoading] = useState(true);
  const [commentsAreLoading, setCommentsAreLoading] = useState(true);
  const [articleComments, setArticleComments] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchArticleById(state).then((response) => {
      setArticle(response.data.article);
      setArticleIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchCommentsByArticleId(state)
      .then((response) => {
        setArticleComments(response.data.comments);
        setCommentsAreLoading(false);
      })
      .catch((error) => {
        setErr(error);
      });
  }, []);

  if (err) {
    return (
      <ErrorPage
        message={"This doesn't article doesn't exist..."}
        status={404}
        className="error-page"
      />
    );
  }

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
              <AddComment
                setArticleComments={setArticleComments}
                article_id={article.article_id}
              />
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
