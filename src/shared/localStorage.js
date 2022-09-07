const FAVORITE_NEWS_KEY = "FAVORITE_NEWS";
export function getItemByKey(key) {
  const data = window.localStorage.getItem(FAVORITE_NEWS_KEY);
  if (data) {
    const res = JSON.parse(data);
    return res.hasOwnProperty(key) ? res[key] : false;
  }
}

export function setItemKey(key, value) {
  const item = window.localStorage.getItem(FAVORITE_NEWS_KEY);
  const newItem =
    item === null
      ? { [key]: value }
      : {
          ...JSON.parse(item),
          [key]: value,
        };
  saveLocalStorage(JSON.stringify(newItem));
}

function saveLocalStorage(value) {
  window.localStorage.setItem(FAVORITE_NEWS_KEY, value);
}
