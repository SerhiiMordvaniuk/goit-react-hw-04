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
  const [images, setImages] = useState();
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [error, serError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState();
  const [scroll, setScroll] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    async function fethGellery() {
      try {
        setLoader(true);
        serError(false);
        if (query.trim() === "") {
          return;
        }
        const data = await fetchSearch(query, page);
        if (!images) {
          setImages(data);
        } else {
          setTotalPages(data.total_pages);
          setImages((prev) => [...prev, ...data.results]);
          if (data.total > 12) {
            setLoadMore(true);
          } else {
            setLoadMore(false);
          }
          if (page == totalPages) {
            setLoadMore(false);
            toast.success("No more results", {
              duration: 2000,
            });
          }
        }
      } catch (error) {
        serError(true);
      } finally {
        setLoader(false);
      }
    }
    fethGellery();
  }, [query, page]);

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

  return (
    <>
      <Toaster position="bottom-center" />
      <SearchBar setQuery={setQuery} setImages={setImages} />
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
