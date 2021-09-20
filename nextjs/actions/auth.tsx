import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN } from "../components/queries";

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
        return { type: 'success', content: `Bienvenido ${data.login.user.username},` }
    } catch ({ graphQLErrors, clientErrors, networkError, message }) {
        console.log(graphQLErrors, clientErrors, networkError)
        return rejectWithValue({
            type: 'error',
            content: graphQLErrors[0].extensions.exception.data.message[0].messages[0].message
        })
    }
})
export const setCurrentUser = createAction<any>('entrance/login/current')

export const logout = createAsyncThunk('account/logout', async (a: void, { dispatch }) => {
    return { type: 'success', content: 'Ha salido del sistema.' }
})