import { collection, doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Meta from '../../../components/Meta';
import { useAuth } from '../../../context/AuthUserContext';
import { db } from '../../../lib/firebase';
import styles from '../../../styles/Detail.module.scss'
import { MovieData, youtubeSnippet } from '../../../types';
import YouTube from '@u-wave/react-youtube';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/reducer';
import { useSelector } from '../../../redux/store';

const Detail = () => {
    const { authUser, loading } = useAuth();
    const { query, push } = useRouter();
    const dispatch = useDispatch();
    const { movieDetail } = useSelector(state => state);
    const [dataLoading, setLoading] = useState(true);

    const fetchDetails = async () => {
        setLoading(true);
        const movieRef = collection(db, 'portfolio/disneyClone/movies');
        const movieDoc = doc(movieRef, String(query.id));
        const data = await getDoc(movieDoc);
        const detailData = data.data() as MovieData;

        const youtubeReq = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${detailData.title},trailer&type=video&maxResults=1&key=${process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY}`)
        const youtubeRes = await youtubeReq.json();

        let youtubeData: youtubeSnippet = null;
        if (youtubeRes.error && youtubeRes.error.message) {
            console.log(youtubeRes.error.message);
            actions.set({ error: youtubeRes.error.message })
        }
        if (youtubeRes.items && youtubeRes.items.length) {
            youtubeData = youtubeRes.items[0].snippet as youtubeSnippet;
            youtubeData.videoId = youtubeRes.items[0].id.videoId;
        }
        if (data.exists()) {
            detailData.trailer = youtubeData ? youtubeData : { videoId: 'yRUAzGQ3nSY' };
            dispatch(actions.set({ movieDetail: detailData }));
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!loading && !authUser) {
            push('/auth');
            return;
        }
        fetchDetails();
    }, [authUser, loading]);

    const qualities = ['auto', '240', '380', '480', '720', '1080', '1440', '2160'];
    const [suggestedQuality, setSuggestedQuality] = useState('auto');
    const [volume, setVolume] = useState(1);
    const [paused, setPaused] = useState(true);
    const videoRef = useRef<any>({});
    const [onEnd, setOnEnd] = useState(false);
    const [metadataVisibility, setMetadataVisibility] = useState(true);
    let interval: NodeJS.Timer;
    // YT.OnStateChangeEvent
    const handlePause = () => {
        if (onEnd)
            handleReplay();
        else
            setPaused(!paused);
    };
    const handleReplay = () => {
        if (videoRef.current && videoRef.current.playerInstance) {
            videoRef.current.playerInstance.playVideo();
            setOnEnd(false);
            setPaused(false);
        }
    }

    const handlePlayerPause = useCallback(() => {
        setPaused(true);
    }, []);

    const handlePlayerPlay = useCallback(() => {
        setPaused(false);
    }, []);

    const handleVolume = useCallback((event) => {
        setVolume(parseFloat(event.target.value));
    }, []);

    const handleQuality = useCallback((event) => {
        setSuggestedQuality(qualities[event.target.selectedIndex]);
    }, []);

    const handleMouseMove = () => {
        if (interval)
            clearTimeout(interval);
        interval = setTimeout(() => {
            setMetadataVisibility(true);
        }, 2000);
        setMetadataVisibility(false);
    };

    const handleKeyPress = (event: any) => {
        switch (event.keyCode) {
            case 32:
                event.preventDefault();
                handlePause();
                break;
        }
    };

    useEffect(() => {
        if (!paused)
            window.addEventListener("mousemove", handleMouseMove, false);
        else
            window.removeEventListener("mousemove", handleMouseMove);
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("keydown", handleKeyPress);

        }
    }, [paused, handleMouseMove]);

    return (
        <>
            {
                dataLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    <>
                        <Meta title={movieDetail.title} description={movieDetail.description} keywords={movieDetail.subTitle} />
                        <section className={styles.Detail}>
                            <div className={styles.background}>
                                <img alt={movieDetail.title} src={movieDetail.backgroundImg} />
                            </div>
                            <section className={`${(paused || !metadataVisibility) ? styles.visible : styles.hidden}`}>
                                <div className={styles.imageTitle}>
                                    <img alt={movieDetail.title} src={movieDetail.titleImg} />
                                </div>
                                <div className={styles.contentMeta}>
                                    <div className={styles.controls}>
                                        <button className={styles.player} onClick={handlePause}>
                                            <img src={`/images/${paused ? 'play-icon.svg' : onEnd ? 'replay-icon.svg' : 'pause-icon.svg'}`} alt="" />
                                            <span>{paused ? 'Watch Trailer' : onEnd ? 'Watch again' : 'Pause'}</span>
                                        </button>

                                        <button className={styles.addList}>
                                            <span />
                                            <span />
                                        </button>
                                        <button className={styles.groupWatch}>
                                            <img src="/images/group-icon.png" alt="" />
                                        </button>
                                    </div>
                                    <h3 className={styles.subTitle}>
                                        {movieDetail.subTitle}
                                    </h3>
                                    <p className={styles.description}>{movieDetail.description}</p>
                                </div>
                            </section>
                            {
                                movieDetail.trailer && (
                                    <YouTube
                                        ref={videoRef}
                                        className={styles.backgroundVideo}
                                        video={movieDetail.trailer.videoId}
                                        autoplay
                                        controls={false}
                                        showInfo={false}
                                        showRelatedVideos={false}
                                        disableKeyboard={true}
                                        suggestedQuality={suggestedQuality}
                                        volume={volume}
                                        paused={paused}
                                        onPause={handlePlayerPause}
                                        onEnd={() => setOnEnd(true)}
                                        onPlaying={handlePlayerPlay}
                                    />
                                )
                            }
                        </section>
                    </>
                )
            }
        </>
    )
}

export default Detail;