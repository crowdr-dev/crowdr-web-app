export const getDataFromLocalStorage = (key: string) => {
  let data = null;
  if (typeof window !== "undefined") {
    data = localStorage.getItem(key);
  }
  return data;
};

export const setDataInLocalStorage = (key: string, data: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, data);
  }
};
