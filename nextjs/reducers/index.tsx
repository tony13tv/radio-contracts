import { configureStore } from "@reduxjs/toolkit"
import auth from "./auth"
import navigation from "./navigation"
// import register from "./register"
import global from "./global"
import { client } from "../config/gql";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useMemo } from "react";

export const rootReducer = {
    auth, navigation, global
}

export const loadState = () => {
    try {
        const serializedData = localStorage.getItem('state')
        if (serializedData === null) {
            return undefined // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
        }
        return JSON.parse(serializedData) // Si encontramos con éxito nuestro storage lo devolvemos.
    } catch (error) {
        return undefined // Si ocurre algún error, devuelvo undefined para cargar el state inicial.
    }
}

export const saveState = (state: RootState) => {
    try {
        let serializedData = JSON.stringify(state)
        localStorage.setItem('state', serializedData)
    } catch (error) {
        // Acá podemos capturar o crear cualquier log que deseemos en caso de que falle el salvado en el storage.
    }
}

export const store = configureStore({
    reducer: rootReducer, preloadedState: loadState(),
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: { extraArgument: client } })
})

store.subscribe(() => saveState(store.getState()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useStore(initialState) {
    return useMemo(() => store, [ initialState ])
}