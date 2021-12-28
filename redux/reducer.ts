import { createSlice } from "@reduxjs/toolkit";
import { State } from "../types";

const initialState: State = {
    error: '',
    user: null,
    movie: {
        recommend: null,
        newDisney: null,
        original: null,
        trending: null
    }
};



// Actions are generated from the methods inside the reducers property
export const { actions, reducer } = createSlice({
    name: 'store',
    initialState,
    reducers: {
        set: (state, action) => ({ ...state, ...action.payload }),
        setMovies: (state, action) => {
            state.movie.recommend = action.payload.recommend;
            state.movie.newDisney = action.payload.newDisney;
            state.movie.original = action.payload.original;
            state.movie.trending = action.payload.trending;
        },
    }
});