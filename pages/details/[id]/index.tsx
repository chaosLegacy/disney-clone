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



const Detail = ({ detailData, youtubeData }: { detailData: MovieData, youtubeData: youtubeSnippet }) => {
    const { authUser, loading } = useAuth();
    const router = useRouter();
    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        if (!loading && !authUser)
            router.push('/auth')
    }, [authUser, loading])

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
            <Meta title={detailData.title} description={detailData.description} keywords={detailData.subTitle} />
            <section className={styles.Detail}>
                <div className={styles.background}>
                    <img alt={detailData.title} src={detailData.backgroundImg} />
                </div>
                <section className={`${(paused || !metadataVisibility) ? styles.visible : styles.hidden}`}>
                    <div className={styles.imageTitle}>
                        <img alt={detailData.title} src={detailData.titleImg} />
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
                            {detailData.subTitle}
                        </h3>
                        <p className={styles.description}>{detailData.description}</p>
                    </div>
                </section>
                {
                    youtubeData && (
                        <YouTube
                            ref={videoRef}
                            className={styles.backgroundVideo}
                            video={youtubeData.videoId}
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

export default Detail


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const movieRef = collection(db, 'portfolio/disneyClone/movies');
    const docId: string = context.params.id.toString();
    const movieDoc = doc(movieRef, docId);
    const data = await getDoc(movieDoc);
    const detailData = data.data() as MovieData;

    const youtubeReq = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${detailData.title},trailer&type=video&maxResults=1&key=${process.env.YOUTUBE_DATA_API_KEY}`)
    const youtubeRes = await youtubeReq.json();
    // let youtubeData = { videoId: 'yRUAzGQ3nSY' }; // Only for testing
    let youtubeData: youtubeSnippet = null;
    console.log(youtubeRes.error && youtubeRes.error.message);
    if (youtubeRes.items && youtubeRes.items.length) {
        youtubeData = youtubeRes.items[0].snippet as youtubeSnippet;
        youtubeData.videoId = youtubeRes.items[0].id.videoId;
    }
    if (data.exists && youtubeData) {
        return {
            props: {
                detailData,
                youtubeData
            }
        }
    }

    return {
        props: {
            detailData: {},
            youtubeData
        }
    }
}