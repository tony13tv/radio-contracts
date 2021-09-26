import React, { Suspense, useState } from 'react';
import Loading from "../../../components/loading";
import { useLazyQuery } from "@apollo/client";
import { GET_AGENCIES } from "../../../components/queries";
import DynamicList from "../../../components/List/DynamicList";

function Agencies() {
    const query = useLazyQuery(GET_AGENCIES)

    return typeof window !== 'undefined' && <Suspense fallback={<Loading/>}>
        <DynamicList title={"Agencies"} query={query}
                     headers={[ 'Customer.NAME' ]}
                     rowRenderer={item => ([
                         <td>{item.name}</td>
                     ])}/>
    </Suspense>
}

export default Agencies