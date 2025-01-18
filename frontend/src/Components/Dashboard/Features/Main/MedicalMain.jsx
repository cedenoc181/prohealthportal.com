import React, { useState} from "react";
import { connect } from "react-redux";
import "./MedicalMain.css";
import "./Main.css";
import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon, SmallAddIcon } from "@chakra-ui/icons";
import CreateMedifile from "./Main-Functions/CreateMedifile";
import { setSelectedMedifile } from "../../../../ReduxActionsMain/medifilesActions";
import MyVerticallyCenteredModal from "./Main-Functions/MyVerticallyCenteredModal";
import moment from'moment';


export const MedicalMain = ({
  user,
  selectedMedifile,
  setSelectedMedifile,
  allUsers,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);



  console.log(allUsers);
  console.log(user);

  const formattedDate = moment(selectedMedifile.created_at).format('MM/DD/YYYY');


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
            <ChevronLeftIcon />
            Back
          </button>
        </div>
        <CreateMedifile />
      </div>
    );
  }

  if (!selectedMedifile) {
    return (
      <div>
        <CreateMedifile/>
      </div>
    );
  }



  return (
    <div className="medical-main">
      <div className="createUI-button">
        <button onClick={handleUIClick}>
          <SmallAddIcon />
          Create
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
            <span>Published:&nbsp; </span> {formattedDate}
          </div>
          <br />
          <p className="subtitle-pdf-instruction">Instructions:</p>
          <p className="pdf-instruction">{selectedMedifile.instructions}</p>

        </div>
        <div className="delete-medifile-container">
          <Button
            variant="primary"
            onClick={() => handleModalOpen(selectedMedifile)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
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
  user: state.user.data,
  allUsers: state.user.allUserData,
});

const mapDispatchToProps = {
  setSelectedMedifile,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalMain);
