import {React, useState} from 'react'
import { connect } from 'react-redux'
import "./Features.css"

export const Email = (props) => {
const [patientTemp, setPatientTemp] = useState(null);
const [drTemp, setDrTemp] = useState(null);

const [patientDefault, setPatientDefualt] = useState(true);

const [collapse, setCollapse] = useState(false);

let filterCategories = ["response rate descending", "created on", "created by"] ;


const handleTemplate = () => setCollapse(!collapse);
       

  return (
    <div id="e-templates" className="console">
     <div className="console-title">Email Templates<span>
     <div className="sideMenuItems">
     <svg className="svg" onClick={handleTemplate} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
     </svg>
    </div>
   {collapse ? 
   ( 
    <ul className="filter-li-container">
        <li className="filter-li">Patient Templates</li>
        <li className="filter-li">Doctor Templates</li>
        <li className="filter-li">Saved Templates</li>
    </ul>

)
   :
    (
        " "
    )
}

</span>
</div>
      
<div className="selected-menu">{patientDefault ? "Patient Template" : "Dr Template"}</div>
<button className="addTemplate"></button>

          <div className="filter-Search">
            <div className="search-container">  
              <input className="searchBar" placeholder='Find email template' />
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
        <div><h3>Categories filter</h3></div>
                    <div><button>APOS</button></div>
                    <div><button>PT/OT</button></div>
                    <div><button>Outreach</button></div>




                <div className="renderEmails">
                    {/* { patientDefault ? 
                    `
                    <div className="email-title">${patientTemp.title}</div>
                    <div className="email-subject"> ${patientTemp.subject} </div>
                    <div className="email-contents">${patientTemp.content}</div>
                     <div className="email-category">${patientTemp.category}</div>
                     <div className="email-language">${patientTemp.language}</div>
                     `
                     : 
                     `
                     <div className="email-title">${drTemp.title}</div>
                    <div className="email-subject"> ${drTemp.subject} </div>
                    <div className="email-contents">${drTemp.content}</div>
                     <div className="email-category">${drTemp.category}</div>
                     ` } */}
                </div>
            </div>
       </div>
    </div>
  )
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Email);