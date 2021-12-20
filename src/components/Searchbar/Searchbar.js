import styles from "./Searchbar.module.css";
import {useState } from 'react';
import { memo } from 'react';
// import React, { Component } from "react";
import PropTypes from 'prop-types';



const SearchBar = props => {

  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value)
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  }

    

    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>search</span>
          </button>

          <input
            name='query'
            value={query}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(SearchBar) ;