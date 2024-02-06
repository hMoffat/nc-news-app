import CommentCard from "../Cards/CommentCard";

export default function CommentsManager({
  articleComments,
  setArticleComments,
}) {
  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul>
        {articleComments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <CommentCard
                comment={comment}
                setArticleComments={setArticleComments}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
