"use client"
import Link from "next/link";
import style from "./Header.module.css";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://cdn.userway.org/widget.js?account=${process.env.NEXT_PUBLIC_USERWAY_KEY}`;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);
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
          <Link className={style.link} href="/categories">
            КАТЕГОРИИ
          </Link>
          <Link className={style.link} href="/login">
            ВХОД
          </Link>
          <Link className={style.lr} href="/register">
            РЕГИСТРАЦИЯ
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
