import React, {useState}  from "react";
import { Modal, Button } from "react-bootstrap";

const PopupBox = (props) => {

    const [show, setShow] = useState(true);

    const showValue = props.show;
    const message = props.message;

    setShow(showValue);
    const handleClose = () => {showValue=false; setShow(showValue)}

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>PDF failo klaidos</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Uždaryti
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default PopupBox;