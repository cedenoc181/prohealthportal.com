import React from 'react'
import { connect } from 'react-redux'
import dummyPDF from './Auth-Empire.pdf'
import './MedicalMain.css'
import { Textarea, Text, Button } from '@chakra-ui/react'

export const MedicalMain = (props) => {
  return (
    <div className="Medical-container">

      <div className="pdf-container">
        <h2 className="pdf-title">Auth Title</h2>
        <p className="pdf-instruction"></p>
      <iframe
      title=""
      className="pdf-main"
      src={dummyPDF}
      frameborder="1"
      ></iframe>
      <div className="medicalPublishDate">Date published</div>
      </div>
      <div className="pdf-info">
      <Text mb='8px'>Notes:</Text>
            <Textarea
            className="email-textarea"
               placeholder='Note email info to optimize for patient or Dr. interaction, keep track and organized.'
               size='md'
            />
            <div className="medical-submit-button">
           <Button  colorScheme='blue' variant='solid' size='lg'>
                Save template
            </Button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalMain)