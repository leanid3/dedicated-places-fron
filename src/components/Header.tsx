import Link from "next/link";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <Link className={style.icon} href={"/"}></Link>
        <div className={style.links}>
          {/* <Link className='' href="/users">О НАС</Link>
                    <Link className='' href="/places">Posts</Link>
                    <Link className='' href="/categories">Categories</Link> */}
          <Link className={style.link} href="#">
            О НАС
          </Link>
          <Link className={style.link} href="#">
            МЕРОПРИЯТИЯ
          </Link>
          <Link className={style.link} href="#">
            БЛОГ
          </Link>
          <Link className={style.link} href="#">
            ВХОД
          </Link>
          <Link className={style.lr} href="#">
            РЕГИСТРАЦИЯ
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
