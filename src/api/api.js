import axios from "axios";
const ncNewsApi = axios.create({
  baseURL: "https://nc-news-zs8x.onrender.com/api",
});

export const fetchArticles = (topic, sort_by, order) => {
  return ncNewsApi.get("/articles", { params: { topic, sort_by, order } });
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

export const addComment = (article_id, data) => {
  return ncNewsApi.post(`/articles/${article_id}/comments`, data);
};

export const deleteComment = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`);
};

export const fetchTopics = () => {
  return ncNewsApi.get("/topics");
};

export const fetchUserComments = (username) => {
  return ncNewsApi.get(`/users/${username}/comments`);
};

export const fetchUserByUsername = (username) => {
  return ncNewsApi.get(`/users/${username}`);
};
