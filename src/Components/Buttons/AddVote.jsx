import { useState } from "react";
import { addVotesByArticleId, addVotesByCommentId } from "../../api/api";
import {
  addVote,
  addVote__svg,
  addVote__true,
  addVote__false,
} from "./addVote.module.css";
import { voteAdd } from "../Cards/ArticleCard.module.css";
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
    <div className={`${addVote} ${voteAdd}`}>
      <p>{votes}</p>

      <button
        onClick={() => {
          handleVotes(1);
        }}
        disabled={isDisabled}
        aria-label="Like"
        className={isDisabled ? addVote__true : addVote__false}
      >
        <SlLike className={addVote__svg} />
      </button>
      <button
        onClick={() => {
          handleVotes(-1);
        }}
        disabled={isDisabled}
        aria-label="Dislike"
        className={isDisabled ? addVote__true : addVote__false}
      >
        <SlDislike className={addVote__svg} />
      </button>
      {serverErr ? <p>Sorry, something went wrong!</p> : null}
    </div>
  );
}
