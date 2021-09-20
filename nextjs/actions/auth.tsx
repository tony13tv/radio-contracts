import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN } from "../components/queries";
import { toast } from "react-toastify";

interface DoLoginParams {
    username: string,
    password: string
}

export const receiveLogin = createAction('receiveLogin')

export const session = createAsyncThunk('entrance/session', () => {
})

export const login = createAsyncThunk('entrance/login', async ({ username, password }: DoLoginParams, {
    extra,
    dispatch,
    rejectWithValue
}) => {
    let api: any = extra;
    try {
        const { data } = await api.mutate({ mutation: LOGIN, variables: { username, password } })
        dispatch(setCurrentUser(data.login.user))
        toast.success(`Bienvenido ${data.login.user.username}`)
        return true
    } catch ({ graphQLErrors, clientErrors, networkError, message }) {
        toast.error(graphQLErrors[0].extensions.exception.data.message[0].messages[0].message)
        return rejectWithValue(false)
    }
})
export const setCurrentUser = createAction<any>('entrance/login/current')

export const logout = createAction('account/logout', () => {
    toast.info('Sesión cerrada exitosamente.')
    return { payload: false }
})