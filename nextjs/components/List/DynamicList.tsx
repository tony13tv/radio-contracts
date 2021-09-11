import React, {useEffect, useState} from "react";
import s from "../../pages/tables/tables.page.module.scss";
import searchIcon from "../../assets/tables/searchIcon.svg";
import cloudIcon from "../../assets/tables/cloudIcon.svg";
import printerIcon from "../../assets/tables/printerIcon.svg";
import optionsIcon from "../../assets/tables/optionsIcon.svg";
import funnelIcon from "../../assets/tables/funnelIcon.svg";
import {Label} from "reactstrap";
import Pagination from "react-paginate";
import Widget from "../Widget/Widget";
import {Table} from 'reactstrap'
import {v4 as uuidv4} from 'uuid'
import {useTranslation} from "react-i18next";
import moment from "moment";
import {useLazyQuery} from "@apollo/client";
import Toast from "react-toastify";
import Loading from "../loading";

export default function DynamicList({
                                        title,
                                        headers,
                                        page = 0,
                                        data = undefined,
                                        query = undefined,
                                        onPageChange
                                    }) {
    const [state, setState] = useState({})
    const [t, i18n] = useTranslation()
    const [getItems, {
        loading,
        data: {items, total: {aggregate: {count: pageCount}}} = {
            items: null,
            total: {aggregate: {count: null}}
        },
        called,
        refetch
    }] = query

    useEffect(() => {
        if (!called) getItems()
    }, [])

    useEffect(() => {
        if (called) refetch().catch(() => Toast.toast("Refetched"))
    }, [page])

    return <Widget>
        <div className={s.tableTitle}>
            <div className="headline-2">{title}</div>
            <div className="d-flex">
                <a href="/#"><img src={searchIcon.src} alt="Search"/></a>
                <a href="/#"><img className="d-none d-sm-block" src={cloudIcon.src} alt="Cloud"/></a>
                <a href="/#"><img src={printerIcon.src} alt="Printer"/></a>
                <a href="/#"><img className="d-none d-sm-block" src={optionsIcon.src} alt="Options"/></a>
                <a href="/#"><img src={funnelIcon.src} alt="Funnel"/></a>
            </div>
        </div>
        <div className="widget-table-overflow">
            <Table className={`table-striped table-borderless table-hover ${s.statesTable}`}
                   responsive>
                <thead>
                <tr>
                    <th className={s.checkboxCol}>
                        <div className="checkbox checkbox-primary">
                            <input
                                className="styled"
                                id="checkbox100"
                                type="checkbox"
                            />
                            <label htmlFor="checkbox100"/>
                        </div>
                    </th>
                    {headers.map(header => <th key={uuidv4()} className="w-25">{t(header)}</th>)}
                </tr>
                </thead>
                <tbody>
                {loading && <Loading/> || items?.map?.(item => (
                    <tr key={uuidv4()}>
                        <td>
                            <div className="checkbox checkbox-primary">
                                <input
                                    id={item.id}
                                    className="styled"
                                    type="checkbox"
                                />
                                <Label for={item.id}/>
                            </div>
                        </td>
                        <td className="d-flex align-items-center">
                            <img className={s.image} src={item.img?.src} alt="User"/>
                            <span className="ml-3">{item.name}</span>
                        </td>
                        <td>{moment(item.created_at).calendar()}</td>
                        <td>{moment(item.updated_at).calendar()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {pageCount > 0 && <Pagination
                activeClassName="active"
                pageLinkClassName="page-link p-0"
                containerClassName="pagination pagination-borderless"
                pageClassName="page-item"
                initialPage={page}
                pageCount={pageCount / 10}
                onPageChange={onPageChange}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}/>}
        </div>
    </Widget>
}