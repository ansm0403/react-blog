import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import {User, getAuth, onAuthStateChanged} from 'firebase/auth'
import { app } from 'firebaseApp';

const AuthContext = createContext({
    user : null as User | null,
  });

type Props = {
    children : React.ReactNode;
}

export function AuthContextProvider({children} : Props) {
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
          if(user){
            setCurrentUser(user);
          } else {
            setCurrentUser(user);
          }
        })
    },[auth])
    return (
    <AuthContext.Provider value = {{user : currentUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;