import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { Textarea, Input } from '@chakra-ui/react'
import { createMedifile } from '../../../../../ReduxActionsMain/medifilesActions.js'



export const CreateMedifile = ({ createMedifile }) => {


const [newMedifileObject, setNewMedifileObject] = useState({
    title: '',
    description: '',
    instructions: '',
    file_link: '',
    file_cover: '',
    category: '',
    language: '',
   file_editable: ''
})

const handleCreateMedifile = () => {
    if (newMedifileObject.title && newMedifileObject.description && newMedifileObject.instructions && newMedifileObject.file_link && newMedifileObject.file_cover && newMedifileObject.category && newMedifileObject.language && newMedifileObject.file_editable) {
        createMedifile(newMedifileObject)
    } else {
        alert ('Fill out all inputs in order to add new medifile to database.')
        console.log("fill out all inputs in order to add new medifile to database")
    }
}



  return (
    <div className="create-medical-file">
        <h2 className="createTitle"> Add a New Medical file to database </h2>
            <form className="medifiles-form" name="medical-form -addition" onSubmit={handleCreateMedifile}>
                <div className="create-email-inputs">
                <label className="input-label">Medical file title: </label>
                <Input 
                    mb='12px'
                    placeholder='Medical file title'
                    size='md'
                    name="pdf-title"  
                    onChange={(e) => setNewMedifileObject({...newMedifileObject, title: e.target.value})}
                   required
                />
                 <br />
                 <label className="input-label">Medical file description: </label>
                 <Textarea 
                     mb='12px'
                     placeholder="Advise the purpose of the form."
                     name="pdf-description"
                     onChange={(e) => setNewMedifileObject({...newMedifileObject, description: e.target.value})}
                     required
                 />
                  <br />
                 <label className="input-label">Medical file instructions: </label>
                 <Textarea 
                     mb='12px'
                     placeholder="Advise how file should be store and filed."
                     name="pdf-instructions"
                     onChange={(e) => setNewMedifileObject({...newMedifileObject, instructions: e.target.value})}
                     required
                 />
                <br />
                <label className="input-label">Medical file link: </label>
                <div class="input-group mb-3">
                  <input 
                  type="file"
                  class="form-control" 
                  id="inputGroupFile02"   
                  name="pdf-link"  
                  onChange={(e) => setNewMedifileObject({...newMedifileObject, file_link: e.target.value})}
                 required 
                 />
                 </div>
                <br />
            
                <label className="input-label">Medical file cover: </label>
                <div class="input-group mb-3">
                  <input 
                  type="file"
                  class="form-control" 
                  id="inputGroupFile02"   
                  name="pdf-cover"  
                  onChange={(e) => setNewMedifileObject({...newMedifileObject, file_cover: e.target.value})}
                 required 
                 />
                </div>
                  <br />

                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  onChange={(e) => setNewMedifileObject({...newMedifileObject, file_editable: e.target.value})}/>
                    <label class="form-check-label" for="flexSwitchCheckChecked">Editable File?</label>
                </div>

                <br />
                  {/* the data below will be saved as category on frontend UI but on backend UI it will be saved under file cover ALT to kill two birds one stone */}
               <label className="input-label" >Medical file category:</label>
               <select name="category" className="medical-category-selection"  onChange={(e) => setNewMedifileObject({...newMedifileObject, category: e.target.value})} required>
               <option value="">--Please choose form category --</option>
               <option value="APOS">APOS</option>
               <option value="PT/OT">PT or OT</option>
               <option value="authorization">Authorization</option>
               <option value="General">General</option>
               </select>
                <br />

               <label className="input-label">Medical file language:</label>
               <select name="language" className="medical-language-selection"   onChange={(e) => setNewMedifileObject({...newMedifileObject, language: e.target.value})} required>
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

const mapDispatchToProps = {
    createMedifile,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMedifile)