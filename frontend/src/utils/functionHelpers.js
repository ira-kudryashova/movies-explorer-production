import { MAX_DURATION_MOVIE } from "./config"

export const getCheckResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

// Функция принимает значение длительности фильмов
// в минутах и конвертирует его в часы и минуты
export function converterDurationMovie(duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}ч${minutes}м`
}

// Длительность фильмов
export function counterDurationMovie(movies) {
  return movies.filter((movie) => movie.duration < MAX_DURATION_MOVIE)
}

// Короткометражки
export function filterMovies(movies, query) {
  const moviesQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim()
    const movieEn = String(movie.nameEN).toLowerCase().trim()
    const userQuery = query.toLowerCase().trim()
    return (
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    )
  })
  return moviesQuery
}
