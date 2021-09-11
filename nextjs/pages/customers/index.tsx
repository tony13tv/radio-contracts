import {useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {GET_CUSTOMERS} from "../../components/queries";
import Loader from "../../components/Loader";
import Pagination from "react-paginate";

export default function Index() {
    const [getCustomers, {called, loading, data}] = useLazyQuery(GET_CUSTOMERS)

    useEffect(() => {
        if (!called) getCustomers({variables: {limit: 1, start: 0}})
    }, [])

    if (called && loading) return <Loader/>
    const changePage = ({selected}) => {
        getCustomers({variables: {limit: 1, start: selected * 10}})
    }

    return <>
        <h1>Clientes</h1>
        <table className="table">
            <thead>
            <tr>
                <th>Nombre</th>
            </tr>
            </thead>
            <tbody>
            {data && data.agencies?.map((customer) => <tr>
                <td>{customer.name}</td>
            </tr>)}
            </tbody>
        </table>
        <Pagination
            activeClassName="active"
            activeLinkClassName="page-link"
            containerClassName="pagination"
            pageClassName="page-item"
            initialPage={0}
            pageCount={data?.agenciesConnection?.aggregate?.totalCount / 10}
            onPageChange={changePage}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}/>
    </>
}