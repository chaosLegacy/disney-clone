import React from 'react'
import Link from 'next/link';
import styles from './Section.module.scss';
import { useSelector } from '../redux/store';
import { MovieData } from '../types';

const NewDisney = () => {
    const { movies } = useSelector(state => state);
    const { newDisney } = movies;
    return (
        <section className={styles.Section} id='section-2'>
            <h4>New to Disney+</h4>
            <div className={styles.content}>
                {
                    newDisney.length && (
                        newDisney.map((movie: MovieData, key) => (
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

export default NewDisney
