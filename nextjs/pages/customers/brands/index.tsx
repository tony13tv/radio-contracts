import React, { useState } from 'react';
import { useLazyQuery } from "@apollo/client";
import { GET_BRANDS } from "../../../components/queries";
import mock from "../../tables/mock";
import DynamicList from "../../../components/List/DynamicList";

function Brands() {
    const [ page, setPage ] = useState(0)
    const query = useLazyQuery(GET_BRANDS, {
        variables: {
            start: page * 10,
            limit: 10
        }
    })

    const onPageChange = ({ selected }) => {
        setPage(selected)
    }

    return <DynamicList title={"Brands"} query={query}
                        headers={[ 'Model.Customer.NAME', 'Model.Customer.CREATED_AT', 'Model.Customer.CREATED_AT' ]}
                        onPageChange={onPageChange}/>
}

export default Brands