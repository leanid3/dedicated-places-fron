"use client"
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useAuth from './useAuth';

export function useAuthCheck() {
  const pathname = usePathname();
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);
}