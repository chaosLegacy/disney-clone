import React from 'react';
import styles from './NewDisney.module.scss';
import Link from 'next/link';

const NewDisney = () => {
    const movies: Array<any> = []; //TODO add redux to fetch
    return (
        <section className={styles.NewDisney}>
            <h4>New to Disney+</h4>
            <div className={styles.content}>
                {movies &&
                    movies.map((movie, key) => (
                        <div className={styles.wrap} key={key}>
                            {movie.id}
                            <Link href={`/detail/` + movie.id}>
                                <img src={movie.cardImg} alt={movie.title} />
                            </Link>
                        </div>
                    ))}
            </div>
        </section>
    )
}

export default NewDisney
