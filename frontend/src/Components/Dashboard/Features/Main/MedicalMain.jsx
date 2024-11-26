import React from 'react'
import { connect } from 'react-redux'
// import dummyPDF from './Auth-Empire.pdf'
import './MedicalMain.css'
import './Main.css'
import { Textarea, Text, Button } from '@chakra-ui/react'


export const MedicalMain = ({ selectedMedifile }) => {

  if (!selectedMedifile) {
    return <div>Please select an item from the list.</div>;
  }

  console.log("PDF URL:", selectedMedifile.file_link_url);


  return (
    <div className="main-container">

      <div className="pdf-container">
        <h2 className="pdf-title">{selectedMedifile.title}</h2>
        <p className="pdf-description">{selectedMedifile.description}</p>

        {/* <iframe
           title={selectedMedifile.title}
           className="pdf-main"
           src={selectedMedifile.file_link_url} // Use the static S3 URL generated above
           frameborder="1"
        /> */}

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
      <div className="medicalPublishDate"><span>Published:&nbsp; </span> {selectedMedifile.created_at}</div>
      <br />
      <p className="pdf-instruction">{selectedMedifile.instructions}</p>
      <br />
      </div>
      <br />
      <div className="pdf-info">
        <br />
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

const mapStateToProps = (state) => ({

  selectedMedifile: state.medifiles.selectedMedifile,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalMain)