import { useParams } from "react-router-dom";
import CommentCard from "../Cards/CommentCard";

import { useEffect, useState } from "react";
import { fetchUserComments } from "../../api/api";

export default function CommentsManager({
  articleComments,
  setArticleComments,
}) {
  const [userComments, setUserComments] = useState(null);
  const [err, setErr] = useState(null);
  const { username } = useParams();
  const [pageUser, setPageUser] = useState(username ? username : null);
  const [isLoading, setIsLoading] = useState(articleComments ? false : true);

  useEffect(() => {
    fetchUserComments(pageUser)
      .then((response) => {
        const fetchedUserComments = response.data.userComments;
        setUserComments(fetchedUserComments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("fetch user comments err: ", error);
        setErr(error);
      });
  }, []);

  const comments = articleComments ? articleComments : userComments;

  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul>
        {isLoading ? (
          <p>Loading comments...</p>
        ) : pageUser && err ? (
          <p>
            Sorry, something went wrong with fetching the {pageUser}'s
            comments....
          </p>
        ) : !pageUser && !comments ? (
          <p>
            Sorry, something went wrong with fetching the article's comments
          </p>
        ) : (
          comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <CommentCard
                  comment={comment}
                  setArticleComments={setArticleComments}
                />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
