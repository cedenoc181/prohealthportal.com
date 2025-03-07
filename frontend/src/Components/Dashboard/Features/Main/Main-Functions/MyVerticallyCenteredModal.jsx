import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteMedifile } from '../../../../../ReduxActionsMain/medifilesActions';
import "./Modal.css"


export const MyVerticallyCenteredModal = ({ show, onHide, selectedMedifile, deleteMedifile, user }) => {
    const [emailButtonConditional, setEmailButtonConditional] = useState(null);
  
  // Log the selectedMedifile data for debugging
  console.log("Selected Medifile:", selectedMedifile);
console.log(user)

useEffect(() => {
  setEmailButtonConditional((user && user.id === selectedMedifile.file_owner_id) || user.admin)
}, [user])

  
  const handleDelete = () => {
      if (emailButtonConditional) {
          console.log(`Deleting selected file: ${selectedMedifile.title}`);
        deleteMedifile(selectedMedifile.id) 
        onHide(); // Close the modal after deletion
        setTimeout(() => {
          alert('file successfully deleted');
        }, 700);
      } else {
           onHide();
           setTimeout(() => {
            alert("Admin or Publisher authorization required: failed to delete");
          }, 350);
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
          Delete medical form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
      <h2 className="heading-prompt">
          Are you sure you want to delete this medical form?
      </h2>
      <br />
        <h5 className="medical-file-title">{selectedMedifile ? selectedMedifile.title : "No file selected"}</h5>
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
  myMedifilesList: state.myMedifiles.data,
  user: state.user.data,
});

const mapDispatchToProps = {
    deleteMedifile,
  };

export default connect(mapStateToProps, mapDispatchToProps)(MyVerticallyCenteredModal);
