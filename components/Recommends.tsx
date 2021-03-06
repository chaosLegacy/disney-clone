import React from 'react';
import Link from 'next/link';
import styles from './Section.module.scss';
import { useSelector } from '../redux/store';
import { MovieData } from '../types';

const Recommends = () => {
    const { movies } = useSelector(state => state);
    const { recommend } = movies;
    return (
        <section className={styles.Section} id='section-1'>
            <h4>Recommended for You</h4>
            <div className={styles.content}>
                {
                    recommend.length && (
                        recommend.map((movie: MovieData, key) => (
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

export default Recommends
