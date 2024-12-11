import React from 'react';
import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Input,InputLeftElement, InputGroup } from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import ReactLoading from 'react-loading';
import { Navigate } from 'react-router-dom'; 
import "./Features.css";
import { fetchPatientEmails, setSelectedPatientEmail } from '../../../ReduxActionsMain/patientEmailActions.js';
import { fetchDoctorEmails,  setSelectedDoctorEmail} from '../../../ReduxActionsMain/doctorEmailActions.js';
 
export const Email = ({user, patient, doctor, loading, error, fetchPatientEmails, fetchDoctorEmails, setSelectedPatientEmail, setSelectedDoctorEmail}) => {

  const token = localStorage.getItem("jwt");
  console.log(token)

// states 
const [searchTerm, setSearchTerm] = useState('');
  const [patientDefault, setPatientDefault] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filter, setFilter] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);


// fetches and renders emails from each patient and doctor actions method 
useEffect(() => { 
  if (user) {
    const token = localStorage.getItem("jwt"); // Retrieve the token
    fetchDoctorEmails(token);
    fetchPatientEmails(token); // Pass the token to the fetchMedifiles function
  }
}, [fetchPatientEmails, fetchDoctorEmails, user]);

// this function manages the nav button extending and minimizing 
const handleTemplate = () => setCollapse(!collapse);

const handleFilter = () => { setFilter(!filter); console.log("clicked")};

// following functions sends selected objects to Main components to be rendered on its own
const handleSelectedPxEmail = (file) => {
  setSelectedPatientEmail(file);
};

const handleSelectedDrEmail = (file) => {
  setSelectedDoctorEmail(file);
};


// changes fetched emails to Dr emails 
const handleDrClick = () => {
  setLoadingSpinner(true);
  setTimeout(() => {
    setLoadingSpinner(false);
    setCollapse(false);
    setPatientDefault(false);
  }, 1250);

}

// changes fetched emails to patient emails 
const handlePxClick = () => {
  setLoadingSpinner(true);
  setTimeout(() => {
    setLoadingSpinner(false);
  setCollapse(false);
  setPatientDefault(true);
  }, 1250);
 
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
  // Check if the selectedCategory matches the category of the file (or if no category is selected, include all files)
  const matchesCategory = selectedCategory 
    ? file.category && file.category.toLowerCase() === selectedCategory.toLowerCase() 
    : true;

  // Check if the search term matches any of the fields
  const matchesSearch = (file.px_temp_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.px_temp_subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.px_temp_content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.category?.toLowerCase().includes(searchTerm.toLowerCase())) 
                         ?? false;

  // Return true only if both matchesCategory and matchesSearch are true
  return matchesCategory && matchesSearch;
});



// Use filtered emails to create the template for rendering
let patientEmailTemplate = filteredPatients.length > 0 ? filteredPatients.map((file) => (
  <div className="renderEmails" key={file.id} onClick={() => handleSelectedPxEmail(file)}> 
    <div className="email-title">{file.px_temp_title}</div>
    <div className="email-subject"><span className="key">Subject:</span> {file.px_temp_subject}</div>
    <br />
    <div className="email-contents"><span className="key">Body:</span> {file.px_temp_content}</div>
    <div className="email-category"><span className="key">Tag:</span> {file.category}</div>
  </div>
)) : <div className="emailsNotFound"><ReactLoading type={"spinningBubbles"} color={"black"} height={667} width={375} /></div>;

// Filter doctor emails based on search term
const filteredDoctors = doctor.filter((file) => {
  // Check if the selectedCategory matches the category of the file (or if no category is selected, include all files)
  const matchesCategory = selectedCategory 
    ? file.category && file.category.toLowerCase() === selectedCategory.toLowerCase() 
    : true;

  // Check if the search term matches any of the fields
  const matchesSearch = (file.dr_temp_title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         file.dr_temp_subject?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         file.dr_temp_content?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         file.category?.toLowerCase().includes(searchTerm.toLowerCase())) 
                         ?? false;

  // Return true only if both matchesCategory and matchesSearch are true
  return matchesCategory && matchesSearch;
});







// Use filtered emails to create the template for rendering
let doctorEmailTemplate = filteredDoctors.length > 0 ? filteredDoctors.map((file) => (
  <div className="renderEmails" key={file.id} onClick={() => handleSelectedDrEmail(file)}> 
    <div className="email-title">{file.dr_temp_title}</div>
    <div className="email-subject"><span className="key">Subject:</span> {file.dr_temp_subject}</div>
    <br />
    <div className="email-contents"><span className="key">Body:</span> {file.dr_temp_content}</div>
    <div className="email-category"><span className="key">Tag:</span> {file.category}</div>
  </div>
)) : <div className="emailsNotFound"><ReactLoading type={"spinningBubbles"} color={"black"} height={667} width={375} /></div>;



// renders alternative content if data is not available

if (!user) {
  return <Navigate to="/login" replace />;
};

if (loading) {
    return <div></div>;
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
<br />
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

        {/* sub filter buttons (categories) */}
<br />

        <button className="filter-buttons" onClick={handleFilter}>Filter<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"/>
</svg></span></button>

        {
  filter ? (
    patientDefault ? (
      <div className="categories-container">
        <p className="tags">Tags <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
  <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
  <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z"/>
</svg></p>
        <br />
        <div className="categorie-buttons">
        <button className="categories" onClick={() => handleCategoryChange('Insurance')}>Insurance</button>
        <button className="categories" onClick={() => handleCategoryChange('Outreach')}>Outreach</button>
        <button className="categories" onClick={() => handleCategoryChange('Billing')}>Billing</button>
        <button className="categories" onClick={() => handleCategoryChange('')}>Show all</button>
        </div>
      </div>
    ) : (
      <div className="categories-container">
         <p className="tags">Tags <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
  <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
  <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z"/>
</svg></p>
         <br />
         <div className="categorie-buttons">
        <button className="categories" onClick={() => handleCategoryChange('Protocols')}>Protocols</button>
        <button className="categories" onClick={() => handleCategoryChange('Referral')}>Referral</button>
        <button className="categories" onClick={() => handleCategoryChange('Other')}>Other</button>
        <button className="categories" onClick={() => handleCategoryChange('')}>Show all</button>
      </div>
      </div>
    )
  ) : (
    null
  )
}
                  <div id="loader">{loadingSpinner ? (<ReactLoading className="spin" type={"spinningBubbles"} color={"black"} height={'20%'} width={'20%'}/>) : ''} </div>  
                    { patientDefault ? 
                        (patientEmailTemplate)
                     : 
                        (doctorEmailTemplate)
                     }
                </div>
            </div>
      
  )
}

const mapStateToProps = (state) => ({
    user: state.user.data,
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