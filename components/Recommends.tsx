import Link from 'next/link';
import React from 'react';
import styles from './Recommends.module.scss';

const Recommends = () => {
    const movies: Array<any> = []; //TODO add redux to fetch
    return (
        <section className={styles.Recommends}>
            <h4>Recommended for You</h4>
            <div className={styles.content}>
                {
                    movies.length && (
                        movies.map((movie, key) => (
                            <div key={key} className={styles.wrap}>
                                {movie.id}
                                <Link href={`/detail/` + movie.id}>
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
