import { useEffect, useState } from "react";
import Select from "react-select";
import NewsItem from "./NewsItem";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const optionsNews = [
    {
      label: "React",
      value: "react",
    },
    {
      label: "Angular",
      value: "angular",
    },
    {
      label: "Vue",
      value: "vue",
    },
  ];

  const handleSelectChange = ({ value }) => {
    setQuery(value);
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=0`
      );
      const data = await res.json();
      setArticles(data.hits);
      setIsLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <div className="container">
      <h1 className="header">Hacker News</h1>
      <div className="options">
        <Select
          defaultValue={{ label: "Select your news", value: " " }}
          options={optionsNews}
          onChange={handleSelectChange}
        />
      </div>
      <div className="item-container">
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          articles.map(
            ({ author, created_at, story_title, story_url, objectID }) => (
              <NewsItem
                key={objectID}
                title={story_title}
                url={story_url}
                author={author}
                createdAt={created_at}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
