import React from 'react';
import styles from '../../styles/Detail.module.scss'

const Detail = () => {
    const [detailData, setDetailData] = React.useState<any>({});
    return (
        <section className={styles.Detail}>
            <div className={styles.background}>
                <img alt={detailData.title} src={detailData.backgroundImg} />
            </div>
            <div className={styles.imageTitle}>
                <img alt={detailData.title} src={detailData.titleImg} />
            </div>
            <div className={styles.contentMeta}>
                <div className={styles.controls}>
                    <button className={styles.player}>
                        <img src="/images/play-icon-black.png" alt="" />
                        <span>Play</span>
                    </button>
                    <button className={`${styles.player} ${styles.trailer}`}>
                        <img src="/images/play-icon-white.png" alt="" />
                        <span>Trailer</span>
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
    )
}

export default Detail
