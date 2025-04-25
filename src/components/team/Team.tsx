"use client";
import style from "./team.module.css";

const Team = () => {
  return (
    <div className={style.concl}>
      <h3 className={style.h3nc}>Помогаем людям с инвалидностью</h3>
      <p className={style.textConcl}>
        Помогаем людям с инвалидностью, используя тото сето там та там и туда
        сюда Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
        corporis quisquam tempore! Repellendus necessitatibus soluta veritatis
        recusandae laudantium atque optio. Fugiat delectus itaque, tenetur
        beatae eum assumenda totam perspiciatis rerum.
      </p>
      <div className={style.empls}>
        <div className={style.empl}>
          <div className={style.emplImg1}></div>
          <p>Сотрудник</p>
          <p>Должность</p>
        </div>
        <div className={style.empl}>
          <div className={style.emplImg2}></div>
          <p>Сотрудник</p>
          <p>Должность</p>
        </div>
        <div className={style.empl}>
          <div className={style.emplImg3}></div>
          <p>Сотрудник</p>
          <p>Должность</p>
        </div>
        <div className={style.empl}>
          <div className={style.emplImg4}></div>
          <p>Сотрудник</p>
          <p>Должность</p>
        </div>
      </div>
    </div>
  );
};
export default Team;
