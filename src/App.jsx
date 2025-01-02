import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchSearch from "./gallery-api";
import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { Audio } from "react-loader-spinner";

function App() {
  const [params, setParams] = useState("");
  const [articles, setArticles] = useState();
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fethGellery() {
      try {
        setLoader(true);
        const response = await fetchSearch(params, page);

        setArticles(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
    fethGellery();
  }, [params]);

  return (
    <>
      <SearchBar setParams={setParams} />
      <ImageGallery gallery={articles} />

      <>
        {loader && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        )}
      </>
    </>
  );
}

export default App;
