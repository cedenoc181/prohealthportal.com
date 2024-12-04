import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteMedifile } from '../../../../../ReduxActionsMain/medifilesActions';

export const MyVerticallyCenteredModal = ({ show, onHide, selectedMedifile, deleteMedifile }) => {
  // Log the selectedMedifile data for debugging
  console.log("Selected Medifile:", selectedMedifile);

  const handleDelete = () => {
    if (selectedMedifile && selectedMedifile.id) {
        console.log("Deleting selected file");
      deleteMedifile(selectedMedifile.id);
      onHide(); // Close the modal after deletion
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Medifile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{selectedMedifile ? selectedMedifile.title : "No file selected"}</h4>
        <p>
          Are you sure you want to delete this medifile?
        </p>
        <p>
          <strong>Description:</strong> {selectedMedifile ? selectedMedifile.description : ""}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  selectedMedifile: state.medifiles.selectedMedifile,
});

const mapDispatchToProps = {
    deleteMedifile,
  };

export default connect(mapStateToProps, mapDispatchToProps)(MyVerticallyCenteredModal);
