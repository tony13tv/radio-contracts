import {createReducer} from "@reduxjs/toolkit";
import {setCurrentUser, loggedOut, login, logout} from "../actions/auth";

interface AuthState {
    me: any,
    isFetching: boolean,
    isAuthenticated: boolean,
    errorMessage: string,
}

const initialState: AuthState = {
    me: {username: "Anónimo"},
    isFetching: false,
    isAuthenticated: typeof window !== 'undefined' && !!localStorage.getItem("authenticated"),
    errorMessage: ''
}

export default createReducer<AuthState>(initialState, {
    [login.pending.type]: (state, action) => ({
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ''
    }),
    [login.fulfilled.type]: (state, action) => ({
        ...state,
        isFetching: false,
        isAuthenticated: true,
        loggedIn: action.payload
    }),
    [login.rejected.type]: (state, action) => ({
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload
    }),
    [logout.fulfilled.type]: (state, action) => ({
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: ''
    }),
    [loggedOut.type]: (state, action) => ({
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload
    }),
    [setCurrentUser.type]: (state, action) => ({
        ...state,
        me: action.payload
    })
})