import { createSlice } from "@reduxjs/toolkit";
import { State } from "../types";

const initialState: State = {
    error: '',
    user: null,
    movies: {
        recommend: [],
        newDisney: [],
        original: [],
        trending: []
    },
    movieDetail: null
};



// Actions are generated from the methods inside the reducers property
export const { actions, reducer } = createSlice({
    name: 'store',
    initialState,
    reducers: {
        set: (state, action) => ({ ...state, ...action.payload }),
        setMovies: (state, action) => {
            state.movies.recommend = action.payload.recommend;
            state.movies.newDisney = action.payload.newDisney;
            state.movies.original = action.payload.original;
            state.movies.trending = action.payload.trending;
        },
    }
});