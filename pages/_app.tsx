import '../styles/globals.scss'
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import type { AppProps } from 'next/app';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { useEffect } from 'react';
import { AuthUserProvider } from '../context/AuthUserContext';


function MyApp({ Component, pageProps }: AppProps) {
  // const [user] = useAuthState(auth);
  // const router = useRouter();
  // useEffect(() => {
  //   debugger
  //   !user && router.push('/auth')
  // }, [user]);
  return (
    <Provider store={store} >
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </Provider >
  )

}

export default MyApp
