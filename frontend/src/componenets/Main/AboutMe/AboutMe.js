import React from "react"
import "./AboutMe.css"
import studentPic from "../../../images/student-pic.png"

function AboutMe() {
  return (
    <section className="about-me" id="aboutme">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__profile">
        <div className="about-me__content">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__job">Фронтенд-разработчик, 30 года</p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/ira-kudryashova"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__pic" src={studentPic} alt="Аватар" />
      </div>
    </section>
  )
}

export default AboutMe
