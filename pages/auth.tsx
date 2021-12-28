import React from 'react'
import styles from '../styles/Auth.module.scss';

const Auth = () => {
    return (
        <>
            <section className={styles.Auth}>
                <div className={styles.content}>
                    <div className={styles.wrap}>
                        <img src="/images/cta-logo-one.svg" alt="logo" className={styles.logo} />
                        <a href="#" className={styles.signUp}>Get All there</a>
                        <p className={styles.description}>
                            Get Premier Access to Raya and the Last Dragon for an additional fee
                            with a Disney+ subscription. As of 03/26/21, the price of Disney+
                            and The Disney Bundle will increase by $1.
                        </p>
                        <img src="/images/cta-logo-two.png" alt="logo two" className={styles.logo} />
                    </div>
                    <div className={styles.background} />
                </div>
            </section>
        </>
    )
}
export default Auth