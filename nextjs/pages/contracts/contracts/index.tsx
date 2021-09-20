import React, { Suspense, useState } from "react";
import Loading from "../../../components/loading";
import DynamicList from "../../../components/List/DynamicList";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_CONTRACT, GET_CONTRACTS } from "../../../components/queries";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import useInput from "../../../hooks/useInput";
import moment from "moment";
import { toast } from "react-toastify";

function Contracts() {
    const [ t ] = useTranslation()
    const query = useLazyQuery(GET_CONTRACTS)
    const [ modal, setModal ] = useState(false)
    const toggle = () => setModal(!modal)
    const [ number, setNumber, onNumberChange ] = useInput()
    const [ create ] = useMutation(CREATE_CONTRACT)

    const onCreateClick = () => {
        create({ variables: { number: `${(number ?? 'xxxx-xxxx').padStart(8, '0').replaceAll(/(\d{4})(\d{4})/g, '$1-$2')}-${(moment().get('month') + 1).toString().padStart(2, '0')}-${(moment().get('year'))}` } })
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
                     headers={[ 'Contract.NUMBER', 'Contract.CREATED_AT', 'Contract.UPDATED_AT' ]}
                     onAddClick={(e) => {
                         setModal(true)
                     }}/>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Agregar Contrato</ModalHeader>
            <ModalBody>
                <Row>
                    <Col><Input name="Number" placeholder={t('Contract.NUMBER')} onChange={onNumberChange}
                                defaultValue={number}/></Col>
                    <Col><Input readOnly
                                value={`${(number ?? 'xxxx-xxxx').padStart(8, '0').replaceAll(/(\d{4})(\d{4})/g, '$1-$2')}-${(moment().get('month') + 1).toString().padStart(2, '0')}-${(moment().get('year'))}`}/></Col>
                </Row>
                <Row>
                    <Col><Input type="select"/></Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onCreateClick}>Guardar</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </Suspense>
}

export default Contracts