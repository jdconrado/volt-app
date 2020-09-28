import {createContext, useContext} from 'react';

const user = {
    name: undefined,
    username: undefined,
    mail_confirmed: undefined,
    loggedIn: false
}

export const userContext = createContext(user);
export const updateUserContext = createContext(undefined);

export const useUserContext = () =>[
    useContext(userContext),
    useContext(updateUserContext)
]