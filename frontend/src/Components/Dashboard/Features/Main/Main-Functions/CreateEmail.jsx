import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { Textarea, Input } from '@chakra-ui/react'

export const CreateEmail = (props) => {

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
      
  return (

<div>
<form className="create-email-form">
<br />
<div className="create-email-title">
        <h2 className="createTitle">Create a new Email Template</h2>
      </div>
      <br />
        <div className="create-email-inputs">
        <label className="input-label">Template Title:</label>
        {/* <InputGroup> */}
        <Input
           mb='12px'
           placeholder='Name your email for future searches'
           size='md'
           name="notes"  // This is necessary to ensure the correct property is updated in your state
           value={myPatientTemplate.notes}
          onChange={handlePatientTemplateChange}
        />
        <br />
        <label className="input-label">Template Subject:</label>
        <Input 
          mb='12px'
          placeholder='Input email subject here'
        
        /> 
        <br />
        <label className="input-label">Template Content:</label>
        <Textarea 
          mb='12px'
          placeholder='Write your email contents here!'
          
          /> 
          <br />
        <label className="input-label">Template Tag:</label>
        <select name="Tags" className="email-category-selection" >
        <option value="">--Please choose an option below--</option>
        <option value="Outreach">Outreach</option>
        <option value="Billing">Billing</option>
        <option value="Other">Insurance</option>
        </select>
       
        {/* </InputGroup> */}
        </div>
        <br />
        <div className="email-submit-button">
        <Button  colorScheme='blue' variant='solid' size='lg'>
            Create template
        </Button>
        </div>
  </form>
</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmail)