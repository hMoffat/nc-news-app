import { useState } from "react";
import { addVotesByArticleId, addVotesByCommentId } from "../../api/api";
import "./Buttons.css";
import { SlLike, SlDislike } from "react-icons/sl";

export default function AddArticleVote({
  currentVotes,
  article_id,
  comment_id,
}) {
  const [votes, setVotes] = useState(currentVotes);
  const [serverErr, setServerErr] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleVotes = (num) => {
    setIsDisabled(true);
    if (!serverErr) {
      setVotes(votes + num);

      if (article_id) {
        addVotesByArticleId(article_id, num)
          .then((response) => {
            setIsDisabled(false);
          })
          .catch((err) => {
            setVotes(votes - num);

            setServerErr(true);
          });
      }
      if (comment_id) {
        addVotesByCommentId(comment_id, num)
          .then((response) => {
            console.log(response);
            setIsDisabled(false);
          })
          .catch((err) => {
            setVotes(votes - num);
            setServerErr(true);
          });
      }
    }
  };
  return (
    <div className="add-vote">
      <p>{votes}</p>

      <button
        onClick={() => {
          handleVotes(1);
        }}
        disabled={isDisabled}
        aria-label="Like"
        className={isDisabled ? "true" : "false"}
      >
        <SlLike className="add-vote-svg dislike" />
      </button>
      <button
        onClick={() => {
          handleVotes(-1);
        }}
        disabled={isDisabled}
        aria-label="Dislike"
        className={isDisabled ? "true" : "false"}
      >
        <SlDislike className="add-vote-svg dislike" />
      </button>
      {serverErr ? <p>Sorry, something went wrong!</p> : null}
    </div>
  );
}
