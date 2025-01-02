import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./MedicalMain.css";
import "./Main.css";
import { Textarea, Text, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, SmallAddIcon } from "@chakra-ui/icons";
import CreateMedifile from "./Main-Functions/CreateMedifile";
import { createMyMedifile } from "../../../../ReduxActionsMain/myMedifilesActions";
import { setSelectedMedifile } from "../../../../ReduxActionsMain/medifilesActions";
import MyVerticallyCenteredModal from "./Main-Functions/MyVerticallyCenteredModal";

export const MedicalMain = ({
  user,
  selectedMedifile,
  setSelectedMedifile,
  createMyMedifile,
  allUsers,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [createMyMedifileValues, setCreateMyMedifileValues] = useState({
    user_id: "",
    coworker_id: "",
    medifile_id: "",
    my_file_title: "",
    my_file_description: "",
    token: ""
  });

  useEffect(() => {
    if (selectedMedifile) {
      setCreateMyMedifileValues({
        user_id:user.id,
        my_file_title: selectedMedifile.title,
        medifile_id: selectedMedifile.id,
        token: localStorage.getItem('jwt'),
      })
    }
  }, [allUsers, user, selectedMedifile]);

  console.log(createMyMedifileValues);
  console.log(allUsers);
  console.log(user);


  const handleUIClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleTemplateSubmission = (e) => {
    e.preventDefault();
    if (createMyMedifileValues.medifile_id && createMyMedifileValues.my_file_description && createMyMedifileValues.user_id && createMyMedifileValues.my_file_title) {
      // console.log(createMyMedifileValues)
      createMyMedifile(createMyMedifileValues);
      console.log("object passed into createMyMedifile"); 
    } else {
      alert("please log note for template file");
    }
  }

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
        <CreateMedifile />
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
          <form className="pdf-info" onSubmit={handleTemplateSubmission}>
            <Text>Notes:</Text>
            <Textarea
              required
              className="email-textarea"
              placeholder="Using this medical document often? Create a note to optimize your ability to keep track and organized. Documents saved onto your template will be easier to find."
              size="md"
              onChange={(e) =>
                setCreateMyMedifileValues({
                  ...createMyMedifileValues,
                  my_file_description: e.target.value,
                })
              }
            />
            <br />
            <label className="share-label">Share document</label>
            <select
              name="coworker"
              className="medical-coworker-selection"
              onChange={(e) => {
                let num = parseInt(e.target.value)
                 setCreateMyMedifileValues({
                  ...createMyMedifileValues,
                  coworker_id: num,
                })
                console.log(typeof num)
              }}
              required
            >
              <option value="">--Select user to share with--</option>

              { allUsers.length > 0
                ? allUsers.map((coworker) =>
                    coworker.id !== user.id ? (
                      <option value={coworker.id}>{coworker.full_name}</option>
                    ) : (
                      <div></div>
                    )
                  )
                : ""}
            </select>

            <br />

            <div className="medical-submit-button">
              <Button colorScheme="blue" variant="solid" size="lg" type='submit'>
                Save template
              </Button>
            </div>
          </form>
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
  createMyMedifile,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalMain);
