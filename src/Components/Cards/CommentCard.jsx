import { shortStringDate } from "../../../Utils/utils";
import DeleteComment from "../Buttons/DeleteComment";
import "./CommentCard.css";
import AddVote from "../Buttons/AddVote";
import { useContext } from "react";
import UserContext from "../UserContext";

export default function CommentCard({
  comment,
  setArticleComments,
  setUserPageComments,
}) {
  const date = shortStringDate(comment.created_at);
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="comment-card">
      <div className="card-header">
        {setArticleComments ? <p>{comment.author}</p> : null}
        <p>{date}</p>
      </div>
      <div className="card-body">
        <p>{comment.body}</p>
      </div>
      <div className="comment card-footer">
        {setArticleComments ? (
          <AddVote
            currentVotes={comment.votes}
            comment_id={comment.comment_id}
          />
        ) : null}
        {comment.author === loggedInUser.username ? (
          <DeleteComment
            setComments={
              setArticleComments ? setArticleComments : setUserPageComments
            }
            comment_id={comment.comment_id}
          />
        ) : null}
      </div>
    </div>
  );
}
