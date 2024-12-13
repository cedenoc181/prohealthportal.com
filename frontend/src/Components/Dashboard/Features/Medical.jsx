import React from 'react';
import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { fetchMedifiles, setSelectedMedifile } from '../../../ReduxActionsMain/medifilesActions.js';
import { Input,InputLeftElement, InputGroup } from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import ReactLoading from 'react-loading';
import { Navigate } from 'react-router-dom'; 
import "./Features.css";


export const Medical = ({ user, medifiles, loading, error, fetchMedifiles, setSelectedMedifile}) => {

const token = localStorage.getItem("jwt");
  console.log(token)

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("jwt"); // Retrieve the token
      fetchMedifiles(token); // Pass the token to the fetchMedifiles function
    }
  }, [fetchMedifiles, user]);



const handleSelectedMedifile = (file) => {
  setSelectedMedifile(file);
};
// default language is english
  const [defaultLanguage, setDefualtLanguage] = useState(true); 
  const [searchTerm, setSearchTerm] = useState('');
  
  const [collapse, setCollapse] = useState(false);
// sets filter from maps or query search parameters
  const [filter, setFilter] = useState(false);
// selecting category to render based on button filters
  const [selectedCategory, setSelectedCategory] = useState('');

  const [loadingSpinner, setLoadingSpinner] = useState(false);


  const handleTemplate = () => setCollapse(!collapse);

  const handleFilter = () => { setFilter(!filter); console.log("clicked")};


const handleLanguageE = () => {
  setLoadingSpinner(true);
  setTimeout(() => {
    setLoadingSpinner(false);
    setDefualtLanguage(true);
    setCollapse(false);
  }, 1250);

}

const handleLanguageS = () => {
  setLoadingSpinner(true);
  setTimeout(() => {
    setLoadingSpinner(false);
    setDefualtLanguage(false);
    setCollapse(false);
  }, 1250);

}

// track input if search field 
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

const handleCategoryChange = (category) => {
  setSelectedCategory(category);
};


console.log(medifiles);


const filterMedifilesCategory = medifiles.filter((file) => {
  const matchesCategory = selectedCategory 
  ? file.file_cover_alt && file.file_cover_alt.toLowerCase() === selectedCategory.toLowerCase() 
   : true;

   const matchesSearch = (file.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.file_cover_alt?.toLowerCase().includes(searchTerm.toLowerCase())
   ) ?? false;
   return matchesCategory && matchesSearch;
});


let englishMedifiles = filterMedifilesCategory.length > 0 ? filterMedifilesCategory.map((file) => (
  file.language === "English" ? (
        <div className="renderContainer" key={file.id} >
      <div className="renderMedical" onClick={() => handleSelectedMedifile(file)} >
      <div className="medical-title"><span className="key">{file.title}</span></div>
      <br />
          <img className="medical-cover" src={file.file_cover_url} alt={file.file_cover_alt}/>                           <div className="medical-category"><span className="key">Category:</span>{file.file_cover_alt}</div>
           <div className="medical-language"><span className="key">Language:</span> {file.language}</div>
      </div>
      </div>) : (<div></div>)
)) : "";


let spanishMedifiles = filterMedifilesCategory.length > 0 ? filterMedifilesCategory.map((file) => (
  file.language === "Spanish" ? (
  <div className="renderContainer" key={file.id} >
<div className="renderMedical" onClick={() => handleSelectedMedifile(file)} >
<div className="medical-title"><span className="key">{file.title}</span></div>
<br />
    <img className="medical-cover" src={file.file_cover_url} alt={file.file_cover_alt}/>   
     <div className="medical-category"><span className="key">Category:</span>{file.file_cover_alt}</div>
     <div className="medical-language"><span className="key">Language:</span> {file.language}</div>
</div>
</div>) : (<div></div>)
)) : "";

console.log(user);

if (!user) {
  return <Navigate to="/login" replace />;
};

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  };

  return (
    <div id="medical-forms" className="console">
     <div className="console-title">Medical Form<span>
     <div className="sideMenuItems">
     <svg className="svg" onClick={handleTemplate} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
     </svg>
    </div>
    
   {collapse ? 

   ( 
    <ul className="filter-li-container">
       <div onClick={handleLanguageE}>
        <li className="filter-li">English Forms</li>
        </div>
        <div onClick={handleLanguageS}>
        <li className="filter-li">Spanish Forms</li>
        </div>
        <div>
        <li className="filter-li">Saved Templates</li>
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
<div className="selected-menu">{ defaultLanguage ? "English Forms" : "Spanish Forms"}</div>
  <br />
          <div className="filter-Search">
            <div className="search-container">  
              <InputGroup className="inputGroup">
                    <InputLeftElement pointerEvents='none'>
                 <SearchIcon color='black.600' />
                    </InputLeftElement>
                  <Input className="searchBar" onChange={handleSearchChange} width="60%" focusBorderColor='blue.400' _placeholder={{ color: 'black' }} placeholder='find email template...' />
              </InputGroup>
             </div>
         </div>
  
        {/* sub filter buttons (categories) */}
        <br />
        
    <button className="filter-buttons" onClick={handleFilter}>Filter<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"/>
    </svg></span>
    </button>

    {          
         filter ?  
                (  
                <div className="categories-container">
                  <p className="tags">Tags <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
            <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
            <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z"/>
          </svg></p>
          <br />
          <div className="categorie-buttons">
                <button className="categories" onClick= {() => handleCategoryChange("APOS")}>APOS</button>
                <button className="categories" onClick= {() => handleCategoryChange("PTOT")}>PT/OT</button>
                <button className="categories" onClick= {() => handleCategoryChange("authorization")}>Authorization</button>
                <button className="categories" onClick= {() => handleCategoryChange("")}>All</button>
                </div>
                <br />
                </div>
                )
                :
                ("")
    }

 
<div id="loader">{loadingSpinner ? (<ReactLoading className="spin" type={"spinningBubbles"} color={"black"} height={'20%'} width={'20%'}/>) : ''} </div> 
        { defaultLanguage ? 
             (englishMedifiles) 
          :
             (spanishMedifiles)  
        }


    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  medifiles: state.medifiles.data,
  loading: state.medifiles.loading,
  error: state.medifiles.error,
});

const mapDispatchToProps = {
  fetchMedifiles,
  setSelectedMedifile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Medical);