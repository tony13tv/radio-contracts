import React, {useEffect, useState} from 'react';
import moment from "moment";
import Loading from "../../../components/loading";
import {useLazyQuery} from "@apollo/client";
import {GET_BRANDS} from "../../../components/queries";
import Link from 'next/link';
import mock from "../../tables/mock";
import DynamicList from "../../../components/List/DynamicList";

function Brands() {
    const [firstTable] = useState(mock.firstTable);
    const [secondTable] = useState(mock.secondTable);

    const pageSize = 4;
    const firstTablePagesCount = Math.ceil(firstTable.length / pageSize);
    const secondTablePagesCount = Math.ceil(secondTable.length / pageSize);


    const [getAgencies, {called, loading, data}] = useLazyQuery(GET_BRANDS, {variables: {start: 0}})

    useEffect(() => {
        if (!called) getAgencies()
    }, [])

    if (called && loading) return <Loading/>

    const Tables = () => {
        return <table className="table table-stripped">
            <thead>
            <tr>
                <td>Nombre</td>
                <td>Creado</td>
                <td>Acciones</td>
            </tr>
            </thead>
            <tbody>
            {data && data.customers.map((agency: any) => <tr>
                <td>{agency.name}</td>
                <td>{moment(agency.createdAt).format('LLL')}</td>
                <td><Link href={`/customer/agencies/edit/${agency.id}`}>Editar</Link></td>
            </tr>)}
            </tbody>
        </table>
    }

    const onPageChange = ({selected}) => {
        getAgencies({variables: {start: selected * 10}})
    }

    return <DynamicList title={"Agencies"} data={data?.customers.map(customer => ({...customer, img: {...customer.img, src: "http://localhost:1337" + (customer.img?.src ?? '/favicon.ico')}}))}
                        headers={['Model.Customer.NAME', 'Model.Customer.CREATED_AT', 'Model.Customer.CREATED_AT']}
                        pageCount={data?.total?.aggregate?.count / 10}
                        onPageChange={onPageChange}/>
}

export default Brands