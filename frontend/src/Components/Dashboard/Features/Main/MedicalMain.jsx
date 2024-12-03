import React, { useState } from "react";
import { connect } from "react-redux";
import "./MedicalMain.css";
import "./Main.css";
import { Textarea, Text, Button } from "@chakra-ui/react";
import CreateMedifile from "./Main-Functions/CreateMedifile";
import { setSelectedMedifile } from "../../../../ReduxActionsMain/medifilesActions";

export const MedicalMain = ({ selectedMedifile }) => {
  // State to control whether to show CreateMedifile UI or not
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleUIClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  // Render the create form if `showCreateForm` is true
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

  // Render selectedMedifile details if it is available
  if (!selectedMedifile) {
    return (
      <div>
        <CreateMedifile />
      </div>
    );
  }

  console.log("PDF URL:", selectedMedifile.file_link_url);

  return (
    <div className="medical-main">
      {/* Button to create a new medifile */}
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
          <h2 className="pdf-title">{selectedMedifile.title}</h2>
          <p className="subtitle-pdf-description">Document description:</p>
          <p className="pdf-description">{selectedMedifile.description}</p>

          <a
            href={selectedMedifile.file_link_url}
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
        </div>
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

      <div></div>
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
