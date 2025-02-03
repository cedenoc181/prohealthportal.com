import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deletePatientEmail } from "../../../../../ReduxActionsMain/patientEmailActions";
import { deleteDoctorEmail } from "../../../../../ReduxActionsMain/doctorEmailActions";
import "./Modal.css";

export const EmailDeleteModal = ({
  show,
  onHide,
  selectedPxEmail,
  selectedDrEmail,
  status,
  exitModalFunction,
  deletePatientEmail,
  deleteDoctorEmail,
  user,
}) => {
  const [emailButtonConditional, setEmailButtonConditional] = useState(null);

  const [rendering , setRendering] = useState(status);

  useEffect(() => {
    setRendering(status);
  }, [status]);
  
  useEffect(() => {
    if (selectedPxEmail) {
      setEmailButtonConditional(user.admin || (user.id === selectedPxEmail.px_owner_id));
      console.log("✅ Selected patient email for Delete method:", selectedPxEmail);
    }
  }, [selectedPxEmail, user]);

  useEffect(() => {
    if (selectedDrEmail) {
      setEmailButtonConditional(user.admin || (user.id === selectedDrEmail.dr_owner_id));
      console.log("✅ Selected doctor email for Delete method:", selectedDrEmail);
    }
  }, [selectedDrEmail, user]);
  
  
  console.log("delete modal status false for doctor true for patient", status);


  function handleDeleteEmailTemplate() {
    if (emailButtonConditional && rendering) {
      deletePatientEmail(selectedPxEmail.id);
      setTimeout(() => {
        alert("This email template has been deleted successfully");
        onHide();
        exitModalFunction(true);
      }, 400);
    } else if (emailButtonConditional && !rendering) {
        console.log(rendering);
        deleteDoctorEmail(selectedDrEmail.id);
            setTimeout(() => {
              alert("This email template has been deleted successfully");
              onHide();
              exitModalFunction(true);
            }, 400);
     } else {
     onHide();
      setTimeout(() => {
        alert("Admin or Publisher authorization required: failed to delete");
        exitModalFunction(true);
      }, 350);
    }
  }


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
          Delete Email Template
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <h2 className="heading-prompt">Are you sure you want to delete this email template?</h2>
        <br />
        <h5 className="email-title-modal">
          {rendering
            ? selectedPxEmail?.px_temp_title 
            : selectedDrEmail?.dr_temp_title 
            }
        </h5>
        <p>
          <strong>Content:</strong>{" "}
          {
          rendering
            ? selectedPxEmail?.px_temp_content
            : selectedDrEmail?.dr_temp_content
            }
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDeleteEmailTemplate}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  selectedPxEmail: state.patient.selectedPxEmail,
  selectedDrEmail: state.doctor.selectedDrEmail,
  user: state.user.data,
});

const mapDispatchToProps = {
  deletePatientEmail,
  deleteDoctorEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailDeleteModal);
