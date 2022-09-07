import { useState } from "react";

const ShowNews = () => {
  const [filterSelected, setFilterSelected] = useState(false);

  const handleSelectedButtonAll = () => {
    if (filterSelected !== true) {
      setFilterSelected((current) => !current);
      console.log(filterSelected);
    }
  };
  const handleSelectedButtonFav = () => {
    if (filterSelected !== false) {
      setFilterSelected((current) => !current);
      console.log(filterSelected);
    }
  };

  return (
    <div className="row-buttons">
      <button className="btn-all" onClick={handleSelectedButtonAll}>
        All
      </button>
      <button className="btn-favs" onClick={handleSelectedButtonFav}>
        My faves
      </button>
    </div>
  );
};

export default ShowNews;
