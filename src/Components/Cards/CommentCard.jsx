import { shortStringDate } from "../../../Utils/utils";
import DeleteComment from "../Buttons/DeleteComment";
import "./CommentCard.css";

export default function CommentCard({ comment, setArticleComments }) {
  const date = shortStringDate(comment.created_at);

  return (
    <div className="comment-card">
      <div className="card-header">
        <p>{comment.author}</p>
        <p>{date}</p>
      </div>
      <div className="card-body">
        <p>{comment.body}</p>
      </div>
      <div className="comment card-footer">
        <DeleteComment setArticleComments={setArticleComments} />
      </div>
    </div>
  );
}
