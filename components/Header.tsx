import Link from 'next/link';
import React from 'react';
import { useAuth } from '../context/AuthUserContext';
import styles from './Header.module.scss';
import Meta from './Meta';

const Header = () => {
    const { authUser, googleSignIn, signOut } = useAuth();
    const scrollToElement = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        id: string) => {
        e.preventDefault();
        const section = document.getElementById(id);
        section && section.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <>
            <Meta />
            <nav className={styles.Header}>
                <Link href='/'>
                    <a className={styles.logo}>
                        <img src="/images/logo.svg" alt="Disney+" />
                    </a>
                </Link>
                {
                    !authUser ? (
                        <button className={styles.login}
                            onClick={googleSignIn}>Login
                        </button>
                    ) : (
                        <>
                            <nav className={styles.navMenu}>
                                <Link href='/'>
                                    <a>
                                        <img src="/images/home-icon.svg" alt="HOME" />
                                        <span>HOME</span>
                                    </a>
                                </Link>
                                <a href="#" onClick={(e) => scrollToElement(e, `section-1`)}>
                                    <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                                    <span>RECOMMENDED</span>
                                </a>
                                <a href="#" onClick={(e) => scrollToElement(e, `section-2`)}>
                                    <img src="/images/series-icon.svg" alt="SERIES" />
                                    <span>SERIES</span>
                                </a>
                                <a href="#" onClick={(e) => scrollToElement(e, `section-3`)}>
                                    <img src="/images/original-icon.svg" alt="ORIGINALS" />
                                    <span>ORIGINALS</span>
                                </a>
                                <a href="#" onClick={(e) => scrollToElement(e, `section-4`)}>
                                    <img src="/images/movie-icon.svg" alt="MOVIES" />
                                    <span>TRENDING</span>
                                </a>
                            </nav>
                            <div className={styles.signOut}>
                                <div className={styles.dropDown}>
                                    <img src={authUser.photoURL} alt={authUser.displayName} className={styles.userImg} />
                                    <span className={styles.dropDownContent}
                                        onClick={signOut}>Sign out</span>
                                </div>
                            </div>
                        </>

                    )
                }
            </nav>
        </>
    )
}

export default Header
