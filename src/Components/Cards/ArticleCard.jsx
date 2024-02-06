import { Link } from "react-router-dom";
import AddArticleVote from "../Buttons/AddArticleVote";
import "../Cards/ArticleCard.css";
import { shortStringDate } from "../../../Utils/utils";

export default function ArticleCard({ article }) {
  const {
    title,
    topic,
    author,
    votes,
    body,
    article_id,
    article_img_url,
    comment_count,
    created_at,
  } = article;

  const date = shortStringDate(created_at);

  return (
    <div className="article-card">
      <h3 className="card-title">{title}</h3>
      <div className="card-header">
        <h4>
          {body ? <Link to={`/topics/${topic}`}>{topic}</Link> : <p>{topic}</p>}
        </h4>
        <h4>{author}</h4>
      </div>

      <img
        src={article_img_url}
        alt={`image for article '${title}'`}
        className="card-img"
      />
      {body ? (
        <div className="card-body">
          {body.split(".").map((sentence) => {
            const key = "" + sentence.length + Math.random() + Math.random();
            return sentence ? <p key={key}>{sentence}.</p> : null;
          })}
        </div>
      ) : null}
      <div className="article card-footer">
        <p>{date}</p>
        <AddArticleVote currentVotes={votes} />
        <p>Comment Count: {comment_count}</p>
      </div>
    </div>
  );
}
