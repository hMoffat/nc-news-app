import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId } from "../../api/api";
import ArticleCard from "../Cards/ArticleCard";
import "./ArticlePage.css";
import AddComment from "../Forms/AddComment";
import CommentsManager from "../Managers/CommentsManager";
import UserContext from "../UserContext";

export default function ArticlePage() {
  const [article, setArticle] = useState({});
  const { state } = useLocation();
  const [articleIsLoading, setArticleIsLoading] = useState(true);
  const [commentsAreLoading, setCommentsAreLoading] = useState(true);
  const [articleComments, setArticleComments] = useState([]);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

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

      const userComments = response.data.comments.filter(
        (comment) => comment.author === loggedInUser.username
      );

      setLoggedInUser((currVal) => {
        const copy = { ...currVal };
        copy.comments = userComments;
        return copy;
      });
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
