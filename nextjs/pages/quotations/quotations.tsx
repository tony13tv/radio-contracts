import React, { Suspense, useRef } from "react";
import Loading from "../../components/loading";
import DynamicList from "../../components/List/DynamicList";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_CONTRACT, GET_CONTRACTS, GET_CUSTOMERS, GET_TEMPLATES } from "../../components/queries";
import { useTranslation } from "react-i18next";
import useInput from "../../hooks/useInput";
import moment from "moment";
import { toast } from "react-toastify";
import ModalForm from "../../components/ModalForm";
import { Col, Input, Row } from "reactstrap";
import SelectQuery from "../../components/SelectQuery";

function Quotations() {
    const [ t ] = useTranslation()
    const query = useLazyQuery(GET_CONTRACTS)
    const templatesQuery = useLazyQuery(GET_TEMPLATES, { variables: { start: 0, pagination: 10 } })
    const customersQuery = useLazyQuery(GET_CUSTOMERS, { variables: { start: 0, pagination: -1 } })
    const [ number, setNumber, onNumberChange ] = useInput()
    const [ template, setTemplate, onTemplateChange ] = useInput()
    const [ customer, setCustomer, onCustomerChange ] = useInput()
    const [ create ] = useMutation(CREATE_CONTRACT)
    const modal = useRef<any>()

    const getContractNumber = (number) => {
        return `${(number ?? 'xxxx-xxxx').padStart(8, '0').replaceAll(/(\d{4})(\d{4})/g, '$1-$2')}-${(moment().get('month') + 1).toString().padStart(2, '0')}-${(moment().get('year'))}`
    }

    const onActionClick = () => {
        if (number)
            create({
                variables: {
                    number: getContractNumber(number),
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
                    <label>
                        Número de contrato
                    </label>
                    <Input name="Number" placeholder={t('Contract.NUMBER')} onChange={onNumberChange}
                           defaultValue={number}/>
                </Col>
                <Col>
                    <label>
                        &nbsp;
                    </label>
                    <Input readOnly value={getContractNumber(number)}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <label>
                        Plantilla
                    </label>
                    <SelectQuery query={templatesQuery} onChange={onTemplateChange}/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <label>
                        Cliente
                    </label><SelectQuery query={customersQuery} onChange={onCustomerChange}/>
                </Col>
            </Row>
        </ModalForm>
    </Suspense>
}

export default Quotations