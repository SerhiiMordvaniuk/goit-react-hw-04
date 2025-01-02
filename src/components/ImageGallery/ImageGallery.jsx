import React from "react";
import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ gallery }) => {
  if (!gallery) {
    return;
  } else {
    console.log(gallery.data.results);
  }

  return (
    <>
      <ul className={s.list}>
        {gallery.data.results.map((item) => {
          console.log(item.urls.small);

          return (
            <li key={item.id}>
              <ImageCard src={item.urls.small} alt={item.description} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ImageGallery;
// id, likes, description, { full, small };
