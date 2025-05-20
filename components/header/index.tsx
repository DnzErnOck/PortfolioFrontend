import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
// import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import styles from "./styles.module.css";

function Header() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Remove leading and trailing slashes and set active path
    const cleanPath = pathname?.replace(/^\/+|\/+$/g, '') || '';
    setActivePath(cleanPath);
    console.log('Active path:', cleanPath);
  }, [pathname]);

  // Comment out the menu open effect
  /*
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    };
  }, [isMenuOpen]);
  */

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  const getClassName = (path: string) => {
    const currentPath = path === '/' ? '' : path.replace(/^\/+|\/+$/g, '');
    const isActive = currentPath === activePath;
    return `${styles.navLink} ${isActive ? styles.active : ''}`;
  };

  return (
    <header className={`${styles.header} container fluid`}>
      <div className={styles.headerWrapper}>
        {/* Comment out hamburger menu button
        <button 
          className={styles.menuButton} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
        */}

        <nav className={styles.navigationMenu}>
          {/* Comment out close button
          <button 
            className={styles.closeButton}
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <RiCloseLine />
          </button>
          */}
          <Link href="/" className={getClassName('/')}>
            Home
          </Link>
          <Link href="/projects" className={getClassName('/projects')}>
            Projects
          </Link>
          <Link href="/experiences" className={getClassName('/experiences')}>
            Experience
          </Link>
          <Link href="/certificates" className={getClassName('/certificates')}>
            Certificate
          </Link>
          <Link href="/educationLanguagePage" className={getClassName('/educationLanguagePage')}>
            Education & Language
          </Link>
          <Link href="/courses" className={getClassName('/courses')}>
            Courses
          </Link>
          <Link href="/contact" className={getClassName('/contact')}>
            Contact
          </Link>
          <Link href="/posts" className={getClassName('/posts')}>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header