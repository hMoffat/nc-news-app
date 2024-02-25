import { deleteComment } from "../../api/api";
import { useState } from "react";

export default function DeleteComment({ setComments, comment_id }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [deleteing, setDeleteing] = useState(false);

  const handleDelete = (event) => {
    setIsDisabled(true);
    setDeleteing(true);
    deleteComment(comment_id).then((response) => {
      if (setComments) {
        setComments((currVal) => {
          const copy = [...currVal];
          const filteredCopy = copy.filter(
            (comment) => comment_id !== comment.comment_id
          );
          return filteredCopy;
        });
      }
      setIsDisabled(false);
      setDeleteing(false);
    });
  };

  return (
    <>
      {deleteing ? (
        <button onClick={handleDelete} disabled={isDisabled}>
          Deleteing...
        </button>
      ) : (
        <button onClick={handleDelete} disabled={isDisabled}>
          Delete Comment
        </button>
      )}
    </>
  );
}
