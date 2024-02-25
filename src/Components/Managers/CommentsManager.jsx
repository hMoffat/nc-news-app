import { useParams } from "react-router-dom";
import CommentCard from "../Cards/CommentCard";

import { useEffect, useState } from "react";
import { fetchUserComments } from "../../api/api";

export default function CommentsManager({
  articleComments,
  setArticleComments,
  userPageComments,
  setUserPageComments,
}) {
  const comments = articleComments ? articleComments : userPageComments;
  console.log(comments);

  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <CommentCard
                comment={comment}
                setArticleComments={setArticleComments}
                setUserPageComments={setUserPageComments}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
