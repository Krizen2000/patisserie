import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function PromptPopUp({ promptData, setPromptData }) {
  return (
    <Modal backdrop="static" show={promptData.visible} centered>
      <Modal.Header
        closeButton
        onClick={() => setPromptData({ ...promptData, visible: false })}
      >
        <Modal.Title>{promptData.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{promptData.message}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setPromptData({ ...promptData, visible: false })}
        >
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            setPromptData({ ...promptData, visible: false, proceed: true })
          }
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
