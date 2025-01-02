import axios from "axios";

const KEY = "1X6RII3RoeScRHg5if82ucbsdRGfgCmSu4y1o-_zRdE";
const fetchSearch = async (search) => {
  if (search.trim() === "") {
    return;
  }
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos/?client_id=${KEY}&query=${search}`
  );

  return { data };
};

export default fetchSearch;
