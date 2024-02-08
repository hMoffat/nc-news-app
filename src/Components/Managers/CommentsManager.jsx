import CommentCard from "../Cards/CommentCard";
import UserContext from "../UserContext";
import { useContext } from "react";

export default function CommentsManager({
  articleComments,
  setArticleComments,
}) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const comments = articleComments ? articleComments : loggedInUser.comments;
  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul>
        {comments ? (
          comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <CommentCard
                  comment={comment}
                  setArticleComments={setArticleComments}
                />
              </li>
            );
          })
        ) : (
          <p>Sorry, something went wrong....</p>
        )}
      </ul>
    </div>
  );
}
