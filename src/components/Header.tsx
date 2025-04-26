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
          <Link className={style.link} href="/about">
            О НАС
          </Link>
          <Link className={style.link} href="/events">
            МЕРОПРИЯТИЯ
          </Link>
          <Link className={style.link} href="/blog">
            БЛОГ
          </Link>
          <Link className={style.link} href="/login">
            ВХОД
          </Link>
          <Link className={style.lr} href="/register">
            РЕГИСТРАЦИЯ
          </Link>
          <Link className={style.lr} href="/register">
            КАТЕГОРИИ
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
