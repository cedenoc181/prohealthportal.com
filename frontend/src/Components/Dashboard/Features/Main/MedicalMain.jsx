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
  const [emailButtonConditional, setEmailButtonConditional] = useState(null);
  const [medifileUpdatedParams, setMedifileUpdatedParams] = useState({
    title: selectedMedifile ? selectedMedifile.title : "",
    description: selectedMedifile ? selectedMedifile.description : "",
    instructions: selectedMedifile ? selectedMedifile.instructions : "",
    category: selectedMedifile ? selectedMedifile.file_cover_alt : "",
  });

  console.log(allUsers);
  console.log(user);

  useEffect(() => {
    if (selectedMedifile) {
      setEmailButtonConditional(
        (user && user.id === selectedMedifile.file_owner_id) || user.admin
      );
      let formattedDate = moment(selectedMedifile.created_at).format(
        "MM/DD/YYYY"
      );
      setFormDate(formattedDate);
      setMedifileUpdatedParams({
        title: selectedMedifile.title,
        description: selectedMedifile.description,
        instructions: selectedMedifile.instructions,
        category: selectedMedifile.file_cover_alt,
      });
    }
  }, [selectedMedifile, user]);

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

  const handleMedifileUpdate = (e) => {
    e.preventDefault();
    if (emailButtonConditional) {
      if (
        selectedMedifile.id &&
        medifileUpdatedParams.title &&
        medifileUpdatedParams.description &&
        medifileUpdatedParams.instructions &&
        medifileUpdatedParams.category
      ) {
        updateMedifile(selectedMedifile.id, medifileUpdatedParams);
        setTimeout(() => {
          setShowEditForm(false);
        }, 300);
        alert("Medifile updated");
        console.log("medifile update method runs");
      } else {
        alert("Fill all parameters");
      }
    } else {
      console.log("not authorized user");
      setTimeout(() => {
        alert("Admin or Publisher authorization required: failed to update");
        setShowEditForm(false);
      }, 350);
    }
  };

  console.log(medifileUpdatedParams);

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
        <button
          onClick={handleUIClick}
          data-toggle="tooltip"
          data-placement="top"
          title="Create a new medical file"
        >
          <SmallAddIcon />
          Create
        </button>
      </div>
      <div className="main-container">
        <div className="pdf-container">
          {showEditForm ? (
            <>
              <button
                className="medifileEditButton"
                onClick={handleUiEdit}
                data-toggle="tooltip"
                data-placement="left"
                title="exit update"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                  />
                </svg>
              </button>
              <form
                className="update-form"
                action="updateMedifile"
                method="patch"
                onSubmit={handleMedifileUpdate}
              >
                <div className="label-input-title">
                  <label className="subtitle-pdf-title subtitle-pdf-title-edit">
                    Document title:
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
                    // required
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
                      // required
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
                <div className="label-input-instructions">
                  <label className="subtitle-pdf-instruction subtitle-pdf-instruction-edit">
                    Document instructions:
                  </label>
                  <textarea
                    className="pdf-instruction-edit"
                    onChange={(e) =>
                      setMedifileUpdatedParams({
                        ...medifileUpdatedParams,
                        instructions: e.target.value,
                      })
                    }
                    placeholder={selectedMedifile.instructions}
                    // required
                  />
                </div>
                <br />
                <div className="label-input-category">
                  <label className="subtitle-pdf-category subtitle-pdf-category-edit">
                    Document category:{" "}
                  </label>
                  <select
                    name="category"
                    className="category-update"
                    onChange={(e) =>
                      setMedifileUpdatedParams({
                        ...medifileUpdatedParams,
                        category: e.target.value,
                      })
                    }
                    // required
                  >
                    <option value={selectedMedifile.file_cover_alt}>
                      created as: {selectedMedifile.file_cover_alt}{" "}
                    </option>
                    <option value="APOS">APOS</option>
                    <option value="authorization">authorization</option>
                    <option value="PT/OT">PT/OT</option>
                    <option value="other">other</option>
                  </select>
                </div>
                <br />
                <div className="edit-button-submit">
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    size="lg"
                    type="submit"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Submit update"
                  >
                    update
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <button
                className="medifileEditButton"
                onClick={handleUiEdit}
                data-toggle="tooltip"
                data-placement="top"
                title="Update medical file"
              >
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
                {emailButtonConditional ? (
                  <Button
                    variant="primary"
                    onClick={() => handleModalOpen(selectedMedifile)}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete medical file"
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
                ) : (
                  ""
                )}
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
