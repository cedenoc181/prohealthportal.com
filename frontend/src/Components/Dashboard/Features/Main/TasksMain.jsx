import React, {useState} from 'react'
import { connect } from 'react-redux'
import './taskMain.css'

export const TasksMain = (props) => {


const [taskList, setTaskList] = useState(null);


  return (
    <div className="task-container">
 <div className="task-table">
        <h2 className="main-title">Appointment reminders</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Scheduled</th>
              <th>Confirmation</th>
              <th>Follow Up</th>
              <th>Actions</th>
            </tr>
          </thead>
             <tbody>
               <tr>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td><button>Edit</button></td>
               </tr>
             </tbody>
          </table>

        <div className="app-reminder-form">
              
        </div>


          </div>
<br />

          <div className="task-table">
        <h2 className="main-title">Patient retention</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Scheduled</th>
              <th>Follow Up</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
               <tr>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td><button>Edit</button></td>
               </tr>
             </tbody>
          </table>
          </div>

          <div className="task-table">
        <h2 className="main-title">Direct Access</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Initiated</th>
              <th>Visits Completed</th>
              <th>Follow Up</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
               <tr>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td><button>Edit</button></td>
               </tr>
             </tbody>
          </table>
          </div>

          <div className="task-table">
        <h2 className="main-title">Referral Manager</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Referred In</th>
              <th>Referred Out</th>
              <th>MD Association</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
               <tr>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td><button>Edit</button></td>
               </tr>
             </tbody>
          </table>
          </div>



    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TasksMain)