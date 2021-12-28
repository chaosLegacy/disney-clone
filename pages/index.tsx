import Head from 'next/head'
import Image from 'next/image'
import Carousel from '../components/Carousel'
import NewDisney from '../components/NewDisney'
import Recommends from '../components/Recommends'
import Viewers from '../components/Viewers'
import styles from '../styles/Home.module.scss'

const Home = () => {
  return (
    <main className={styles.Home}>
      <Carousel />
      <Viewers />
      <Recommends />
      <NewDisney />
    </main>
  )
}

export default Home
