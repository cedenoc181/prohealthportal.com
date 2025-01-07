import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import './EmMain.css'
import './Main.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { ChevronLeftIcon, SmallAddIcon } from '@chakra-ui/icons'
import EmailSenderUI from './Main-Functions/SendEmail.jsx'
import CreateEmailUI from './Main-Functions/CreateEmail.jsx'
export const EmailMain = ({selectedPxEmail, selectedDrEmail}) => {


const [useTemplate, setUseTemplate] = useState(false);

const [renderPatientEmail, setRenderPatientEmail] = useState(true);

const [showCreateForm, setShowCreateForm] = useState(false);

const [useTemplateHtml, setUseTemplateHtml] = useState(null);

const [useTempToCreate, setUseTempToCreate] = useState(null);



useEffect(() => {
  
if (selectedDrEmail) {
  setRenderPatientEmail(false);
}
}, [selectedDrEmail])


useEffect(() => {
  if (selectedPxEmail){
    setRenderPatientEmail(true);
  }
}, [selectedPxEmail])


const handleUIClick = () => {
  setShowCreateForm(!showCreateForm);
};

const copyToClipboard = (elementId) => {
  const element = document.getElementById(elementId);
  const textToCopy = element ? element.innerText : '';
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert('Text copied to clipboard');
  }).catch((err) => {
    console.error('Failed to copy: ', err);
  });
};


function handleUseTemplate() {
  setUseTemplate(!useTemplate);
  const getSubject = document.getElementById('subject-p');
  const getBody = document.getElementById('body-p');


  setUseTemplateHtml({
    subject: getSubject ? getSubject.innerText : 'Default Subject',
    body: getBody ? getBody.innerText : 'Default Body',
  });

  setTimeout(() => {
    alert('template copied onto to mailer below')
  }, 100)



  console.log('Using template: ', useTemplateHtml);
}

setTimeout(() => {
  setUseTemplate(false);
 },1000);


function handleModifiedTemplate() {
 
  const getSubject = document.getElementById('subject-p');
  const getBody = document.getElementById('body-p');
  const getCategory = document.getElementById('category');

  setUseTempToCreate({
    subject: getSubject.innerText,
    body: getBody.innerText,
    category: getCategory.innerText
  })

  setShowCreateForm(true);

setTimeout(() => {
  alert('Create a new template with the recent modifications you made!');
}, 400)
}




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
        <CreateEmailUI templateObject={useTempToCreate}/>
      </div>
    );
  }


  if (!selectedPxEmail && !selectedDrEmail) {
    return (
      <div>
        <CreateEmailUI templateObject={useTempToCreate}/>
      </div>
    );
  }

  return (
    <div className="email-main">
        <div className="createUI-button">
        <button onClick={handleUIClick}>
          <SmallAddIcon />
          Compose
        </button>
      </div>

    <div className="main-container"> 

      {renderPatientEmail ? (    
        
        <div className="emailCard" key={selectedPxEmail.id}>
        <h2 className="email-main-title" contentEditable="true">{selectedPxEmail.px_temp_title}</h2>
        <br />
        <div className="email-main-subject">
        <span className="key" contentEditable="false">Subject:</span>
        <p className="email-main-text" contentEditable="true" id="subject-p">
            {selectedPxEmail.px_temp_subject}
          <span className="copy-button-wrapper">
            <button onClick={() => copyToClipboard('subject-p')}>  
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-copy" >
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </button>
          </span>
        </p>
      </div>
      <br />
      <div className="email-main-contents">
        <span className="key" contentEditable="false">Body:</span>
        <p className="email-main-text" contentEditable="true" id="body-p">
                  {selectedPxEmail.px_temp_content}
          <span className="copy-button-wrapper">
            <button onClick={() => copyToClipboard('body-p')}>  
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-copy" >
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </button>
          </span>
        </p>
      </div>
      <br />
        <div className="email-main-category"><span className="key" contentEditable="false">Tag:</span>
        <br/>
         <select name="category" className="email-category-selection">
                <option id="category">{selectedPxEmail.category}</option> {/* set as default value from API*/}
                <option value="Outreach">Outreach</option>
                <option value="Billing">Billing</option>
                <option value="Other">Insurance</option>
          </select>
          </div> 
          <br />
          <button className="addToCreateEmailButton" onClick={handleModifiedTemplate} data-toggle="tooltip" data-placement="top" title="Create this template">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
              <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
          </svg>
          </button>
      </div> ) : (    
        
        <div className="emailCard" key={selectedDrEmail.id}>
        <h2 className="email-main-title" contenteditable="true">{selectedDrEmail.dr_temp_title}</h2>
        <br />
        <div className="email-main-subject">
        <span className="key" contentEditable="false">Subject:</span>
        <p className="email-main-text" contentEditable="true" id="subject-p">
            {selectedDrEmail.dr_temp_subject}
          <span className="copy-button-wrapper">
            <button onClick={() => copyToClipboard('subject-p')}>  
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-copy" >
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </button>
          </span>
        </p>
      </div>
      <br />
      <div className="email-main-contents">
        <span className="key" contentEditable="false">Body:</span>
        <p className="email-main-text" contentEditable="true"  id="body-p">
                  {selectedDrEmail.dr_temp_content}
          <span className="copy-button-wrapper">
            <button onClick={() => copyToClipboard('body-p')}>  
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-copy" >
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </button>
          </span>
        </p>
      </div>
      <br />
        <div className="email-main-category"><span className="key" contentEditable="false">Tag:</span>
        <br/>
         <select name="category" className="email-category-selection">
                <option id="category">{selectedDrEmail.category}</option> {/* set as default value from API*/}
                <option value="Protocols">Protocols</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
          </select>
          </div> 
          <br />
          <button className="addToCreateEmailButton" onClick={handleModifiedTemplate} data-toggle="tooltip" data-placement="top" title="Create this template">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
              <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
          </svg>
          </button>
      </div>)
      }   
  
        <br />
        <p className="email-instructions"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg></span>Emails can be modified and copied to email send form, emails that are modified will not presist to maintain the templates origin.
           You can create a email that will presist on to data base below in the create form.</p>
           <br />
      <div className="email-buttons"> 
      <ButtonGroup className="email-save" variant='outline' spacing='6'>
          <Button colorScheme='blue'  height='48px' width='200px' onClick={handleUseTemplate}>
              {
                  useTemplate ? 
                 (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                </svg>
                )
                :
                "Use Template"
                
              }
          </Button>
      </ButtonGroup>
      </div>
      <br />
</div>

<div className="export-emails">
  {useTemplateHtml ? (
    <EmailSenderUI templateObject={useTemplateHtml} />
  ) : (
    <p></p>
  )}
</div>


    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedPxEmail: state.patient.selectedPxEmail,
  selectedDrEmail : state.doctor.selectedDrEmail
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(EmailMain)