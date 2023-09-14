import React, { useState, useEffect } from "react"
import "./Movies.css"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { filterMovies, counterDurationMovie } from "../../utils/functionHelpers"
import SearchForm from "./SearchForm/SearchForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import * as movies from "../../utils/MoviesApi"

function Movies({ loggedIn, savedMovies, getLikeMovie, onDeleteCard }) {
  const [isLoading, setIsLoading] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [initialCardsMovies, setInitialCardsMovies] = useState([])
  const [isShortMovies, setisShortMovies] = useState(false)
  const [isReqError, setisReqError] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  // Функция поиска фильмов
  function getSearchMovies(query) {
    localStorage.setItem("movieSearch", query)
    localStorage.setItem("shortMovies", isShortMovies)
    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      handleFilterMovie(movies, query, isShortMovies)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsSavedFilms) => {
          handleFilterMovie(cardsSavedFilms, query, isShortMovies)
          setisReqError(false)
        })
        .catch((error) => {
          setisReqError(true)
          console.log(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  function getShortMoviesToggle() {
    setisShortMovies(!isShortMovies)
    if (!isShortMovies) {
      const filteredCardsMovies = counterDurationMovie(initialCardsMovies)
      setFilteredMovies(filteredCardsMovies)
    } else {
      setFilteredMovies(initialCardsMovies)
    }
    localStorage.setItem("shortMovies", !isShortMovies)
  }

  // Функция фильтрации фильмов
  function handleFilterMovie(movies, query, short) {
    const moviesFilmList = filterMovies(movies, query, short)
    setInitialCardsMovies(moviesFilmList)
    setFilteredMovies(
      short ? counterDurationMovie(moviesFilmList) : moviesFilmList
    )
    localStorage.setItem("movies", JSON.stringify(moviesFilmList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  // Получение короткометражных фильмов
  useEffect(() => {
    setisShortMovies(localStorage.getItem("shortMovies") === "true")
  }, [])

  // Получение фильмов из localStorage
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCardsMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(counterDurationMovie(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      setIsNotFound(filteredMovies.length === 0)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        isShortMovies={isShortMovies}
        onFilterMovies={getShortMoviesToggle}
        getSearchMovies={getSearchMovies}
      />
      <MoviesCardList
        cards={filteredMovies}
        isLoading={isLoading}
        isSavedFilms={false}
        savedMovies={savedMovies}
        isReqError={isReqError}
        getLikeMovie={getLikeMovie}
        onDeleteCard={onDeleteCard}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  )
}

export default Movies
