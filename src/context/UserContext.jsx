import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
export const UserContext = createContext();

export function UserContextProvider({children}) {
    const [currentUser,setCurrentUser] = useState({});

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
          console.log(user)
          setCurrentUser(user)
        });

        return ()=>{
            unsub()
        }
    }, [])

    return (
      <UserContext.Provider value={{currentUser}}>
        {children}
      </UserContext.Provider>
    );
  }