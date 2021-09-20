import { createReducer } from "@reduxjs/toolkit";
import { login, logout, setCurrentUser } from "../actions/auth";

interface AuthState {
    me: any,
    isFetching: boolean,
    isAuthenticated: boolean,
}

const initialState: AuthState = {
    me: { username: "Anónimo" },
    isFetching: false,
    isAuthenticated: false,
}

export default createReducer<AuthState>(initialState, {
    [login.pending.type]: (state, action) => ({
        ...state,
        isFetching: true,
        isAuthenticated: false,
    }),
    [login.fulfilled.type]: (state, action) => ({
        ...state,
        isFetching: false,
        isAuthenticated: action.payload,
    }),
    [login.rejected.type]: (state, action) => ({
        ...state,
        isFetching: false,
        isAuthenticated: action.payload
    }),
    [logout.type]: (state, action) => ({
        ...state,
        isFetching: false,
        isAuthenticated: action.payload
    }),
    [setCurrentUser.type]: (state, action) => ({
        ...state,
        me: action.payload
    })
})