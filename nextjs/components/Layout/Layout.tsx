import React, {useEffect} from "react";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

import s from "./Layout.module.scss";
import {useAppDispatch, useAppSelector} from "../../reducers";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs";
import {useRouter} from "next/router";
import {gql, useQuery} from "@apollo/client";


function Layout({children}) {

    const router = useRouter()
    const dispatch = useAppDispatch()

    const {sidebarOpened} = useAppSelector(store => ({
        sidebarOpened: store.navigation.sidebarOpened,
    }))

    const {data} = useQuery(gql`query {pagination { itemsPerPage}}`)

    useEffect(() => {
        if (data.hasOwnProperty('pagination'))
            dispatch({type: 'SET_PAGINATION', payload: data.pagination})
    }, [data])

    if (['Login', 'Register'].includes(children.type.name))
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
