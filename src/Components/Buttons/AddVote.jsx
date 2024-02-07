import { useState } from "react";
import { addVotesByArticleId, addVotesByCommentId } from "../../api/api";
import "./Buttons.css";

export default function AddArticleVote({
  currentVotes,
  article_id,
  comment_id,
}) {
  const [votes, setVotes] = useState(currentVotes);
  const [voted, setVoted] = useState(false);

  const handleVotes = (num) => {
    if (!voted) {
      setVotes(votes + num);
      setVoted(true);

      if (article_id) {
        addVotesByArticleId(article_id, num).then((response) => {
          console.log(response);
        });
      }
      if (comment_id) {
        addVotesByCommentId(comment_id, num).then((response) => {
          console.log(response);
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
        aria-label="Like"
      >
        {" "}
        ❤️{" "}
      </button>
      <button
        onClick={() => {
          handleVotes(-1);
        }}
        aria-label="Dislike"
      >
        {" "}
        💔{" "}
      </button>
    </div>
  );
}