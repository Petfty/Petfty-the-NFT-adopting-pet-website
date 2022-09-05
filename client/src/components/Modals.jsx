import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function Modals(props) {
  const { showModal, modalProps, setShowModal } = props;
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        style={{
          marginTop: "-500px",
          width: "30%",
          height: "200%",
          marginLeft: "250px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header
          style={{ border: 0, backgroundColor: "black", opacity: 0.8 }}
        >
          <Modal.Title style={{ color: "white" }}>
            {modalProps.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer
          style={{ border: 0, backgroundColor: "black", opacity: 0.8 }}
        >
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            닫기
          </Button>
          {modalProps.isConfirm ? (
            <Button
              variant="primary"
              onClick={() => {
                modalProps.onConfirm();
                setShowModal(false);
              }}
              style={{ backgroundColor: "#810034", borderColor: "#810034" }}
            >
              진행
            </Button>
          ) : (
            modalProps.onConfirm()
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
