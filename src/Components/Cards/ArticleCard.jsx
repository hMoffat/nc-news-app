import AddArticleVote from "../Buttons/AddArticleVote";

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
    <>
      <h3>{title}</h3>
      <h4>{topic}</h4>
      <h4>{author}</h4>
      <img src={article_img_url} alt={`image for article '${title}'`} />
      <p>{created_at}</p>
      <AddArticleVote currentVotes={votes} />
      <p>{comment_count}</p>
    </>
  );
}
