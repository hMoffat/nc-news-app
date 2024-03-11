import { Link } from "react-router-dom";
import AddVote from "../Buttons/AddVote";
import {
  homePage__articleCard,
  articlePage__articleCard,
  cardHeader,
  cardTitle,
  cardImg,
  cardBody,
  cardFooter,
  topicLink,
  authorLink,
  avatar,
  articleDate,
  articleCommentCount,
} from "./ArticleCard.module.css";
import { shortStringDate } from "../../../Utils/utils";
import { fetchUserByUsername } from "../../api/api";
import { useState, useEffect } from "react";

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
  const [articleAvatar, setArticleAvatar] = useState("");

  useEffect(() => {
    fetchUserByUsername(author).then((response) => {
      setArticleAvatar(response.data.user.avatar_url);
    });
  }, []);

  return (
    <div className={body ? articlePage__articleCard : homePage__articleCard}>
      {body ? (
        <h3 className={cardTitle}>{title}</h3>
      ) : (
        <Link
          to={`/topics/${topic}/${title}`}
          state={article_id}
          className={cardTitle}
        >
          <h3>{title}</h3>
        </Link>
      )}

      <div className={cardHeader}>
        <Link to={`/topics/${topic}`} className={topicLink}>
          <h4>{topic}</h4>
        </Link>
        <Link to={`/users/${author}`} className={authorLink}>
          <h4>{author}</h4>
          <img
            src={articleAvatar}
            alt={`${author}'s avatar`}
            className={avatar}
          />
        </Link>
      </div>
      {body ? (
        <img
          src={article_img_url}
          alt={`image for article '${title}'`}
          className={cardImg}
        />
      ) : (
        <Link
          to={`/topics/${topic}/${title}`}
          state={article_id}
          className={cardImg}
        >
          <img src={article_img_url} alt={`image for article '${title}'`} />
        </Link>
      )}
      {body ? (
        <div className={cardBody}>
          {body.split(".").map((sentence, index) => {
            const key = index + sentence.length + Math.random() + Math.random();
            return sentence ? <p key={key}>{sentence}.</p> : null;
          })}
        </div>
      ) : null}
      <div className={cardFooter}>
        <p className={articleDate}>{date}</p>
        <AddVote currentVotes={votes} article_id={article_id} />
        <p className={articleCommentCount}>Comment Count: {comment_count}</p>
      </div>
    </div>
  );
}
