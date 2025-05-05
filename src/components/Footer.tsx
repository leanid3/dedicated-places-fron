import style from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.liaison}>
        <p>garavil1313@gmail.com</p>
        <p>+7(906)123-78-00</p>
        <p>Юр адрес</p>
      </div>
      <div>Соцсети</div>
      <div className={style.cop}>Копирайты, 2025</div>
    </footer>
  );
};
export default Footer;
