import { shortStringDate } from "../../../Utils/utils";
import DeleteComment from "../Buttons/DeleteComment";
import {
  commentCard,
  commentCard__header,
  commentCard__body,
  commentCard__footer,
} from "./CommentCard.module.css";
import AddVote from "../Buttons/AddVote";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";

export default function CommentCard({
  comment,
  setArticleComments,
  setUserPageComments,
}) {
  const date = shortStringDate(comment.created_at);
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className={commentCard}>
      <div className={commentCard__header}>
        {setArticleComments ? <p>{comment.author}</p> : null}
        <p>{date}</p>
      </div>
      <div className={commentCard__body}>
        <p>{comment.body}</p>
      </div>
      <div className={commentCard__footer}>
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
