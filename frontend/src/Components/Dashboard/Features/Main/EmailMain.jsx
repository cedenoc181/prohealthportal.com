import React, {useState} from 'react'
import { connect } from 'react-redux'
import './EmMain.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Textarea, Text } from '@chakra-ui/react'
import EmailSenderUI from './Main-Functions/EmailUI.jsx'


export const EmailMain = (props) => {



const [saveTemplateDropMenu, setSaveTemplateDropMenu] = useState(false);

function handleSaveTemplateDropMenu() {
      setSaveTemplateDropMenu(!saveTemplateDropMenu)
}

const copyToClipboard = (elementId) => {
  const element = document.getElementById(elementId);
  const textToCopy = element ? element.innerText : '';
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert('Text copied to clipboard');
  }).catch((err) => {
    console.error('Failed to copy: ', err);
  });
};


  return (
    <div className="email-main">

    <div className="email-container">     
      <div className="emailCard">

        <h2 className="email-main-title" contenteditable="true">Email template</h2>
        <br />
        <div className="email-main-subject" id="subject-div">
        <span className="key" contentEditable="false">Subject:</span>
        <p className="email-main-text" contentEditable="true">
          Schedule your following physical therapy appointment
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <span className="copy-button-wrapper">
            <button onClick={() => copyToClipboard('body-div')}>  
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-copy" >
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </button>
          </span>
        </p>
        {/* <button onClick={() => copyToClipboard('body-div')}>
          
           <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
            </svg>
        </button> */}
      </div>
      <br />
        <div className="email-main-category"><span className="key" contenteditable="false">Category:</span>
        <br/>
         <select name="category" className="email-category-selection">
                <option >select category</option> {/* set as default value from API*/}
                <option value="Outreach">Outreach</option>
                <option value="General Therapy">General Therapy</option>
                <option value="APOS Therapy">APOS Therapy</option>
                <option value="Billing">Billing</option>
          </select>
          </div> 
      </div>
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(EmailMain)