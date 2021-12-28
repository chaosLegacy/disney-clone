import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { State } from '../types';
import { reducer } from './reducer';

const store = configureStore({
    reducer,
    devTools: true,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store;

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;