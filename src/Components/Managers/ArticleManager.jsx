import { useEffect, useState } from "react";
import ArticleCard from "../Cards/ArticleCard";
import { fetchArticles } from "../../api/api";
import { useParams, useSearchParams } from "react-router-dom";

export default function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort_byQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  const [err, setErr] = useState(null);

  useEffect(() => {
    console.log("active", topic, sort_byQuery, orderQuery);
    setIsLoading(true);

    fetchArticles(topic, sort_byQuery, orderQuery)
      .then((response) => {
        const fetchedArticles = response.data.articles;
        const articlesCopy = [...fetchedArticles];

        if (sort_byQuery === "comment_count") {
          const articlesCopyCounts = articlesCopy.map((article) => {
            return article.comment_count;
          });
          const highest = Math.max(...articlesCopyCounts);
          if (articlesCopy[0] === highest) {
            articlesCopy.sort((a, b) => {
              return a.comment_count - b.comment_count;
            });
          }
        }

        setArticles(articlesCopy);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log("fetch articles err: ", err);
        setErr(err);
      });
  }, [topic, sort_byQuery, orderQuery]);

  return (
    <>
      {err ? (
        <p className="error">Something went wrong...</p>
      ) : isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="articles">
          <ul>
            {articles.map((article) => {
              return (
                <li key={article.article_id}>
                  <ArticleCard article={article} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

// console.log(
//   articles.sort((a, b) => {
//     return a.comment_count - b.comment_count;
//   })
// );

// let sortBy = "";
// if (sort_byQuery == "comment_count") {
//   sortBy += "author";
// } else {
//   sortBy += sort_byQuery;
// }

// .then((response) => {
//   let articlesCopy = [...response.data.articles];
//   if (sort_byQuery === "comment_count") {
//     console.log("active if statement");
//     articlesCopy.sort((a, b) => {
//       return a.comment_count - b.comment_count;
//     });
//   }
//   return articlesCopy;
// })

//setArticles(response);
