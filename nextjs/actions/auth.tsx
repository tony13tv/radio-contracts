import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

interface DoLoginParams {
    username: string,
    password: string
}

export const receiveLogin = createAction('receiveLogin')

export const session = createAsyncThunk('entrance/session', () => {
})

export const login = createAsyncThunk('entrance/login', async ({username, password}: DoLoginParams, {
    extra,
    dispatch,
    rejectWithValue
}) => {
    let api: any = extra;
    try {
        const {data} = await api.put('/v1/entrance/login', {emailAddress: username, password: password})
        toast.success(`Bienvenido ${data}`)
        dispatch(setCurrentUser(data))
        return "OK"
    } catch ({response: {data, headers, status}}) {
        if (status >= 400) {
            return rejectWithValue(headers['x-exit-description'])
        }
        return rejectWithValue(data)
    }
})
export const setCurrentUser = createAction<any>('entrance/login/current')

export const loggedIn = createAction('entrance/login/fulfilled')

export const logout = createAsyncThunk('account/logout', async (a: void, {rejectWithValue, extra}) => {
    let api: any = extra
    const {data} = await api.get('/v1/account/logout')
    return data
})

export const loggedOut = createAction<string>('account/logout/fulfilled')