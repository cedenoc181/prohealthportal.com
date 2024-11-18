import React from 'react';
import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Input,InputLeftElement, InputGroup } from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import "./Features.css";
import { fetchPatientEmails } from '../../../ReduxActionsMain/patientEmailActions.js';
import { fetchDoctorEmails } from '../../../ReduxActionsMain/doctorEmailActions.js';
 
export const Email = ({patient, doctor, loading, error, fetchPatientEmails, fetchDoctorEmails}) => {

useEffect(() => { 
    fetchDoctorEmails();
     fetchPatientEmails();
}, [fetchPatientEmails, fetchDoctorEmails]);



const [patientTemp, setPatientTemp] = useState([]);
const [drTemp, setDrTemp] = useState([]);
const [patientDefault, setPatientDefault] = useState(true);
const [collapse, setCollapse] = useState(false);

let filterCategories = ["response rate descending", "created on", "created by"] ;


let patientEmailTemplate = patient.length > 0 ? patient.map((file) => (
    <div className="renderEmails" key={file.id}> 
      <div className="email-title">{file.px_temp_title}</div>
      <div className="email-subject"><span className="key">Subject:</span> {file.px_temp_subject}</div>
      <br />
      <div className="email-contents"><span className="key">Body:</span> {file.px_temp_content}</div>
      <div className="email-category"><span className="key">Category:</span> {file.category}</div>
    </div>
  )) : null;

  let doctorEmailTemplate = doctor.length > 0 ? doctor.map((file) => (
    <div className="renderEmails" key={file.id}> 
      <div className="email-title">{file.dr_temp_title}</div>
      <div className="email-subject"><span className="key">Subject:</span> {file.dr_temp_subject}</div>
      <br />
      <div className="email-contents"><span className="key">Body:</span> {file.dr_temp_content}</div>
      <div className="email-category"><span className="key">Category:</span> {file.category}</div>
    </div>
  )) : null;







if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  };

const handleTemplate = () => setCollapse(!collapse);
       

  return (
    <div id="e-templates" className="console">
     <div className="console-title">Email Templates<span>
     <div className="sideMenuItems">
     <svg className="svg" onClick={handleTemplate} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
     </svg>
    </div>
   {collapse ? 
   ( 
    <ul className="filter-li-container">
        <li className="filter-li">Patient</li>
        <li className="filter-li">Doctor</li>
        {/* <li className="filter-li">Saved Templates</li> */}
    </ul>

)
   :
    (
        ""
    )
}

</span>
</div>
      <br />
<div className="selected-menu">{patientDefault ? "Patient Template" : "Doctor Template"}</div>
<button className="addTemplate"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
  <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5z"/>
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/>
</svg></button>

          <div className="filter-Search">
            <div className="search-container">  
              <InputGroup className="inputGroup">
                    <InputLeftElement pointerEvents='none'>
                 <SearchIcon color='black.600' />
                    </InputLeftElement>
                  <Input className="searchBar" width="60%" focusBorderColor='blue.400' _placeholder={{ color: 'black' }} placeholder='find email template...' />
              </InputGroup>
             </div>

            <div className="filter-buttons">
     {/*filter by  */}
     <div>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

        {/* sub filter buttons (categories) */}

        {
            patientDefault ?
            
            (   
                <div className="categories-container">
                <button className="categories">APOS</button>
                <button className="categories">PT/OT</button>
                <button className="categories">Outreach</button>
                <button className="categories">Billing</button>
                </div>
            ) 
            
            :
            
            (
                <div className="categories-container">
                <button className="categories">APOS</button>
                <button className="categories">PT/OT</button>
                <button className="categories">Outreach</button>
                <button className="categories">Referral</button>
                </div>
            )
        }
                    
                    { patientDefault ? 
                        (patientEmailTemplate)
                     : 
                        (doctorEmailTemplate)
                     }
                </div>
            </div>
       </div>
  )
}

const mapStateToProps = (state) => ({
    patient: state.patient.data,
    doctor: state.doctor.data,
    loading: state.patient.loading || state.doctor.loading,
    error: state.patient.error || state.doctor.error,
  });
  
  const mapDispatchToProps = {
    fetchPatientEmails,
    fetchDoctorEmails,
  };

export default connect(mapStateToProps, mapDispatchToProps)(Email);