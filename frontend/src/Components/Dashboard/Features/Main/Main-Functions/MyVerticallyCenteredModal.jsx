import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteMedifile } from '../../../../../ReduxActionsMain/medifilesActions';
import { deleteMyMedifile } from '../../../../../ReduxActionsMain/myMedifilesActions';

export const MyVerticallyCenteredModal = ({ show, onHide, selectedMedifile, deleteMedifile, deleteMyMedifile, myMedifilesList, user }) => {
  // Log the selectedMedifile data for debugging
  console.log("Selected Medifile:", selectedMedifile);
  console.log(myMedifilesList);
console.log(user)
  
  let myMedifileAssociate = myMedifilesList.find(file => file.medifile_id === selectedMedifile.id)
  console.log("found my_medifile association:", myMedifileAssociate ? myMedifileAssociate : "no user association");

  const handleDelete = () => {
      if ((user && user.id === selectedMedifile.file_owner_id) || user.admin) {
        if (myMedifileAssociate && selectedMedifile.id === myMedifileAssociate.medifile_id) {
          console.log("Deleting selected file");
        deleteMyMedifile(myMedifileAssociate.id);
        deleteMedifile(selectedMedifile.id) 
        onHide(); // Close the modal after deletion
        setTimeout(() => {
          alert('file successfully deleted');
        }, 700);
      } else if (!myMedifileAssociate) {
        deleteMedifile(selectedMedifile.id);
        onHide(); // Close the modal after deletion
        setTimeout(() => {
          alert('file successfully deleted');
        }, 700);
      }
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
  myMedifilesList: state.myMedifiles.data,
  user: state.user.data,
});

const mapDispatchToProps = {
    deleteMedifile,
    deleteMyMedifile,
  };

export default connect(mapStateToProps, mapDispatchToProps)(MyVerticallyCenteredModal);
