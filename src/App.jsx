import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchSearch from "./gallery-api";
import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState(false);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, serError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState();
  const [scroll, setScroll] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [first, setFirst] = useState(false);

  useEffect(() => {
    let totalPages = 0;
    async function fethGellery() {
      try {
        setLoadMore(false);
        setLoader(true);
        serError(false);
        const data = await fetchSearch(query, page);
        if (!first) {
          setImages(data);
          setFirst(true);
        } else {
          if (data === undefined) {
            return;
          } else {
            console.log(page);

            if (data.total_pages === 0) {
              toast.error("No results", {
                duration: 2000,
                position: "top-center",
              });
            }
            if (data.total > 12) {
              setLoadMore(true);
            } else {
              setLoadMore(false);
            }
            totalPages = data.total_pages;
            if (page === totalPages) {
              setLoadMore(false);
              setLoadMore(false);
              toast.success("No more results", {
                duration: 2000,
              });
            }
            setImages((prev) => [...prev, ...data.results]);
          }
        }
      } catch (error) {
        serError(true);
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
    fethGellery();
  }, [query, page, first]);

  useEffect(() => {
    if (scroll) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [scroll]);

  const openModal = () => {
    setIsOpen(true);
    setScroll(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setScroll(false);
  };

  const handleClick = (item) => {
    openModal();
    setModalImg(item);
  };

  const clearImages = () => {
    setImages([]);
    setPage(1);
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <SearchBar
        setQuery={setQuery}
        clearImages={clearImages}
        prevQuery={query}
      />
      {error && <ErrorMessage />}
      <ImageGallery gallery={images} onClick={handleClick} />
      <>{loader && <Loader />}</>
      <>{loadMore && <LoadMoreBtn setPage={setPage} />}</>
      <ImageModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        alt={modalImg?.alt_description}
        image={modalImg?.modalSrc}
      />
    </>
  );
}

export default App;
