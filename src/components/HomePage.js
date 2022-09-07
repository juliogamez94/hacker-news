import { useEffect, useState } from "react";
import Select from "react-select";
import NewsItem from "./NewsItem";
import ReactPaginate from "react-paginate";
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

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSelectChange = ({ value }) => {
    setQuery(value);
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${currentPage}`
      );
      const data = await res.json();
      setArticles(data.hits);
      setIsLoading(false);
      setTotalPages(data.nbPages);
    };

    fetchData();
  }, [query, currentPage]);

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
                id={objectID}
                title={story_title}
                url={story_url}
                author={author}
                createdAt={created_at}
              />
            )
          )
        )}
      </div>
      <ReactPaginate
        nextLabel=">"
        previousLabel="<"
        breakLabel="..."
        forcePage={currentPage}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        onPageChange={handlePageChange}
        className="pagination"
        activeClassName="active-page"
        previousClassName="previous-page"
        nextClassName="next-page"
      />
    </div>
  );
};

export default HomePage;
