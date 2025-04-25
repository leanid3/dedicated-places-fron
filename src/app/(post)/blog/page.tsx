"use client";
import style from "./blog.module.css";

const Blog = () => {
  return (
    <div>
      <div className={style.hop}></div>
      <div className={style.main}>
        <h1 className={style.h1}>Блог</h1>
        <div className={style.events}>
          <div className={style.event}>
            <div className={style.left}>
              <h2 className={style.h2}>Истории успеха</h2>
              <p className={style.text}>
                Рассказываем вдохновляющие истории о людях с особыми
                потребностями, достигших больших успехов и доказавших миру свою
                силу духа и возможности
              </p>
            </div>
            <div className={style.right}>
              <div className={style.imgRight1}></div>
            </div>
          </div>
          <div className={style.event}>
            <div className={style.left}>
              <h2 className={style.h2}>Адаптация для дома</h2>
              <p className={style.text}>
                Советы экспертов по удобному переоборудованию жилья для
                инвалидов-колясочников, слабослышащих и незрячих людей.
              </p>
            </div>
            <div className={style.right}>
              <div className={style.imgRight2}></div>
            </div>
          </div>
          <div className={style.event}>
            <div className={style.left}>
              <h2 className={style.h2}>Правовая поддержка</h2>
              <p className={style.text}>
                Подробно рассказываем о льготах, пособиях и процедурах
                оформления документов, облегчающих жизнь людям с ограничением
                возможностей.
              </p>
            </div>
            <div className={style.right}>
              <div className={style.imgRight3}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
