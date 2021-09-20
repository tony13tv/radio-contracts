import React, { useEffect } from "react";
import useInput from "../hooks/useInput";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../components/queries";
import Loader from "../components/Loader";

export default function Login() {
    const [ username, setUsername, handleUsername ] = useInput()
    const [ password, setPassword, handlePassword ] = useInput()
    const [ login, { data, loading, error } ] = useMutation(LOGIN)

    useEffect(() => {
        localStorage.setItem("jwt", data?.login?.jwt)
    }, [ data ])

    if (loading) return <Loader/>
    if (error) return <details>Error
        <summary>{JSON.stringify(error)}</summary>
    </details>

    return <form>
        <input type="text" name="username" onChange={handleUsername}/>
        <input type="password" name="password" onChange={handlePassword}/>
        <button type="submit" onClick={() => login({ variables: { username, password } })}>Ingresar</button>
    </form>
}