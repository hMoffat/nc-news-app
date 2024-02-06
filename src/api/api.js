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
