import axios from "axios";
const ncNewsApi = axios.create({
  baseURL: "https://nc-news-zs8x.onrender.com/api",
});

export const fetchArticles = () => {
  return ncNewsApi.get("/articles");
};

export const fetchArticleById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`);
};

export const fetchCommentsByArticleId = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`);
};

export const addVotesByArticleId = (article_id, votes) => {
  return ncNewsApi.patch(`/articles/${article_id}`, { inc_votes: votes });
};
export const addVotesByCommentId = (comment_id, votes) => {
  return ncNewsApi.patch(`/comments/${comment_id}`, { inc_votes: votes });
};
