import React, { useEffect } from "react";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

import s from "./Layout.module.scss";
import { useAppDispatch, useAppSelector } from "../../reducers";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Layout({ children }) {

    const router = useRouter()
    const dispatch = useAppDispatch()

    const { sidebarOpened, isAuthenticated, message } = useAppSelector(store => ({
        isAuthenticated: store.auth.isAuthenticated,
        message: store.auth.message,
        sidebarOpened: store.navigation.sidebarOpened,
    }))

    const { data } = useQuery(gql`query { pagination { itemsPerPage } }`)

    useEffect(function () {
        if (router.pathname !== '/login' && !isAuthenticated) {
            router.push('/login', '/login')
        } else if (router.pathname === '/login' && isAuthenticated) {
            router.push('/dashboard', '/dashboard')
        }
    }, [])

    useEffect(() => {
        if (data && data.hasOwnProperty('pagination'))
            dispatch({ type: 'SET_PAGINATION', payload: data.pagination })
    }, [ data ])

    useEffect(() => {
            console.log('message', message)
            if (message && message.type) {
                toast[message.type](<>{message.content}</>)
            }
        }
        , [ message ])

    if ([ 'Login', 'Register' ].includes(children.type.name))
        return children

    const pathname = Object.keys(router.query).reduce((p, c, i, v) => p.replace(`[${c}]`, router.query[c] as string), router.pathname)

    return (
        <div className={s.root}>
            <div className={s.wrap}>
                <Header/>
                <Sidebar/>
                <main className={s.content}>
                    <Breadcrumbs url={pathname}/>
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
    );
}

export default Layout;
