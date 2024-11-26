import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { Textarea, Input } from '@chakra-ui/react'
import { createPatientEmail } from '../../../../../ReduxActionsMain/patientEmailActions.js'
import { createDoctorEmail } from '../../../../../ReduxActionsMain/doctorEmailActions.js'



export const CreateEmail = ({createPatientEmail, createDoctorEmail}) => {

  // true is for patient email and false will be for Dr emails
  const [templateToggler, setTemplateToggler] = useState(true);


    const [newPatientTemplate, setNewPatientTemplate] = useState({
      px_temp_title: '',
      px_temp_subject: '',
      px_temp_content: '',
      category: '',
      language: ''
  });
  
  const [newDoctorTemplate, setNewDoctorTemplate] = useState({
    dr_temp_title: '',
    dr_temp_subject: '',
    dr_temp_content: '',
    category: ''
  });

  const handleToggle = (e) => {
    e.preventDefault();
    setTemplateToggler(!templateToggler)
  }
  
  const handleCreate = () => {
    if (templateToggler) {
      // Validate patient template fields before creating
      if (newPatientTemplate.px_temp_title && newPatientTemplate.px_temp_subject && newPatientTemplate.px_temp_content && newPatientTemplate.category && newPatientTemplate.language) {
        createPatientEmail(newPatientTemplate);
      } else {
        console.log("Please fill out all required patient email fields.");
      }
    } else {
      // Validate doctor template fields before creating
      if (newDoctorTemplate.dr_temp_title && newDoctorTemplate.dr_temp_subject && newDoctorTemplate.dr_temp_content && newDoctorTemplate.category) {
        createDoctorEmail(newDoctorTemplate);
      } else {
        console.log("Please fill out all required doctor email fields.");
      }
    }


  };
  

      
  return (

<div>
<br />
<div className="create-email-title">
        
        
        { templateToggler ? 
         ( 
          // if true show patient 
          <div className="toggler-container">
          <h2 className="createTitle">Create a new Email Template for Patients</h2>
          <div className="toggler"> 
          <button onClick={handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16">
              <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
            </svg>
          </button>
          <br />
          <label>Toggle for Doctor template</label>
          </div>
          </div>
          )
          :
      (   
      // if false show Dr
      <div className="toggler-container">
      <h2 className="createTitle">Create a new Email Template for Doctors</h2>
      <div className="toggler"> 
      <button id="tog2" onClick={handleToggle}>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16">
              <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
          </svg>
      </button> 
      <br />
      <label>Untoggle for patient template</label>
      </div>
      </div>
     ) 
    
    }
   
      </div>
      <br />
      <form className="create-email-form" onSubmit={handleCreate}>
       { templateToggler ? 
       
       (
        // patient template input
       <div className="create-email-inputs">
        <label className="input-label">Template Title:</label>
        {/* <InputGroup> */}
        <Input
           mb='12px'
           placeholder='Name your email for future searches'
           size='md'
           name="px_temp_title"  
          onChange= {(e) => setNewPatientTemplate({...newPatientTemplate, px_temp_title: e.target.value})}
          required
        />
        <br />
        <label className="input-label">Template Subject:</label>
        <Input 
          mb='12px'
          placeholder='Input email subject here'
          name="px_temp_subject"
          onChange= {(e) => setNewPatientTemplate({...newPatientTemplate, px_temp_subject: e.target.value})}
          required
        /> 
        <br />
        <label className="input-label">Template Content:</label>
        <Textarea 
          mb='12px'
          placeholder='Write your email contents here!'
          name="px_temp_content"
          onChange= {(e) => setNewPatientTemplate({...newPatientTemplate, px_temp_content: e.target.value})}
          required
          /> 
          <br />
        <label className="input-label">Template Tag:</label>
        <select name="category" className="email-category-selection" onChange= {(e) => setNewPatientTemplate({...newPatientTemplate, category: e.target.value})} required>
        <option value="">--Please choose an option below--</option>
        <option value="Outreach">Outreach</option>
        <option value="Billing">Billing</option>
        <option value="Other">Insurance</option>
        </select>

        <br />
        <label className="input-label">Language: </label>
        <select className="language-select" name="language" onChange={(e) => setNewPatientTemplate({...newPatientTemplate, language: e.target.value})} required>
          <option>--Select Language for email--</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
        </select>
       
        {/* </InputGroup> */}
        </div>)  
        
        : 
        
        ( 
        // Dr template input 
        <div className="create-email-inputs">
        <label className="input-label">Template Title:</label>
        {/* <InputGroup> */}
        <Input
           mb='12px'
           placeholder='Name your email for future searches'
           size='md'
           name="dr_temp_title"  
          onChange= {(e) => setNewDoctorTemplate({...newDoctorTemplate, dr_temp_title: e.target.value})}
          required
        />
        <br />
        <label className="input-label">Template Subject:</label>
        <Input 
          mb='12px'
          placeholder='Input email subject here'
          name="dr_temp_subject"
          onChange= {(e) => setNewDoctorTemplate({...newDoctorTemplate, dr_temp_subject: e.target.value})}
          required
        /> 
        <br />
        <label className="input-label">Template Content:</label>
        <Textarea 
          mb='12px'
          placeholder='Write your email contents here!'
          name="dr_temp_content"
          onChange= {(e) => setNewDoctorTemplate({...newDoctorTemplate, dr_temp_content: e.target.value})}
          required
          /> 
          <br />
        <label className="input-label">Template Tag:</label>
        <select name="category" className="email-category-selection" onChange= {(e) => setNewDoctorTemplate({...newDoctorTemplate, category: e.target.value})} required>
        <option value="">--Please choose an option below--</option>
        <option value="Outreach">Outreach</option>
        <option value="Billing">Billing</option>
        <option value="Other">Insurance</option>
        </select>
       
        {/* </InputGroup> */}
        </div>
      )
      }

        <br />
        <div className="email-submit-button">
        <Button  colorScheme='blue' variant='solid' size='lg' type='submit'>
            Create template
        </Button>
        </div>
  </form>
  <br />
</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  createPatientEmail,
  createDoctorEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmail)