import { intlFormatDistance } from "date-fns";
import React, { useEffect, useState } from "react";
import { BsClock, BsHeartFill, BsHeart } from "react-icons/bs";
import { getItemByKey, setItemKey } from "../shared/localStorage";

const NewsItem = ({ author, createdAt, title, url, id }) => {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    debugger;
    const value = getItemByKey(id);
    setFav(value);
  }, [id]);

  const openInNewTab = () => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleFav = () => {
    setItemKey(id, !fav);
    setFav(!fav);
  };

  return (
    <section className="item-card">
      <section className="content" onClick={openInNewTab}>
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
      </section>
      <section className="like" onClick={handleFav}>
        <span>{fav ? <BsHeartFill /> : <BsHeart />}</span>
      </section>
    </section>
  );
};

export default NewsItem;
