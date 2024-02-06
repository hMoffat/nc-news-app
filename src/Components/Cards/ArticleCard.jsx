import AddArticleVote from "../Buttons/AddArticleVote";
import "../Cards/ArticleCard.css";

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

  return (
    <div className="article-card">
      <h3 className="card-title">{title}</h3>
      <div className="card-header">
        <h4>{topic}</h4>
        <h4>{author}</h4>
      </div>

      <img
        src={article_img_url}
        alt={`image for article '${title}'`}
        className="card-img"
      />
      <div className="card-footer">
        <p>{created_at}</p>
        <AddArticleVote currentVotes={votes} />
        <p>Comment Count: {comment_count}</p>
      </div>
    </div>
  );
}
