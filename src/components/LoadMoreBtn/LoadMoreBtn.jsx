import React from "react";
import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ setPage }) => {
  return (
    <div>
      <button
        className={s.btn}
        onClick={() => {
          setPage((prev) => prev + 1);
          setTimeout(
            scrollBy.bind(null, { behavior: "smooth", top: 300 }),
            500
          );
        }}
      >
        {" "}
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
