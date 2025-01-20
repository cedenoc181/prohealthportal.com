import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./MedicalMain.css";
import "./Main.css";
import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon, SmallAddIcon } from "@chakra-ui/icons";
import CreateMedifile from "./Main-Functions/CreateMedifile";
import {
  setSelectedMedifile,
  updateMedifile,
} from "../../../../ReduxActionsMain/medifilesActions";
import MyVerticallyCenteredModal from "./Main-Functions/MyVerticallyCenteredModal";
import moment from "moment";

export const MedicalMain = ({
  user,
  selectedMedifile,
  setSelectedMedifile,
  allUsers,
  updateMedifile,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [formDate, setFormDate] = useState(null);
  const [medifileUpdatedParams, setMedifileUpdatedParams] = useState({
    title: "",
    description: "",
    instructions: "",
    language: "",
    category: "",
  });

  console.log(medifileUpdatedParams.title);

  console.log(allUsers);
  console.log(user);

  useEffect(() => {
    if (selectedMedifile) {
      let formattedDate = moment(selectedMedifile.created_at).format(
        "MM/DD/YYYY"
      );
      setFormDate(formattedDate);
    }
  }, [selectedMedifile]);

  const handleUIClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleUiEdit = () => {
    setShowEditForm(!showEditForm);
    console.log(showEditForm);
  };

  const handleModalOpen = (medifile) => {
    setSelectedMedifile(medifile); // Set the selected medifile in Redux state
    setModalShow(true);
  };

  const handleMedifileUpdate = (medifileId, updatedInfo) => {
    updateMedifile(medifileId, updatedInfo);
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
          <button className="medifileEditButton" onClick={handleUiEdit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </button>

          {showEditForm ? (
            <>
              <form
                className="update-form"
                action="updateMedifile"
                method="patch"
                onSubmit={handleMedifileUpdate}
              >
              <div className="label-input-title">
                <label className="subtitle-pdf-title subtitle-pdf-title-edit">
                  Document Title:
                </label>
                <input
                  key={selectedMedifile.id}
                  className="pdf-title title-edit"
                  onChange={(e) =>
                    setMedifileUpdatedParams({
                      ...medifileUpdatedParams,
                      title: e.target.value,
                    })
                  }
                  placeholder={selectedMedifile.title}
                />
              </div>

              <div className="form-content">

        {/* Description Section */}
        <div className="label-input-description">
          <label className="subtitle-pdf-description subtitle-pdf-description-edit">
            Document description:
          </label>
          <textarea
            className="pdf-description-edit"
            onChange={(e) =>
              setMedifileUpdatedParams({
                ...medifileUpdatedParams,
                description: e.target.value,
              })
            }
            placeholder={selectedMedifile.description}
          />
        </div>

                {/* Image Section */}
           <img
          title={selectedMedifile.title}
          className="pdf-main pdf-edit"
          src={selectedMedifile.file_cover_url}
          alt={selectedMedifile.file_cover_alt}
        />
      </div>
                <br />
                <div className="medicalPublishDate">
                  <span>Published:&nbsp; </span> {formDate}
                </div>
                <br />
                <div className="label-input-org">
                <label className="subtitle-pdf-instruction subtitle-pdf-instruction-edit">
                  Instructions:
                </label>
                <textarea
                  className="pdf-instruction"
                  onChange={(e) =>
                    setMedifileUpdatedParams({
                      ...medifileUpdatedParams,
                      instructions: e.target.value,
                    })
                  }
                  placeholder={selectedMedifile.instructions}
                />
                </div>
                <button type="submit">update</button>
              </form>
            </>
          ) : (
            <>
              <div>
                <h2 key={selectedMedifile.id} className="pdf-title">
                  {selectedMedifile.title}
                </h2>
                <p className="subtitle-pdf-description">
                  Document description:
                </p>
                <p className="pdf-description">
                  {selectedMedifile.description}
                </p>
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
                  <span>Published:&nbsp; </span> {formDate}
                </div>
                <br />
                <p className="subtitle-pdf-instruction">Instructions:</p>
                <p className="pdf-instruction">
                  {selectedMedifile.instructions}
                </p>
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
              </div>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </>
          )}
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
  updateMedifile,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalMain);
