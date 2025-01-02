import React from "react";
import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ gallery }) => {
  if (!gallery) {
    return;
  }

  return (
    <>
      <ul className={s.list}>
        {gallery.data.results.map((item) => {
          return (
            <li key={item.id} className={s.item}>
              <ImageCard src={item.urls.small} alt={item.description} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ImageGallery;
