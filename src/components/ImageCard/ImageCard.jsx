import React from "react";
import s from "./ImageCard.module.css";

const ImageCard = ({ src, alt }) => {
  return (
    <div className={s.card}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;