import React from "react";
import s from "./ImageCard.module.css";

const ImageCard = ({ src, alt, onClick, modalSrc }) => {
  return (
    <div className={s.card} onClick={() => onClick({ modalSrc, alt })}>
      <img src={src} alt={alt} className={s.img} />
    </div>
  );
};

export default ImageCard;
