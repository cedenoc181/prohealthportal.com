import React from 'react';
import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { fetchMedifiles } from '../../../ReduxActionsMain/medifilesActions.js';
import { Input,InputLeftElement, InputGroup } from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import "./Features.css";


export const Medical = ({ medifiles, loading, error, fetchMedifiles}) => {

useEffect(() => {
  fetchMedifiles();
},[fetchMedifiles]);


  const [collapse, setCollapse] = useState(false);

  const handleTemplate = () => setCollapse(!collapse);

  const [defaultLanguage, setDefualtLanguage] = useState(true);

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
        <li className="filter-li">English Forms</li>
        <li className="filter-li">Spanish Forms</li>
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
<div className="selected-menu">{ defaultLanguage ? "English Forms" : "Spanish Forms"}</div>
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
                  <Input className="searchBar" width="60%" focusBorderColor='orange.400' _placeholder={{ color: 'black' }} placeholder='find email template...' />
              </InputGroup>
             </div>
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

                <div className="categories-container">
                <button className="categories">APOS</button>
                <button className="categories">PT/OT</button>
                <button className="categories">Authorization</button>
                <button className="categories">All</button>
                </div>
          </div>

                <div className="renderContainer">
                { medifiles && medifiles.map((file) => (
                      <div className="renderMedical" key={file.id}>
                      <div className="medical-title">{file.title}</div>
                          <img className="medical-cover" src={file.file_cover_url} alt={file.file_cover_alt}/>
                          <br />
                           <div className="medical-category"><span className="key">Category:</span>{file.file_cover_alt}</div>
                           <div className="medical-language"><span className="key">Language:</span> {file.language}</div>
                      </div>
                ))}
                </div>


    </div>
  )
}

const mapStateToProps = (state) => ({
  medifiles: state.medifiles.data,
  loading: state.medifiles.loading,
  error: state.medifiles.error,
});

const mapDispatchToProps = {
  fetchMedifiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Medical);