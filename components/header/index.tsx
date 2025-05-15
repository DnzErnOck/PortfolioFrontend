import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { VscCodeReview } from 'react-icons/vsc'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import styles from "./styles.module.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Remove leading and trailing slashes and set active path
    const cleanPath = pathname?.replace(/^\/+|\/+$/g, '') || '';
    setActivePath(cleanPath);
    console.log('Active path:', cleanPath);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getClassName = (path: string) => {
    const currentPath = path === '/' ? '' : path.replace(/^\/+|\/+$/g, '');
    const isActive = currentPath === activePath;
    return `${styles.navLink} ${isActive ? styles.active : ''}`;
  };

  return (
    <header className={`${styles.header} container fluid`}>
      <div className={styles.headerWrapper}>
        <Link className={styles.logo} href="/" aria-label="Ana Sayfa">
            <VscCodeReview />
        </Link> 
        
        <button 
          className={styles.menuButton} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>

        <nav className={`${styles.navigationMenu} ${isMenuOpen ? styles.showMenu : ''}`}>
          <Link href="/" className={getClassName('/')} onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/projects" className={getClassName('/projects')} onClick={toggleMenu}>
            Projects
          </Link>
          <Link href="/experiences" className={getClassName('/experiences')} onClick={toggleMenu}>
            Experience
          </Link>
          <Link href="/certificates" className={getClassName('/certificates')} onClick={toggleMenu}>
            Certificate
          </Link>
          <Link href="/educationLanguagePage" className={getClassName('/educationLanguagePage')} onClick={toggleMenu}>
            Education & Language
          </Link>
          <Link href="/courses" className={getClassName('/courses')} onClick={toggleMenu}>
            Courses
          </Link>
          <Link href="/contact" className={getClassName('/contact')} onClick={toggleMenu}>
            Contact
          </Link>
          <Link href="/posts" className={getClassName('/posts')} onClick={toggleMenu}>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header