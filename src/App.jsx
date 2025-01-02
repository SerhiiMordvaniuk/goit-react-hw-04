import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchSearch from "./gallery-api";
import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { ThreeDots } from "react-loader-spinner";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

function App() {
  const [params, setParams] = useState("");
  const [images, setImages] = useState();
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, serError] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    async function fethGellery() {
      try {
        setLoader(true);
        const data = await fetchSearch(params, page);
        setImages(data);
        // setImages((prev) => [...prev, ...data]);
      } catch (error) {
        serError(true);
      } finally {
        setLoader(false);
      }
    }
    fethGellery();
  }, [params, page]);
  return (
    <>
      <SearchBar setParams={setParams} />
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      <ImageGallery gallery={images} />
      <>
        {loader && (
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="darkblue"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </>
      <>{images && <LoadMoreBtn setPage={setPage} />}</>
    </>
  );
}

export default App;
