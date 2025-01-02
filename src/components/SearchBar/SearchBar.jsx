import React, { useState } from "react";
import s from "./SearchBar.module.css";

const SearchBar = ({ setParams }) => {
  const hansleSubmit = (e) => {
    e.preventDefault();
    setParams(e.target.elements.input.value);
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
        />
        <button type="submit" className={s.btn}></button>
      </form>
    </header>
  );
};

export default SearchBar;
