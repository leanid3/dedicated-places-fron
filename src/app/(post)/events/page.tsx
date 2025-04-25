"use client";
import style from "./evenst.module.css";

const Events = () => {
  return (
    <div>
      <div className={style.hop}></div>
      <div className={style.main}>
        <h1 className={style.h1}>Мероприятия</h1>
        <div className={style.events}>
          <div className={style.event}>
            <div className={style.left}>
              <h2 className={style.h2}>Мероприятие</h2>
              <p className={style.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                non sequi quaerat at temporibus facilis fugit, incidunt
                praesentium fuga nesciunt totam aliquam saepe voluptatem
                perspiciatis beatae eveniet quibusdam quis blanditiis.
              </p>
              <div className={style.bot}>
                <p className={style.text}>Адрес</p>
                <p className={style.text}>Дата и время</p>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.imgRight}></div>
            </div>
          </div>
          <div className={style.event}>
            <div className={style.left}>
              <h2 className={style.h2}>Мероприятие</h2>
              <p className={style.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                non sequi quaerat at temporibus facilis fugit, incidunt
                praesentium fuga nesciunt totam aliquam saepe voluptatem
                perspiciatis beatae eveniet quibusdam quis blanditiis.
              </p>
              <div className={style.bot}>
                <p className={style.text}>Адрес</p>
                <p className={style.text}>Дата и время</p>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.imgRight}></div>
            </div>
          </div>
          <div className={style.event}>
            <div className={style.left}>
              <h2 className={style.h2}>Мероприятие</h2>
              <p className={style.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                non sequi quaerat at temporibus facilis fugit, incidunt
                praesentium fuga nesciunt totam aliquam saepe voluptatem
                perspiciatis beatae eveniet quibusdam quis blanditiis.
              </p>
              <div className={style.bot}>
                <p className={style.text}>Адрес</p>
                <p className={style.text}>Дата и время</p>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.imgRight}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
