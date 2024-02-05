import axios from "axios";
const ncNewsApi = axios.create({
  baseURL: "https://nc-news-zs8x.onrender.com/api",
});

export const fetchArticles = () => {
  return ncNewsApi.get("/articles");
};
