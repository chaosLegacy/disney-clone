import { createContext, useContext } from 'react'
import useFirebaseAuth from '../lib/useFirebaseAuth';

const authUserContext = createContext({
    authUser: null,
    loading: true,
    signOut: async () => { },
    googleSignIn: async () => { },
});

export function AuthUserProvider({ children }: { children: any }) {
    const auth = useFirebaseAuth();
    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);