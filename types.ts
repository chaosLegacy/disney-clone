export type User = {
    name: string;
    email: string;
    photo: string;
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