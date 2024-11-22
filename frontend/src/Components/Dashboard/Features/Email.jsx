import React from 'react';
import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Input,InputLeftElement, InputGroup } from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import "./Features.css";
import { fetchPatientEmails, setSelectedPatientEmail } from '../../../ReduxActionsMain/patientEmailActions.js';
import { fetchDoctorEmails,  setSelectedDoctorEmail} from '../../../ReduxActionsMain/doctorEmailActions.js';
 
export const Email = ({patient, doctor, loading, error, fetchPatientEmails, fetchDoctorEmails, setSelectedPatientEmail, setSelectedDoctorEmail}) => {


// states 
const [searchTerm, setSearchTerm] = useState('');
  const [patientDefault, setPatientDefault] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');



// fetches and renders emails from each patient and doctor actions method 
useEffect(() => { 
    fetchDoctorEmails();
     fetchPatientEmails();
}, [fetchPatientEmails, fetchDoctorEmails]);

// this function manages the nav button extending and minimizing 
const handleTemplate = () => setCollapse(!collapse);

// following functions sends selected objects to Main components to be rendered on its own
const handleSelectedPxEmail = (file) => {
  setSelectedPatientEmail(file);
};

const handleSelectedDrEmail = (file) => {
  setSelectedDoctorEmail(file);
};

// changes fetched emails to Dr emails 
const handleDrClick = (event) => {
  setPatientDefault(false);
  setCollapse(false);
}

// changes fetched emails to patient emails 
const handlePxClick = () => {
  setPatientDefault(true);
  setCollapse(false);
}

// track input if search field 
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

const handleCategoryChange = (category) => {
  setSelectedCategory(category);
};



// Filter patient emails based on search term
const filteredPatients = patient.filter((file) => {
  const matchesCategory = selectedCategory ? file.category.toLowerCase() === selectedCategory.toLowerCase() : true;
  const matchesSearch = file.px_temp_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        file.px_temp_subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        file.px_temp_content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        file.category.toLowerCase().includes(searchTerm.toLowerCase());

  return matchesCategory && matchesSearch;
});

// Use filtered emails to create the template for rendering
let patientEmailTemplate = filteredPatients.length > 0 ? filteredPatients.map((file) => (
  <div className="renderEmails" key={file.id} onClick={() => handleSelectedPxEmail(file)}> 
    <div className="email-title">{file.px_temp_title}</div>
    <div className="email-subject"><span className="key">Subject:</span> {file.px_temp_subject}</div>
    <br />
    <div className="email-contents"><span className="key">Body:</span> {file.px_temp_content}</div>
    <div className="email-category"><span className="key">Category:</span> {file.category}</div>
  </div>
)) : <div className="emailsNotFound">Emails not found, try filter buttons above.</div>;

// Filter doctor emails based on search term
const filteredDoctors = doctor.filter((file) => {
  const matchesCategory = selectedCategory ? file.category.toLowerCase() === selectedCategory.toLowerCase() : true;
  const matchesSearch = file.dr_temp_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        file.dr_temp_subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        file.dr_temp_content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        file.category.toLowerCase().includes(searchTerm.toLowerCase());

  return matchesCategory && matchesSearch;
});


// Use filtered emails to create the template for rendering
let doctorEmailTemplate = filteredDoctors.length > 0 ? filteredDoctors.map((file) => (
  <div className="renderEmails" key={file.id} onClick={() => handleSelectedDrEmail(file)}> 
    <div className="email-title">{file.dr_temp_title}</div>
    <div className="email-subject"><span className="key">Subject:</span> {file.dr_temp_subject}</div>
    <br />
    <div className="email-contents"><span className="key">Body:</span> {file.dr_temp_content}</div>
    <div className="email-category"><span className="key">Category:</span> {file.category}</div>
  </div>
)) : <div className="emailsNotFound">Emails not found, try filter buttons above.</div>;



// renders alternative content if data is not available 
if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  };


       

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
        <div onClick={handlePxClick}>
        <li className="filter-li">Patient Templates</li>
        </div>
        <div onClick={handleDrClick}>
        <li className="filter-li" >Doctor Templates</li>
        </div>
        <div onClick="">
        <li className="filter-li">My Templates</li>
        </div>
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

{/* search bar */}
          <div className="filter-Search">
            <div className="search-container">  
              <InputGroup className="inputGroup">
                    <InputLeftElement pointerEvents='none'>
                 <SearchIcon color='black.600' />
                    </InputLeftElement>
                  <Input className="searchBar" onChange={handleSearchChange} width="60%" focusBorderColor='blue.400' _placeholder={{ color: 'black' }} placeholder='find email template...' />
              </InputGroup>
             </div>

            <div className="filter-buttons">

        {/* sub filter buttons (categories) */}

        {
    patientDefault ?
    (
        <div className="categories-container">
            <button className="categories" onClick={() => handleCategoryChange('Insurance')}>Insurance</button>
            <button className="categories" onClick={() => handleCategoryChange('Outreach')}>Outreach</button>
            <button className="categories" onClick={() => handleCategoryChange('Billing')}>Billing</button>
        </div>
    ) :
    (
        <div className="categories-container">
            <button className="categories" onClick={() => handleCategoryChange('Protocols')}>Protocols</button>
            <button className="categories" onClick={() => handleCategoryChange('Outreach')}>Outreach</button>
            <button className="categories" onClick={() => handleCategoryChange('Referral')}>Referral</button>
            <button className="categories" onClick={() => handleCategoryChange('Other')}>Other</button>
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
    setSelectedPatientEmail,
    setSelectedDoctorEmail,
  };

export default connect(mapStateToProps, mapDispatchToProps)(Email);