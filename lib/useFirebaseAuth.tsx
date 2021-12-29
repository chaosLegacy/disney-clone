import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/reducer';
import { User } from '../types';
import { auth } from './firebase';

const formatAuthUser = (user: User) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
});

const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const authStateChanged = async (authState: any) => {

        if (!authState) {
            setAuthUser(null);
            setLoading(false);

            dispatch(actions.set({ user: null }));
            return;
        }

        setLoading(true)
        const formattedUser = formatAuthUser(authState);
        setAuthUser(formattedUser);
        setLoading(false);

        dispatch(actions.set({ user: authState }));

    };

    const signOut = async () => {
        await auth.signOut();
        setAuthUser(null);
        setLoading(true);

        dispatch(actions.set({ user: null }));
    }
    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading,
        signOut
    };
}

export default useFirebaseAuth
