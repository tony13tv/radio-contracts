import { createReducer } from "@reduxjs/toolkit";
import { login, logout, setCurrentUser } from "../actions/auth";

interface AuthState {
    me: any,
    isFetching: boolean,
    isAuthenticated: boolean,
    message: { type: string, content: string },
}

const initialState: AuthState = {
    me: { username: "Anónimo" },
    isFetching: false,
    isAuthenticated: typeof window !== 'undefined' && !!localStorage.getItem("authenticated"),
    message: null
}

export default createReducer<AuthState>(initialState, {
    [login.pending.type]: (state, action) => ({
        ...state,
        isFetching: true,
        isAuthenticated: false,
        message: null
    }),
    [login.fulfilled.type]: (state, action) => ({
        ...state,
        isFetching: false,
        isAuthenticated: true,
        message: action.payload
    }),
    [login.rejected.type]: (state, action) => ({
        ...state,
        isFetching: false,
        isAuthenticated: false,
        message: action.payload
    }),
    [logout.fulfilled.type]: (state, action) => ({
        ...state,
        isFetching: false,
        isAuthenticated: false,
        message: action.payload
    }),
    [setCurrentUser.type]: (state, action) => ({
        ...state,
        me: action.payload
    })
})