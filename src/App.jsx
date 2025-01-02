import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchSearch from "./gallery-api";
import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { ThreeDots } from "react-loader-spinner";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState();
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, serError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    async function fethGellery() {
      try {
        setLoader(true);
        const data = await fetchSearch(query, page);
        if (!images) {
          setImages(data);
        } else {
          setImages((prev) => [...prev, ...data]);
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
      <SearchBar setQuery={setQuery} setImages={setImages} />
      {error && <ErrorMessage />}
      <ImageGallery gallery={images} onClick={handleClick} />
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
