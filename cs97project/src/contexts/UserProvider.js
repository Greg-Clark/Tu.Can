import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    function signup(username) {
        setCurrentUser(username);
        localStorage.setItem("user", username);
    };

    function login(username) {
        setCurrentUser(username);
        localStorage.setItem("user", username);
    };

    function signout() {
        setCurrentUser(null);
        localStorage.clear();
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