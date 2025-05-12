"use client";
import style from "./team.module.css";

const Team = () => {
  return (
    <div className={style.concl}>
      <h3 className={style.h3nc}>Помогаем людям с инвалидностью</h3>
      <p className={style.textConcl}>
        <span className="px-30">
        Наш сайт — это удобный гид по доступным заведениям, где каждый может
        найти места с комфортными условиями для людей с ограниченными
        возможностями здоровья. Мы собираем информацию о библиотеках, кафе,
        музеях, парках и других учреждениях, проверяем их оснащенность и
        публикуем отзывы посетителей.
        </span>
      </p>
      <p className={style.textConcl}>
        <span className="px-30">
        Наша цель — сделать городскую среду более открытой и удобной для всех.
        </span>
      </p>
      <div className={style.empls}>
        <div className={style.empl}>
          <div className={style.emplImg1}></div>
          <p>Козловцев Савелий Олегович</p>
          <p>Web-дизайн</p>
        </div>
        <div className={style.empl}>
          <div className={style.emplImg2}></div>
          <p>Саркисян Эдуард Михайлович</p>
          <p>Маркетинг</p>
        </div>
        <div className={style.empl}>
          <div className={style.emplImg3}></div>
          <p>Терентьев Никита Игоревич</p>
          <p>Frontend разработчик</p>
        </div>
        <div className={style.empl}>
          <div className={style.emplImg4}></div>
          <p>Гарипов Равиль Рафаэлевич</p>
          <p>Backend/devops</p>
        </div>
      </div>
    </div>
  );
};
export default Team;
