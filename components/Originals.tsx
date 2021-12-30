import React from 'react'
import Link from 'next/link';
import styles from './Section.module.scss';
import { useSelector } from '../redux/store';
import { MovieData } from '../types';

const Originals = () => {
    const { movies } = useSelector(state => state);
    const { original } = movies;
    return (
        <section className={styles.Section} id='section-3'>
            <h4>Originals</h4>
            <div className={styles.content}>
                {
                    original.length && (
                        original.map((movie: MovieData, key) => (
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

export default Originals
