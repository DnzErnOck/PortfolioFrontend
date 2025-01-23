import Link from 'next/link'
import React from 'react'
import { VscCodeReview } from 'react-icons/vsc'
import styles from "./styles.module.css";
function Header() {
  return (
    <header className={`${styles.header} container fluid`}>
      <div className={styles.headerWrapper}>
        <Link className={styles.logo} href="/">
            <VscCodeReview />
        </Link> 
        <nav className={styles.navigationMenu}>
          <Link href='/'>Home</Link>
          <Link href='/#about'>About</Link>
          <Link href="/projects">Projects</Link>
          <Link href='/experiences'>Experience</Link>
          <Link href='/certificates'>Certificate</Link>
          <Link href='/educationLanguagePage'>Education-Language</Link>
          <Link href='/courses'>Courses</Link>
          <Link href='/contact'>Contact</Link>
          <Link href='/posts'>Blog</Link>

        </nav>
      </div>
    </header>
  )
}

export default Header