import React, {createContext, useState, useEffect} from 'react'
import UserAPI from './api/UserAPI';
import axios from 'axios';

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)

    const refreshToken = async () => {
        const res = await axios.get('/user/refreshtoken')
        setToken(res.data.accesstoken)
    }
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    },[])
    const state = {
        token: [token, setToken],
        userAPI : UserAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}