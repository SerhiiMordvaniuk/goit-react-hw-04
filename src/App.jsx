import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchSearch from "./gallery-api";
import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";

function App() {
  const [params, setParams] = useState("");
  const [articles, setArticles] = useState();
  // const [page, setPage] = useState(1);

  useEffect(() => {
    async function fethGellery() {
      try {
        const response = await fetchSearch(params);

        setArticles(response);
      } catch (error) {
        console.log(error);
      } finally {
        console.log();
      }
    }
    fethGellery();
  }, [params]);

  return (
    <>
      <SearchBar setParams={setParams} />
      <ImageGallery gallery={articles} />
    </>
  );
}

export default App;
