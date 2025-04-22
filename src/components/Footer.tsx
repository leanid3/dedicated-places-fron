import style from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.liaison}>
        <p>Mail.ru</p>
        <p>+7(999)999-99-99</p>
        <p>Юр адрес</p>
      </div>
      <div>Соцсети</div>
      <div className={style.cop}>копирайты, 2025</div>
    </footer>
  );
};
export default Footer;
