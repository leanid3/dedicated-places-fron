"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "@/lib/hooks/useAuth";
import logo from '@/components/logo.png';

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://cdn.userway.org/widget.js?account=${process.env.NEXT_PUBLIC_USERWAY_KEY}`;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0">
            <div className="w-12 h-12 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${logo.src})` }} />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mr-15 md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400 font-medium transition-colors">
              О НАС
            </Link>
            <Link href="/events" className="text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400 font-medium transition-colors">
              МЕРОПРИЯТИЯ
            </Link>
            <Link href="/blog" className="text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400 font-medium transition-colors">
              БЛОГ
            </Link>
            <Link href="/categories" className="text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400 font-medium transition-colors">
              КАТЕГОРИИ
            </Link>
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400 font-medium transition-colors">
                  ВХОД
                </Link>
                <Link href="/register" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full font-medium transition-colors">
                  РЕГИСТРАЦИЯ
                </Link>
              </>
            ) : (
              <Link href="/profile" className="text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400 font-medium transition-colors">
                {user?.name}
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin" className="text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400 font-medium transition-colors">
                АДМИН ПАНЕЛЬ
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400">
              О НАС
            </Link>
            <Link href="/events" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400">
              МЕРОПРИЯТИЯ
            </Link>
            <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400">
              БЛОГ
            </Link>
            <Link href="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400">
              КАТЕГОРИИ
            </Link>
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400">
                  ВХОД
                </Link>
                <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-yellow-500 text-white hover:bg-yellow-600">
                  РЕГИСТРАЦИЯ
                </Link>
              </>
            ) : (
              <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400">
                {user?.name}
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400">
                АДМИН ПАНЕЛЬ
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
