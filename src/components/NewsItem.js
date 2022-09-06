import { intlFormatDistance } from "date-fns";
import React from "react";
import { BsClock } from "react-icons/bs";

const NewsItem = ({ author, createdAt, title, url }) => {
  if (!title) return null;

  const openInNewTab = () => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <>
      <article>
        <div className="item-card" onClick={openInNewTab}>
          <span className="created-by">
            <span className="clock">
              <BsClock />
            </span>
            {intlFormatDistance(new Date(createdAt), new Date(), {
              locale: "en",
            }) + " "}
            by{" " + author}
          </span>
          <h3>{title}</h3>
        </div>
      </article>
    </>
  );
};

export default NewsItem;
