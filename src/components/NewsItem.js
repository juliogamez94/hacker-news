import React from "react";

const NewsItem = ({ article }) => {
  if (!article.title) return null;
  return (
    <div className="item-card">
      <h3>{article.title}</h3>
    </div>
  );
};

export default NewsItem;
