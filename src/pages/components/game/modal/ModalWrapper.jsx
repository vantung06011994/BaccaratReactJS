import { Modal } from "react-bootstrap";
import React from "react";
import { onClickAudio } from "utils";

export default function ModalWrapper(props) {
    const { modalTitle, show, handleClose, idRef, childClass } = props;
    const onModalClose = () => {
        handleClose(idRef);
        onClickAudio();
    };
    return (
        <Modal show={show} onHide={onModalClose} keyboard={true}>
            <Modal.Header closeButton closeLabel="">
                <h3 className="modal-title"> {modalTitle}</h3>
            </Modal.Header>
            <Modal.Body className={childClass}>{props.children}</Modal.Body>
        </Modal>
    );
}
