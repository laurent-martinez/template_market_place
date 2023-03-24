import React, {
  createContext, useContext, useEffect, useState, useMemo,
} from 'react';
import {
  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

interface AuthContextValue {
  userDeclare: any | null;
}

const AuthContext = createContext<AuthContextValue>({ userDeclare: null });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children } :{ children: React.ReactNode }) {
  const [userDeclare, setUserDeclare] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserDeclare({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        // User is signed out
        setUserDeclare(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authContextValue = useMemo(() => {
    const signup = (email: string, password: string) => {
      createUserWithEmailAndPassword(auth, email, password);
    };
    const login = (email: string, password: string) => {
      signInWithEmailAndPassword(auth, email, password);
    };
    const logout = async () => {
      setUserDeclare(null);
      await signOut(auth);
    };
    return {
      userDeclare, login, logout, signup,
    };
  }, [userDeclare]);
  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
