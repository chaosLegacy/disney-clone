export type User = {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
}

export type Movie = {
    recommend: any;
    newDisney: any;
    original: any;
    trending: any;
}

export type State = {
    error: string;
    user: null | User;
    movie: Movie
}