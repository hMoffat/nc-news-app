import UserContext from "../Context/UserContext";
import { useContext, useState } from "react";
import { addComment } from "../../api/api";
import "./AddComment.css";

export default function AddComment({ setArticleComments, article_id }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState({
    username: loggedInUser.username,
    body: "",
  });
  const [err, setErr] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [posting, setPosting] = useState(false);
  const [noBody, setNoBody] = useState(false);

  const handleChange = (event) => {
    setCommentInput((currVal) => {
      const copy = { ...currVal };
      copy.body = event.target.value;
      return copy;
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (commentInput.body === "") {
      setIsDisabled(false);
      setNoBody(true);
    } else {
      setNoBody(false);

      setIsDisabled(true);
      setPosting(true);

      addComment(article_id, commentInput)
        .then((response) => {
          const postedComment = response.data.postedComment;

          setCommentInput((currVal) => {
            const copy = { ...currVal };
            copy.body = "";
            return copy;
          });

          setArticleComments((currVal) => {
            const copy = [...currVal, postedComment];
            return copy;
          });

          setIsDisabled(false);
          setPosting(false);
        })
        .catch((error) => {
          console.log("add comment err: ", error);
          setErr(err);
          console.log(err);
        });
    }
  };

  return (
    <div className="add-comment">
      {noBody && <p>You need to write a comment to post something...</p>}
      {err && !noBody ? (
        <p>Sorry, we couldn't post your comment... </p>
      ) : posting ? (
        <p>Posting your comment...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="body">Add a Comment</label>
          <textarea
            value={commentInput.body}
            onChange={handleChange}
            rows={4}
            cols={40}
          />
          <button type="submit" disabled={isDisabled}>
            Add comment
          </button>
        </form>
      )}
    </div>
  );
}
