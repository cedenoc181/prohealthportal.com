import {React, useState} from 'react'
import { connect } from 'react-redux'
import "./Features.css"


export const Task = (props) => {

  const [collapse, setCollapse] = useState(false);

  const handleTemplate = () => setCollapse(!collapse);



  return (
    <div id="task-list" className="console">

  <div className="console-title">Task Tracker<span>
     <div className="sideMenuItems">
     <svg className="svg" onClick={handleTemplate} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
     </svg>
    </div>
   {collapse ? 
   ( 
    // if front desk/ PT or OT 
    //daily operations will be for:  all task that fd will be in charge of like schedule, inventory, medifiles, checklist 
    // authorizations will be for : auth status, track D.A, case management(get new Rx),  
    //APOS will track: pick up status, signature pending, date letter faxed, 1st FU visit scheduled
    <ul className="filter-li-container">
        <li className="filter-li">Daily operations</li> 
        <li className="filter-li"> authorizations</li>
        <li className="filter-li">APOS</li>
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
<div className="selected-menu">Daily operations</div>

  <div className="task-previews">
    <h2 className="task-title">Daily Operations</h2>
        <p className="task-point">    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    </svg>
      &nbsp;</p>
        <p className="task-point">    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    </svg>
      &nbsp;</p>
        <p className="task-point">    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    </svg>
      &nbsp;</p>
  </div>
  <br />
  <div className="task-previews">
    <h2 className="task-title">Authoriztions</h2>
   <p className="task-point"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    </svg>
      &nbsp;
       do reminder calls 
    </p>
    <p className="task-point"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    </svg>
      &nbsp;
       do reminder calls 
    </p>
    <p className="task-point"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    </svg>
      &nbsp;
       do reminder calls 
    </p>
  </div>
  <br />
  <div className="task-previews">
    <h2 className="task-title">APOS</h2>
    <p className="task-point">    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    </svg>
      &nbsp;</p>
    <p className="task-point">    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    </svg>
      &nbsp;</p>
    <p className="task-point">    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    </svg>
      &nbsp;</p>
  </div>
      
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Task)