import { deleteComment } from "../../api/api";
import UserContext from "../UserContext";
import { useContext, useState } from "react";

export default function DeleteComment({ setArticleComments, comment_id }) {
  const { setLoggedInUser } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [deleteing, setDeleteing] = useState(false);

  const handleDelete = (event) => {
    setIsDisabled(true);
    setDeleteing(true);
    setLoggedInUser((currVal) => {
      const copy = { ...currVal };

      const commentsCopy = copy.comments;
      const filteredComments = commentsCopy.filter(
        (comment) => comment_id !== comment.comment_id
      );
      copy.comments = filteredComments;
      return copy;
    });
    deleteComment(comment_id).then((response) => {
      if (setArticleComments) {
        setArticleComments((currVal) => {
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
