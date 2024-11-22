import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import './EmMain.css'
import './Main.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Textarea, Text } from '@chakra-ui/react'
import EmailSenderUI from './Main-Functions/SendEmail.jsx'


export const EmailMain = ({selectedPxEmail, selectedDrEmail}) => {

const [myPatientTemplate, setMyPatientTemplate] = useState({

      user_id: '',
      patient_template_id: '',
      notes: ''

})

const [myDoctorTemplate, setMyDoctorTemplate] = useState({

  user_id: '',
  dr_template_id: '',
  notes: ''

})


const handlePatientTemplateChange = (e) => {
  const { name, value } = e.target;
  console.log("Textarea Value:", value); // Logs the current value of the textarea
  setMyPatientTemplate((prevState) => ({
    ...prevState,
    [name]: value,
  }));
}

const [saveTemplateDropMenu, setSaveTemplateDropMenu] = useState(false);

const [renderPatientEmail, setRenderPatientEmail] = useState(true);

// const [addition ]

function handleSaveTemplateDropMenu() {
      setSaveTemplateDropMenu(!saveTemplateDropMenu)
}

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


const copyToClipboard = (elementId) => {
  const element = document.getElementById(elementId);
  const textToCopy = element ? element.innerText : '';
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert('Text copied to clipboard');
  }).catch((err) => {
    console.error('Failed to copy: ', err);
  });
};




if (!selectedPxEmail) {
  return <div>Please select an item from the list.</div>;
} ;

// if (!selectedDrEmail){
//   return <div>Please select an item from the list.</div>;
// };

  return (
    <div className="email-main">

    <div className="main-container"> 

      {renderPatientEmail ? (    
        
        <div className="emailCard" key={selectedPxEmail.id}>
        <h2 className="email-main-title" contenteditable="true">{selectedPxEmail.px_temp_title}</h2>
        <br />
        <div className="email-main-subject" id="subject-div">
        <span className="key" contentEditable="false">Subject:</span>
        <p className="email-main-text" contentEditable="true">
            {selectedPxEmail.px_temp_subject}
          <span className="copy-button-wrapper">
            <button onClick={() => copyToClipboard('subject-div')}>  
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-copy" >
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </button>
          </span>
        </p>
      </div>
      <br />
      <div className="email-main-contents" id="body-div">
        <span className="key" contentEditable="false">Body:</span>
        <p className="email-main-text" contentEditable="true">
                  {selectedPxEmail.px_temp_content}
          <span className="copy-button-wrapper">
            <button onClick={() => copyToClipboard('body-div')}>  
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-copy" >
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </button>
          </span>
        </p>
      </div>
      <br />
        <div className="email-main-category"><span className="key" contenteditable="false">Tag:</span>
        <br/>
         <select name="category" className="email-category-selection">
                <option >{selectedPxEmail.category}</option> {/* set as default value from API*/}
                <option value="Outreach">Outreach</option>
                <option value="Billing">Billing</option>
                <option value="Other">Insurance</option>
          </select>
          </div> 
      </div> ) : (    
        
        <div className="emailCard" key={selectedDrEmail.id}>
        <h2 className="email-main-title" contenteditable="true">{selectedDrEmail.dr_temp_title}</h2>
        <br />
        <div className="email-main-subject" id="subject-div">
        <span className="key" contentEditable="false">Subject:</span>
        <p className="email-main-text" contentEditable="true">
            {selectedDrEmail.dr_temp_subject}
          <span className="copy-button-wrapper">
            <button onClick={() => copyToClipboard('subject-div')}>  
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-copy" >
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </button>
          </span>
        </p>
      </div>
      <br />
      <div className="email-main-contents" id="body-div">
        <span className="key" contentEditable="false">Body:</span>
        <p className="email-main-text" contentEditable="true">
                  {selectedDrEmail.dr_temp_content}
          <span className="copy-button-wrapper">
            <button onClick={() => copyToClipboard('body-div')}>  
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-copy" >
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </button>
          </span>
        </p>
      </div>
      <br />
        <div className="email-main-category"><span className="key" contenteditable="false">Tag:</span>
        <br/>
         <select name="category" className="email-category-selection">
                <option >{selectedDrEmail.category}</option> {/* set as default value from API*/}
                <option value="Protocols">Protocols</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
          </select>
          </div> 
      </div>)
      }   
  
        <br />
      <div className="email-buttons"> 
      <ButtonGroup className="email-save" variant='outline' spacing='6'>
          <Button colorScheme='blue'  height='48px' width='200px' onClick={handleSaveTemplateDropMenu}>
            {
              saveTemplateDropMenu ? 
              "Template Info"
              :
              "Save Template"
            }
        
        </Button>
      </ButtonGroup>
      </div>

      {
        saveTemplateDropMenu ? 
        (
        <form className="save-email-form">
            <div className="email-notes"> 
                <Text mb='8px'>Notes:</Text>
                <Textarea
                className="email-textarea"
                   placeholder='Note email info to optimize for patient or Dr. interaction, keep track and organized.'
                   size='md'
                   name="notes"  // This is necessary to ensure the correct property is updated in your state
                   value={myPatientTemplate.notes}
                  onChange={handlePatientTemplateChange}
                />
            </div>
            <br />
            <div className="email-submit-button">
            <Button  colorScheme='blue' variant='solid' size='lg'>
                Save template
            </Button>
            </div>
        </form>
        ) 
        : 

        (
        <div className="empty-menu">
        </div>
        )
      }
</div>
      <div className="export-emails">
          <EmailSenderUI />
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