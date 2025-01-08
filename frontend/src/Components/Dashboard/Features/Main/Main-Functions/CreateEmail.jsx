import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { Textarea, Input } from '@chakra-ui/react'
import { createPatientTemplates } from '../../../../../ReduxActionsMain/userActions.js'
import { createDrTemplates } from '../../../../../ReduxActionsMain/userActions.js'


export const CreateEmail = ({createPatientTemplates, createDrTemplates, templateObject}) => {



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
    if (templateToggler === true ) {
      alert("switching email template for doctors")
    } else {
      alert("switching email template for patients")
    }
  }
  
  const handleCreate = () => {
    if (templateToggler) {
      // Validate patient template fields before creating
      if (newPatientTemplate.px_temp_title && newPatientTemplate.px_temp_subject && newPatientTemplate.px_temp_content && newPatientTemplate.category && newPatientTemplate.language) {
        createPatientTemplates(newPatientTemplate);
        alert("patiient email created successfully");
      } else {
        alert("Please fill out all required patient email fields.");
        console.log("Please fill out all required patient email fields.");
      }
    } else {
      // Validate doctor template fields before creating
      if (newDoctorTemplate.dr_temp_title && newDoctorTemplate.dr_temp_subject && newDoctorTemplate.dr_temp_content && newDoctorTemplate.category) {
        console.log("dr temp is selected")
        createDrTemplates(newDoctorTemplate);
        alert("doctor email created successfully");
      } else {
        alert("Please fill out all required patient email fields.");
        console.log("Please fill out all required doctor email fields.");
      }
    }


  };
  
  useEffect(() => {
    if (templateObject) {
      setNewPatientTemplate({
        px_temp_subject: templateObject.subject,
          px_temp_content: templateObject.body,
          category: templateObject.category,
      }) && setNewDoctorTemplate ({
        dr_temp_subject: templateObject.subject,
        dr_temp_content: templateObject.body,
        category: templateObject.category,
      })
    }
    }, [templateObject])
    
    console.log('patient template:', newPatientTemplate)
    
    console.log('doctor template:', newDoctorTemplate)


    function handleClearInput () {
      setNewPatientTemplate({
        px_temp_title: '',
        px_temp_subject: '',
        px_temp_content: '',
        category: '',
        language: ''
      }) && 

      setNewDoctorTemplate({
        dr_temp_title: '',
        dr_temp_subject: '',
        dr_temp_content: '',
        category: ''
      })
    }
      
  return (

<div className="main-container">
<br />
<div className="create-email-title">
        
        
        { templateToggler ? 
         ( 
          // if true show patient 
          <div className="toggler-container">
          <h2 className="createTitle">Create New Patient Email Template</h2>
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
      <h2 className="createTitle">Create New Doctor Email Template</h2>
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
      <form className="create-email-form" name="email-addition" onSubmit={handleCreate}>
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
          value={newPatientTemplate.px_temp_subject}
          onChange= {(e) => setNewPatientTemplate({...newPatientTemplate, px_temp_subject: e.target.value})}
          required
        /> 
        <br />
        <label className="input-label">Template Content:</label>
        <Textarea 
          mb='12px'
          placeholder='Write your email contents here!'
          name="px_temp_content"
          value={newPatientTemplate.px_temp_content}
          onChange= {(e) => setNewPatientTemplate({...newPatientTemplate, px_temp_content: e.target.value})}
          required
          /> 
          <br />
        <label className="input-label">Template Tag:</label>
        <select name="category" className="email-category-selection" onChange= {(e) => setNewPatientTemplate({...newPatientTemplate, category: e.target.value})} required>
        <option value={newPatientTemplate.category}>{newPatientTemplate.category}</option>
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
        <option value="--Please choose an option below--">--Please choose an option below--</option>
        <option value="Protocols">Protocols</option>
        <option value="Referral">Referral</option>
        <option value="Other">Other</option>
        </select>
       
        {/* </InputGroup> */}
        </div>
      )
      }
          <br />
        <p className="email-instructions"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
          </svg></span>Emails created will be added to the lift on the console either patient or doctor,
           search or filter to find your new email template.</p> 

        <br />
        <div className="post-email-button">
        <Button  colorScheme='blue' variant='solid' size='lg' type='submit'>
            Create template
        </Button>
        </div>
        <br />
        <div className="clear-post-input">
          <button onClick={handleClearInput}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
             <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
             <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
          </button>
        </div>
  </form>
  <br />
</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  createPatientTemplates,
  createDrTemplates,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmail)