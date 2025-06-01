"use client";
import style from "./team.module.css";

const Team = () => {
  return (
    <section className={style.concl}>
      <h2 className={style.h3nc}>Помогаем людям с инвалидностью</h2>
      <div className={style.textConcl}>
        <p>
          Наш сайт — это удобный гид по доступным заведениям, где каждый может
          найти места с комфортными условиями для людей с ограниченными
          возможностями здоровья. Мы собираем информацию о библиотеках, кафе,
          музеях, парках и других учреждениях, проверяем их оснащенность и
          публикуем отзывы посетителей.
        </p>
        <p>
          Наша цель — сделать городскую среду более открытой и удобной для всех.
        </p>
      </div>
      <div className={style.empls}>
        <article className={style.empl}>
          <div className={style.emplImg1} aria-label="Фото Козловцева Савелия Олеговича"></div>
          <h3>Козловцев Савелий Олегович</h3>
          <p>Web-дизайн</p>
        </article>
        <article className={style.empl}>
          <div className={style.emplImg2} aria-label="Фото Саркисяна Эдуарда Михайловича"></div>
          <h3>Саркисян Эдуард Михайлович</h3>
          <p>Маркетинг</p>
        </article>
        <article className={style.empl}>
          <div className={style.emplImg3} aria-label="Фото Терентьева Никиты Игоревича"></div>
          <h3>Терентьев Никита Игоревич</h3>
          <p>Frontend разработчик</p>
        </article>
        <article className={style.empl}>
          <div className={style.emplImg4} aria-label="Фото Гарипова Равиля Рафаэлевича"></div>
          <h3>Гарипов Равиль Рафаэлевич</h3>
          <p>Backend/devops</p>
        </article>
      </div>
    </section>
  );
};

export default Team;
