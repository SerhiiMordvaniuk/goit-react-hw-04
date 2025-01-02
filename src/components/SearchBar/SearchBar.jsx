import React, { useState } from "react";
import s from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ setQuery, setImages }) => {
  const hansleSubmit = (e) => {
    e.preventDefault();

    if (e.target.elements.input.value.trim() === "") {
      toast.error("Please, enter your query", { duration: 2000 });
      return;
    }
    setImages([]);
    setQuery(e.target.elements.input.value);
    e.target.elements.input.value = "";
  };

  return (
    <header className={s.search}>
      <form className={s.form} onSubmit={hansleSubmit}>
        <input
          name="input"
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          // required={true}
          // minLength="3"
        />
        <button type="submit" className={s.btn}>
          {" "}
          <CiSearch size="25" />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
