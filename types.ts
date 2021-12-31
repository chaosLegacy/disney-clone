import { StringLike } from "@firebase/util"

export type User = {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
}

export type youtubeThumbnails = {
    default: {
        url: string;
        width: string;
        height: string;
    },
    medium: {
        url: string;
        width: string;
        height: string;
    },
    high: {
        url: string;
        width: string;
        height: string;
    }
}
export type youtubeSnippet = {
    publishedAt?: string;
    channelId?: string;
    videoId: string;
    title?: string;
    description?: string;
    thumbnails?: youtubeThumbnails;
    channelTitle?: string;
    liveBroadcastContent?: string;
    publishTime?: string;
}

export type MovieData = {
    id: string;
    backgroundImg: string;
    cardImg: string;
    description: string;
    subTitle: string;
    title: string;
    titleImg: string;
    type: 'new' | 'recommend' | 'trending' | 'original';
    trailer: youtubeSnippet
}

export type Movies = {
    recommend: Array<MovieData | any>;
    newDisney: Array<MovieData | any>;
    original: Array<MovieData | any>;
    trending: Array<MovieData | any>;
}

export type State = {
    error: string;
    user: null | User;
    movies: Movies,
    movieDetail: MovieData
}