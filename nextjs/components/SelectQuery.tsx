import { Input } from "reactstrap";
import React, { useEffect } from "react";
import { BiLoader } from "react-icons/bi";

function SelectQuery({ query, onChange }) {
    const [ getItems, { loading, data: { items } = { items: null }, called } ] = query

    useEffect(() => {
        if (!called) getItems()
    }, [])

    return <Input type="select" onChange={onChange}>
        <option disabled={true}>--- Seleccione una opción ---</option>
        {loading && <BiLoader/> || items?.map(item => <option value={item.name}>{item.name}</option>) ||
        <option disabled={true}>No hay opciones</option>}
    </Input>
}

export default SelectQuery