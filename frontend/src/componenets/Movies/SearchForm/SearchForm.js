import React, { useState, useEffect } from "react"
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox"
import { useLocation } from "react-router-dom"
import "./SearchForm.css"

function SearchForm({ getSearchMovies, onFilterMovies, isShortMovies }) {
  const [isQueryError, setIsQueryError] = useState(false)
  const location = useLocation()
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch")
      setQuery(localQuery)
    }
  }, [location])

  function getEditProfileInfo(event) {
    event.preventDefault()
    if (query.trim().length === 0) {
      setIsQueryError(true)
    } else {
      setIsQueryError(false)
      getSearchMovies(query)
    }
  }

  function getInputChange(event) {
    setQuery(event.target.value)
  }

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={getEditProfileInfo}>
        <input
          className="search__form-input"
          name="query"
          placeholder="Фильм"
          type="text"
          value={query || ""}
          onChange={getInputChange}
          required
        ></input>
        <button className="search__form-button" type="submit"></button>
      </form>
      <FilterCheckbox
        onFilterMovies={onFilterMovies}
        isShortMovies={isShortMovies}
      />
      {isQueryError && (
        <span className="search__form-error">Нужно ввести ключевое слово</span>
      )}
      <div className="search__border-bottom"></div>
    </section>
  )
}

export default SearchForm
