import React, { Suspense, useEffect, useRef } from "react";
import Loading from "../../components/loading";
import DynamicList from "../../components/List/DynamicList";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_CONTRACT, GET_CLAUSES, GET_CONTRACTS, GET_CUSTOMERS, GET_TEMPLATES } from "../../components/queries";
import { useTranslation } from "react-i18next";
import useInput from "../../hooks/useInput";
import moment from "moment";
import { toast } from "react-toastify";
import ModalForm from "../../components/ModalForm";
import { Col, Input, Row } from "reactstrap";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import DualListBox from 'react-dual-listbox';

function Templates() {
    const [ t ] = useTranslation()
    const query = useLazyQuery(GET_CONTRACTS)
    const templatesQuery = useLazyQuery(GET_TEMPLATES, { variables: { start: 0, pagination: 10 } })
    const customersQuery = useLazyQuery(GET_CUSTOMERS, { variables: { start: 0, pagination: -1 } })
    const [ name, setName, onNameChange ] = useInput()
    const [ template, setTemplate, onTemplateChange ] = useInput()
    const [ customer, setCustomer, onCustomerChange ] = useInput()
    const [ create ] = useMutation(CREATE_CONTRACT)
    const modal = useRef<any>()

    const clausesQuery = useLazyQuery(GET_CLAUSES, { variables: { start: 0, pagination: -1 } })
    useEffect(() => {
        if (!clausesQuery[1].called) clausesQuery[0]()
    }, [])

    const getContractNumber = (number) => {
        return `${(number ?? 'xxxx-xxxx').padStart(8, '0').replaceAll(/(\d{4})(\d{4})/g, '$1-$2')}-${(moment().get('month') + 1).toString().padStart(2, '0')}-${(moment().get('year'))}`
    }

    const onActionClick = () => {
        if (name)
            create({
                variables: {
                    number: getContractNumber(name),
                    clauses: [ { description: "", clause: 1 } ],
                    customer, template
                }
            })
                .then(({ data }) => toast.success(`Contrato ${data.createContract.contract.number} creado exitosamente.`))
                .catch(({ graphQLErrors }) => {
                    if (graphQLErrors[0].message == 'Duplicate entry')
                        toast.warning('El contrato que desear agregar ya existe.')
                    if (graphQLErrors[0].message == 'Forbidden')
                        toast.error('No tiene permisos para realizar esta acción.')
                })
    }

    return typeof window !== 'undefined' && <Suspense fallback={<Loading/>}>
        <DynamicList title={"Contracts"} query={query}
                     headers={[ 'Contract.NUMBER' ]}
                     onAddClick={(e) => {
                         modal.current && modal.current.open(true)
                     }}
                     rowRenderer={item => <>
                         <td>{item.number}</td>
                     </>}/>
        <ModalForm title="Agregar Contrato" onActionClick={onActionClick} onCancelClick={() => {
        }} ref={modal}>
            <Row className="mb-2">
                <Col>
                    <label>Nombre</label>
                    <Input name="Name" placeholder={t('Template.NAME')} onChange={onNameChange}
                           defaultValue={name}/>
                </Col>
                <Col>
                    <label>&nbsp;</label>
                    <Input readOnly value={getContractNumber(name)}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <label>Cláusulas</label>
                    <DualListBox canFilter options={clausesQuery[1].data ||[]} filterCallback={(option, filterInput) => {
                        if (filterInput === '') return true;
                        return (new RegExp(filterInput, 'i')).test(option.label)
                    }}/>
                </Col>
            </Row>
        </ModalForm>
    </Suspense>
}

export default Templates