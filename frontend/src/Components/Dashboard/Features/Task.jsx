import {React, useState} from 'react'
import { connect } from 'react-redux'
import "./Features.css"
import waterJug from '../../../images/WaterJug.png'
import cleaning from '../../../images/Cleaning.png'

export const Task = (props) => {

  const [collapse, setCollapse] = useState(false);

  const handleTemplate = () => setCollapse(!collapse);

  const [dailyOps, setDailyOps] = useState(["Appointment reminders", "Patient retention outreach", "Direct Access management", "referral management" ]);



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

<h2 className="task-title">Daily Operations</h2>
  <div className="task-previews">
        <table>
        <thead>
          <tr>
            <th >Daily Task</th>
          </tr>
        </thead>
        <tbody>

          {dailyOps.map((task)=> (
          <tr>
          <td> 
        <p className="task-point">  
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        </svg>
         &nbsp;
              {task}
         </p>
        </td>
        </tr>
          ))}

        </tbody>
        </table>
      </div> 
<h2 className="task-title"> Scheduled</h2>
<br />
<div className="opService">
  
      <div className="WaterDelivery">
          <h3>Water delivery</h3>
              <img src={waterJug} alt="water delivery"/>
              <p>Expected: 11/15/24</p>
      </div>

      <div className="cleaningService">
      <h3>Cleaning Service</h3>
            <img src={cleaning} alt="cleaning service"/>
        <p>Expected: 11/07/24</p>
      </div>
  </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Task)