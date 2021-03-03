import React, { createContext, useContext, useState } from 'react';


const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    function signup(username) {
        setCurrentUser(username);
    };

    function login(username) {
        setCurrentUser(username);
    };

    function signout() {
        setCurrentUser(null);
    };

    const value = {
        currentUser, 
        login,
        signup,
        signout,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}