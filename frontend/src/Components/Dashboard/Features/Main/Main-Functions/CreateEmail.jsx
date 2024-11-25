import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { Textarea, Input } from '@chakra-ui/react'
import { createPatientEmail } from '../../../../../ReduxActionsMain/patientEmailActions.js'
import { createDoctorEmail } from '../../../../../ReduxActionsMain/doctorEmailActions.js'



export const CreateEmail = ({createPatientEmail, createDoctorEmail}) => {

  // false is for patient email and true will be for Dr emails
  const [templateToggler, setTemplateToggler] = useState(true);


    const [newPatientTemplate, setNewPatientTemplate] = useState({
      title: '',
      subject: '',
      content: '',
      category: '',
      language: ''
  });
  
  const [newDoctorTemplate, setNewDoctorTemplate] = useState({
    title: '',
    subject: '',
    content: '',
    category: ''
  });

  const handleToggle = (e) => {
    e.preventDefault();
    setTemplateToggler(!templateToggler)
  }
  
  const handleCreate = () => {
    if (newPatientTemplate) {
      createPatientEmail(newPatientTemplate)
    } else if (newDoctorTemplate) {
      createDoctorEmail(newDoctorTemplate)
    }
  }

      
  return (

<div>
<form className="create-email-form">
<br />
<div className="create-email-title">
        
        
        { templateToggler ? 
         ( 
          // if false show patient 
          <div>
          <h2 className="createTitle">Create a new Email Template for Patients</h2>
          <button onClick={handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16">
              <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
            </svg>
          </button>
          </div>
          )
          :
      (   
      // if true show Dr
      <div>
      <h2 className="createTitle">Create a new Email Template for Doctors</h2>
      <button onClick={handleToggle}>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16">
              <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
          </svg>
      </button> 
      </div>
     ) 
    
    }
   
      </div>
      <br />

       { templateToggler ? 
       
       (
       <div className="create-email-inputs">
        <label className="input-label">Template Title:</label>
        {/* <InputGroup> */}
        <Input
           mb='12px'
           placeholder='Name your email for future searches'
           size='md'
           name="notes"  
          onChange= {(e) => setNewPatientTemplate({...newPatientTemplate, title: e.target.value})}
        />
        <br />
        <label className="input-label">Template Subject:</label>
        <Input 
          mb='12px'
          placeholder='Input email subject here'
          onChange= {(e) => setNewPatientTemplate({...newPatientTemplate, subject: e.target.value})}
        /> 
        <br />
        <label className="input-label">Template Content:</label>
        <Textarea 
          mb='12px'
          placeholder='Write your email contents here!'
          onChange= {(e) => setNewPatientTemplate({...newPatientTemplate, content: e.target.value})}
          /> 
          <br />
        <label className="input-label">Template Tag:</label>
        <select name="Tags" className="email-category-selection" onChange= {(e) => setNewPatientTemplate({...newPatientTemplate, category: e.target.value})} >
        <option value="">--Please choose an option below--</option>
        <option value="Outreach">Outreach</option>
        <option value="Billing">Billing</option>
        <option value="Other">Insurance</option>
        </select>

        <br />
        <label>Language: </label>
        <select className="" name="language" onChange={(e) => setNewPatientTemplate({...newPatientTemplate, language: e.target.value})}>
          <option>--Select Language for email--</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
        </select>
       
        {/* </InputGroup> */}
        </div>)  
        
        : 
        
        ( <div className="create-email-inputs">
        <label className="input-label">Template Title:</label>
        {/* <InputGroup> */}
        <Input
           mb='12px'
           placeholder='Name your email for future searches'
           size='md'
           name="notes"  
          onChange= {(e) => setNewDoctorTemplate({...newDoctorTemplate, title: e.target.value})}
        />
        <br />
        <label className="input-label">Template Subject:</label>
        <Input 
          mb='12px'
          placeholder='Input email subject here'
          onChange= {(e) => setNewDoctorTemplate({...newDoctorTemplate, subject: e.target.value})}
        /> 
        <br />
        <label className="input-label">Template Content:</label>
        <Textarea 
          mb='12px'
          placeholder='Write your email contents here!'
          onChange= {(e) => setNewDoctorTemplate({...newDoctorTemplate, content: e.target.value})}
          /> 
          <br />
        <label className="input-label">Template Tag:</label>
        <select name="Tags" className="email-category-selection" onChange= {(e) => setNewDoctorTemplate({...newDoctorTemplate, category: e.target.value})} >
        <option value="">--Please choose an option below--</option>
        <option value="Outreach">Outreach</option>
        <option value="Billing">Billing</option>
        <option value="Other">Insurance</option>
        </select>
       
        {/* </InputGroup> */}
        </div>)}
        <br />
        <div className="email-submit-button">
        <Button  colorScheme='blue' variant='solid' size='lg' onClick={handleCreate}>
            Create template
        </Button>
        </div>
  </form>
</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  createPatientEmail,
  createDoctorEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmail)