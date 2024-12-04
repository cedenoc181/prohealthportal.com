import React, { useState } from "react";
import { connect } from "react-redux";
import "./MedicalMain.css";
import "./Main.css";
import { Textarea, Text, Button } from "@chakra-ui/react";
import CreateMedifile from "./Main-Functions/CreateMedifile";
import { setSelectedMedifile } from "../../../../ReduxActionsMain/medifilesActions";
import MyVerticallyCenteredModal from './Main-Functions/MyVerticallyCenteredModal';

export const MedicalMain = ({ selectedMedifile, setSelectedMedifile }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleUIClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleModalOpen = (medifile) => {
    setSelectedMedifile(medifile); // Set the selected medifile in Redux state
    setModalShow(true);
  };

  if (showCreateForm) {
    return (
      <div>
        <div className="createUI-button">
          <button onClick={handleUIClick}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
        <CreateMedifile />
      </div>
    );
  }

  if (!selectedMedifile) {
    return (
      <div>
        <CreateMedifile />
      </div>
    );
  }

  return (
    <div className="medical-main">
      <div className="createUI-button">
        <button onClick={handleUIClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>
      </div>
      <div className="main-container">
        <div className="pdf-container">
          <h2 id={selectedMedifile.id} className="pdf-title">
            {selectedMedifile.title}
          </h2>
          <p className="subtitle-pdf-description">Document description:</p>
          <p className="pdf-description">{selectedMedifile.description}</p>
          <a
            href={selectedMedifile.file_link}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-main-link"
          >
            <img
              title={selectedMedifile.title}
              className="pdf-main"
              src={selectedMedifile.file_cover_url}
              alt={selectedMedifile.file_cover_alt}
            />
          </a>
          <br />
          <div className="medicalPublishDate">
            <span>Published:&nbsp; </span> {selectedMedifile.created_at}
          </div>
          <br />
          <p className="subtitle-pdf-instruction">Instructions:</p>
          <p className="pdf-instruction">{selectedMedifile.instructions}</p>
        
          <br />
            <div className="pdf-info">
              <Text>Notes:</Text>
              <Textarea
                className="email-textarea"
                placeholder="Using this medical document often? Create a note to optimize your ability to keep track and organized. Documents saved onto your template will be easier to find."
                size="md"
              />
              <div className="medical-submit-button">
                <Button colorScheme="blue" variant="solid" size="lg">
                  Save template
                </Button>
              </div>
            </div>

        </div>
        <div className="delete-medifile-container">
          <Button variant="primary" onClick={() => handleModalOpen(selectedMedifile)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedMedifile: state.medifiles.selectedMedifile,
});

const mapDispatchToProps = {
  setSelectedMedifile,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalMain);
