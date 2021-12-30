import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Carousel from '../components/Carousel'
import Recommends from '../components/Recommends'
import Viewers from '../components/Viewers'
import { useAuth } from '../context/AuthUserContext'
import styles from '../styles/Home.module.scss';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase'
import { Movies } from '../types'
import { useDispatch } from 'react-redux'
import { actions } from '../redux/reducer'
// import * as disneyJson from './api/disneyPlusMoviesData.json';
import NewDisney from '../components/NewDisney'
import Originals from '../components/Originals'
import Trending from '../components/Trending'

const Home = () => {
  const { authUser, loading } = useAuth();
  const dispatch = useDispatch();
  const movies: Movies = {
    recommend: [],
    newDisney: [],
    original: [],
    trending: []
  }
  const router = useRouter();

  const moviesRef = collection(db, 'portfolio/disneyClone/movies');

  const addDataTmp = async () => {
    // try {
    //   disneyJson.movies.forEach(async element => {
    //     await addDoc(moviesRef, element)
    //   });
    // }
    // catch (error) {
    //   console.error("Error adding document: ", error);
    // }
  }
  const fetchMovies = async () => {
    const docs = await getDocs(moviesRef);
    docs.docs.map((doc) => {
      switch (doc.data().type) {
        case "recommend":
          movies.recommend = [...movies.recommend, { id: doc.id, ...doc.data() }];
          break;

        case "new":
          movies.newDisney = [...movies.newDisney, { id: doc.id, ...doc.data() }];
          break;

        case "original":
          movies.original = [...movies.original, { id: doc.id, ...doc.data() }];
          break;

        case "trending":
          movies.trending = [...movies.trending, { id: doc.id, ...doc.data() }];
          break;
      }
    });
    dispatch(
      actions.setMovies({
        recommend: movies.recommend,
        newDisney: movies.newDisney,
        original: movies.original,
        trending: movies.trending,
      })
    )
  }
  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/auth');
      return
    }
    fetchMovies();
  }, [authUser, loading]);

  return (
    <main className={styles.Home}>
      <Carousel />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </main>
  )
}

export default Home
