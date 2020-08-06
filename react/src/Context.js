
import React from 'react';

const AuthContext=React.createContext({
    user: null,
    isLoggedIn:false,
    logIn: () => {},
    logOut: () => {}
})

export default AuthContext;