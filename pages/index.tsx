import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Carousel from '../components/Carousel'
import NewDisney from '../components/NewDisney'
import Recommends from '../components/Recommends'
import Viewers from '../components/Viewers'
import { useAuth } from '../context/AuthUserContext'
import styles from '../styles/Home.module.scss'

const Home = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();
  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/auth')
  }, [authUser, loading])
  return (
    <main className={styles.Home}>
      <button onClick={signOut}>Sign out</button>
      <Carousel />
      <Viewers />
      <Recommends />
      <NewDisney />
    </main>
  )
}

export default Home
