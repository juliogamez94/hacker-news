import axios from "axios";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://hn.algolia.com/api/v1/search?"
        );
        const { hits, nbPages } = data;

        setArticles(hits);
        setTotalPages(nbPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Hacker News</h1>
      <div className="item-container">
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          articles.map((article) => (
            <NewsItem key={article.objectID} article={article} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
