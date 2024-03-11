import CommentCard from "../Cards/CommentCard";
import {
  commentsManager,
  article,
  user,
  commentsManager__h3,
  commentsManager__ul,
  commentsManager__li,
} from "./comments.module.css";

export default function CommentsManager({
  articleComments,
  setArticleComments,
  userPageComments,
  setUserPageComments,
}) {
  const comments = articleComments ? articleComments : userPageComments;

  return (
    <div
      className={
        articleComments
          ? `${article} ${commentsManager}`
          : `${user} ${commentsManager}`
      }
    >
      <h3 className={commentsManager__h3}>Comments</h3>
      <ul className={commentsManager__ul}>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className={commentsManager__li}>
              <CommentCard
                comment={comment}
                setArticleComments={setArticleComments}
                setUserPageComments={setUserPageComments}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
