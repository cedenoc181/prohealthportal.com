import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./EmMain.css";
import "./Main.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { ChevronLeftIcon, SmallAddIcon } from "@chakra-ui/icons";
import EmailSenderUI from "./Main-Functions/SendEmail.jsx";
import CreateEmailUI from "./Main-Functions/CreateEmail.jsx";
import EmailDeleteModal from "./Main-Functions/EmailDeleteModal.jsx"

export const EmailMain = ({ selectedPxEmail, selectedDrEmail, user, emailTemplateStatus }) => {

  const [useTemplate, setUseTemplate] = useState(false);

  const [renderPatientEmail, setRenderPatientEmail] = useState(emailTemplateStatus);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [useTemplateHtml, setUseTemplateHtml] = useState(null);

  const [useTempToCreate, setUseTempToCreate] = useState(null);

  const [emailButtonConditional, setEmailButtonConditional] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  const senderRef = useRef(null);

  // passed down from APP js coming from sibling component to render true or false based on file selected 
  console.log("current status of EmailMain state passed down:",emailTemplateStatus);
 

  useEffect(() => {
    setRenderPatientEmail(emailTemplateStatus);
  }, [emailTemplateStatus]);

  
// manages user relation to the dr template to grant delete method
  useEffect(() => {
    if (selectedDrEmail) {
      setEmailButtonConditional(user.admin || (user.id === selectedDrEmail.dr_owner_id));
    } 
  }, [selectedDrEmail, user]);

  // manages user relation to the patient template to grant delete method
  useEffect(() => {
    if (selectedPxEmail) {
      setEmailButtonConditional(user.admin || (user.id === selectedPxEmail.px_owner_id));    
    } 
  }, [ selectedPxEmail, user]);


  useEffect(() => {
    if (useTemplateHtml) {
      senderRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [useTemplateHtml]);

  const handleUIClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  // copy email subject or body to clipboard
  const copyToClipboard = (elementId) => {
    const element = document.getElementById(elementId);
    const textToCopy = element ? element.innerText : "";
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // use templagte to send email
  function handleUseTemplate() {
    setUseTemplate(!useTemplate);
    const getSubject = document.getElementById("subject-p");
    const getBody = document.getElementById("body-p");

    setUseTemplateHtml({
      subject: getSubject ? getSubject.innerText : "",
      body: getBody ? getBody.innerText : "",
    });

    console.log("Using template: ", useTemplateHtml);
  }

  setTimeout(() => {
    setUseTemplate(false);
  }, 1000);

  //  create a new template using exisiting content
  function handleModifiedTemplate() {
    const getSubject = document.getElementById("subject-p");
    const getBody = document.getElementById("body-p");
    const getCategory = document.getElementById("category");

    setUseTempToCreate({
      subject: getSubject.innerText,
      body: getBody.innerText,
      category: getCategory.innerText,
    });

    setShowCreateForm(true);

    setTimeout(() => {
      alert("Create a new template with the recent modifications you made!");
    }, 400);
  }

  // exit out of the sender component
  function handleSendEmailExit() {
    setUseTemplateHtml(false);
    console.log("clicked");
  }


  const handleModalOpen = () => {
    setModalShow(true);
  };


  console.log(selectedDrEmail);
  console.log(selectedPxEmail);

  // Render the create form if `showCreateForm` is true
  if (showCreateForm) {
    return (
      <div>
        <div className="createUI-button">
          <button onClick={handleUIClick}>
            <ChevronLeftIcon />
            Back
          </button>
        </div>
        <CreateEmailUI templateObject={useTempToCreate} />
      </div>
    );
  }

  if (!selectedPxEmail && !selectedDrEmail) {
    return (
      <div>
        <CreateEmailUI templateObject={useTempToCreate} />
      </div>
    );
  }

  if ((emailTemplateStatus && !selectedPxEmail) || (!emailTemplateStatus && !selectedDrEmail)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="email-main">
      <div className="createUI-button">
        <button
          onClick={handleUIClick}
          data-toggle="tooltip"
          data-placement="top"
          title="Create new email template"
        >
          <SmallAddIcon />
          Compose
        </button>
      </div>

      <div className="main-container">
        <div
          className="emailCard"
          key={emailTemplateStatus ? selectedPxEmail?.id : selectedDrEmail?.id}
        >
          <h2 className="email-main-title">
            {emailTemplateStatus ? selectedPxEmail?.px_temp_title : selectedDrEmail?.dr_temp_title}
          </h2>
          <br />
          <div className="email-main-subject">
            <span className="key">
              Subject:
            </span>
            <p
              className="email-main-text"
              id="subject-p"
            >
              {emailTemplateStatus ? selectedPxEmail?.px_temp_subject : selectedDrEmail?.dr_temp_subject}
              <span className="copy-button-wrapper">
                <button onClick={() => copyToClipboard("subject-p")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="currentColor"
                    className="bi bi-copy"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                    />
                  </svg>
                </button>
              </span>
            </p>

          </div>
          <br />
          <div className="email-main-contents">
            <span className="key">
              Body:
            </span>
            <p className="email-main-text"  id="body-p">
              {emailTemplateStatus ? selectedPxEmail?.px_temp_content : selectedDrEmail?.dr_temp_content}
              <span className="copy-button-wrapper">
                <button onClick={() => copyToClipboard("body-p")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="currentColor"
                    className="bi bi-copy"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                    />
                  </svg>
                </button>
              </span>
            </p>
          </div>
          <br />
          <div className="email-main-category">
            <span className="key">
              Tag:
            </span>
            <br />
            <p id="category">  {emailTemplateStatus
                  ? selectedPxEmail?.category
                  : selectedDrEmail?.category}</p>
          </div>
          <br />
          <button
            className="addToCreateEmailButton"
            onClick={handleModifiedTemplate}
            data-toggle="tooltip"
            data-placement="top"
            title="Recreate this template"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-file-earmark-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5" />
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
            </svg>
          </button>
        </div>

        <br />
        <p className="email-instructions">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-info-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
          </span>
          The 'use template' button below, will copy the template above and compose a ready to send email. 
          There are also clipboard buttons on each subject and body. As well as a recreate button to make your own 
          modifications.
        </p>
        <br />
        <div className={emailButtonConditional ? "email-buttons" : "email-button-false"}>
          {
            emailButtonConditional ?
          (
          <ButtonGroup>
            <Button
             className="deleteEmailButton"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete this email template"
                onClick={handleModalOpen}
                >
                  {/* trash svg icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </Button>
          </ButtonGroup>)
          : 
          (
            ""
          )
}

          <ButtonGroup className="email-save" variant="outline" spacing="6">
            <Button
              colorScheme="blue"
              height="48px"
              width="200px"
              onClick={handleUseTemplate}
              data-toggle="tooltip"
              data-placement="top"
              title="use this email template"
            >
              {useTemplate ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-check2-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg>
              ) : (
                "Use Template"
              )}
            </Button>
          </ButtonGroup>
        </div>
        <br />
      </div>

      <EmailDeleteModal 
      show={modalShow}
      status={renderPatientEmail}
      onHide={() =>  setModalShow(false)}
      />

      <div className="export-emails">
        {useTemplateHtml ? (
          <div ref={senderRef}>
            <EmailSenderUI
              templateObject={useTemplateHtml}
              exitSendEmail={handleSendEmailExit}
            />
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedPxEmail: state.patient.selectedPxEmail,
  selectedDrEmail: state.doctor.selectedDrEmail,
  user: state.user.data,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(EmailMain);
