import Link from 'next/link';
import React from 'react'
import { useSelector } from '../redux/store';
import { MovieData } from '../types';
import styles from './Section.module.scss';

const Trending = () => {
    const { movies } = useSelector(state => state);
    const { trending } = movies;
    return (
        <section className={styles.Section} id='section-4'>
            <h4>Trending</h4>
            <div className={styles.content}>
                {
                    trending.length && (
                        trending.map((movie: MovieData, key) => (
                            <div key={key} className={styles.wrap}>
                                {movie.id}
                                <Link href={`/details/` + movie.id}>
                                    <img src={movie.cardImg} alt={movie.title} />
                                </Link>
                            </div>
                        ))
                    )
                }
            </div>
        </section>
    )
}

export default Trending
