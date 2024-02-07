import { Link } from "react-router-dom";
import AddVote from "../Buttons/AddVote";
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
      {body ? (
        <h3 className="card-title">{title}</h3>
      ) : (
        <Link to={`/topics/${topic}/${title}`} state={article_id}>
          <h3 className="card-title">{title}</h3>
        </Link>
      )}

      <div className="card-header">
        <h4>
          <Link to={`/topics/${topic}`}>{topic}</Link>
        </h4>
        <h4>{author}</h4>
      </div>
      {body ? (
        <img
          src={article_img_url}
          alt={`image for article '${title}'`}
          className="card-img"
        />
      ) : (
        <Link to={`/topics/${topic}/${title}`} state={article_id}>
          <img
            src={article_img_url}
            alt={`image for article '${title}'`}
            className="card-img"
          />
        </Link>
      )}
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
        <AddVote currentVotes={votes} article_id={article_id} />
        <p>Comment Count: {comment_count}</p>
      </div>
    </div>
  );
}
