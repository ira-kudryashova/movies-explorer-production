import React from "react"
import { Link, NavLink } from "react-router-dom"
import account from "../../images/profile.svg"
import "./Navigation.css"

function Navigation({ handleCloseMobileMenu }) {
  const setactiveColorHeaderLink = ({ isActive }) =>
    isActive ? "navigation__link_active" : "navigation__link"

  return (
    <div className="navigation__block">
      <div className="navigation__block-overlay"></div>
      <div className="navigation__menu">
        <button
          onClick={handleCloseMobileMenu}
          className="navigation__close-button"
        ></button>
        <nav className="navigation__links">
          <NavLink to="/" className={setactiveColorHeaderLink}>
            Главная
          </NavLink>
          <NavLink to="/movies" className={setactiveColorHeaderLink}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className={setactiveColorHeaderLink}>
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="navigation__account-button">
          <img src={account} alt="Иконка аккаунт" />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
