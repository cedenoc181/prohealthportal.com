import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { Textarea, Input } from '@chakra-ui/react'

export const CreateMedifile = (props) => {


  return (
    <div className="create-medical-file">
        <h2 className="createTitle"> Add a New Medical file to database </h2>
            <form className="medifiles-form">
                <div className="create-email-inputs">
                <label className="input-label">Medical file title: </label>
                <Input 
                    mb='12px'
                    placeholder='Medical file title'
                    size='md'
                    name="pdf-title"  
                   required
                />
                 <br />
                 <label className="input-label">Medical file description</label>
                 <Textarea 
                     mb='12px'
                     placeholder="what is this file used for"
                     name="pdf-description"
                     required
                 />
                <br />
                <label className="input-label">Medical file link: </label>
                <Input 
                    mb='12px'
                    placeholder='Medical file link'
                    size='md'
                    name="pdf-file"  
                   required
                />      
                <br />
                <label className="input-label">Medical file cover: </label>
                <Input 
                    mb='12px'
                    placeholder='Medical file cover'
                    size='md'
                    name="pdf-cover"  
                   required
                />  
                  <br />
               <label className="input-label">Medical file category:</label>
               <select name="category" className="medical-category-selection"  required>
               <option value="">--Please choose form category --</option>
               <option value="APOS">APOS</option>
               <option value="PT/OT">PT or OT</option>
               <option value="authorization">Authorization</option>
               <option value="General">General</option>
               </select>
                <br />
               <label className="input-label">Medical file language:</label>
               <select name="language" className="medical-language-selection"  required>
               <option value="">--Please choose form language --</option>
               <option value="English">English</option>
               <option value="Spanish">Spanish</option>
               </select>
               </div>
                 <div className="medifile-submit-button">
                 <Button  colorScheme='blue' variant='solid' size='lg' type='submit'>
                     Create template
                 </Button>
                 </div>

            </form>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMedifile)