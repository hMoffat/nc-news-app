import { deleteComment } from "../../api/api";
import UserContext from "../UserContext";
import { useContext } from "react";

export default function DeleteComment({ setArticleComments, comment_id }) {
  const { setLoggedInUser } = useContext(UserContext);

  const handleDelete = (event) => {
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
    });
  };

  return <button onClick={handleDelete}>Delete Comment</button>;
}
