import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import styles from "./styles.module.css";
import { createPortal } from 'react-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('');
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const cleanPath = pathname?.replace(/^\/+/g, '').replace(/\/+$/g, '') || '';
    setActivePath(cleanPath);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const getClassName = (path: string) => {
    const currentPath = path === '/' ? '' : path.replace(/^\/+/g, '').replace(/\/+$/g, '');
    const isActive = currentPath === activePath;
    return `${styles.navLink} ${isActive ? styles.active : ''}`;
  };

  const mobileMenu = (
    <div className={styles.mobileMenuOverlay}>
      <button className={styles.closeButton} onClick={() => setMenuOpen(false)} aria-label="Close menu">
        <RiCloseLine />
      </button>
      <nav className={styles.mobileMenuNav}>
        <Link href="/" className={getClassName('/')} onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/projects" className={getClassName('/projects')} onClick={() => setMenuOpen(false)}>Projects</Link>
        <Link href="/experiences" className={getClassName('/experiences')} onClick={() => setMenuOpen(false)}>Experience</Link>
        <Link href="/certificates" className={getClassName('/certificates')} onClick={() => setMenuOpen(false)}>Certificate</Link>
        <Link href="/educationLanguagePage" className={getClassName('/educationLanguagePage')} onClick={() => setMenuOpen(false)}>Education & Language</Link>
        <Link href="/courses" className={getClassName('/courses')} onClick={() => setMenuOpen(false)}>Courses</Link>
        <Link href="/contact" className={getClassName('/contact')} onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link href="/posts" className={getClassName('/posts')} onClick={() => setMenuOpen(false)}>Blog</Link>
      </nav>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        {/* Hamburger button (mobile only) */}
        <button className={styles.menuButton} onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <RiMenu3Line />
        </button>
        {/* Desktop menu */}
        <nav className={styles.navigationMenu}>
          <Link href="/" className={getClassName('/')}>Home</Link>
          <Link href="/projects" className={getClassName('/projects')}>Projects</Link>
          <Link href="/experiences" className={getClassName('/experiences')}>Experience</Link>
          <Link href="/certificates" className={getClassName('/certificates')}>Certificate</Link>
          <Link href="/educationLanguagePage" className={getClassName('/educationLanguagePage')}>Education & Language</Link>
          <Link href="/courses" className={getClassName('/courses')}>Courses</Link>
          <Link href="/contact" className={getClassName('/contact')}>Contact</Link>
          <Link href="/posts" className={getClassName('/posts')}>Blog</Link>
        </nav>
        {/* Mobile overlay menu rendered via portal */}
        {menuOpen && mounted && createPortal(mobileMenu, document.body)}
      </div>
    </header>
  )
}

export default Header;