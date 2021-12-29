import React, { useEffect } from 'react'
import styles from '../styles/Auth.module.scss';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../lib/firebase';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';

const Auth = () => {
    const router = useRouter();
    const { authUser, loading } = useAuth();
    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        if (!loading && authUser)
            router.push('/')
    }, [authUser, loading]);

    const signInWithGoogle = async () => {
        try {
            // const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleProvider);
            if (result.user) {
                router.push('/');
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }
    return (
        <>
            <section className={styles.Auth}>
                <div className={styles.content}>
                    <div className={styles.wrap}>
                        <img src="/images/cta-logo-one.svg" alt="logo" className={styles.logo} />
                        <button onClick={signInWithGoogle} className={styles.signUp}>Get All there</button>
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