import { Button, Col, Input, ModalBody, ModalFooter, ModalHeader, Modal, Row } from "reactstrap";
import React, { PropsWithChildren, useEffect, useImperativeHandle, useState } from "react";
import { BiLoader } from "react-icons/bi";

interface Props extends PropsWithChildren<any> {
    title,
    children,
    onActionClick,
    actionText?,
    onCancelClick,
    onOpen?
}

const ModalForm = React.forwardRef(({
                                        title,
                                        children,
                                        onActionClick,
                                        actionText,
                                        onCancelClick,
                                        onOpen
                                    }: Props, ref) => {
    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const toggle = () => setOpen(!open)

    useImperativeHandle(ref, () => ({
        open: () => setOpen(true)
    }))

    useEffect(onOpen ?? (() => {}), [ open ])

    const actionWrapper = async () => {
        setLoading(true)
        await onActionClick?.()
        setLoading(false)
    }

    return <Modal isOpen={open} toggle={toggle} size={'lg'}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
            {children}
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={actionWrapper}>{actionText ?? 'Guardar'} {loading &&
            <BiLoader/>}</Button>{' '}
            <Button color="secondary" onClick={onCancelClick}>Cancel</Button>
        </ModalFooter>
    </Modal>
})

export default ModalForm