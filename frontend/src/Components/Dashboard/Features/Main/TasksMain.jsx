import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import './taskMain.css'

export const TasksMain = (props) => {







const [taskList, setTaskList] = useState(null);

const [isEditingReminder, setIsEditingReminder] = useState(false);


const [apptReminders, setApptReminders] = useState([
  {

  }
]);


const [defaultDate, setDefaultDate] = useState('');

useEffect(() => {
  // Create a new date instance for today
  let today = new Date();
  
  // Set the date to tomorrow
  today.setDate(today.getDate() + 1);
  today.setHours(4, 0, 0, 0); //9:00am
  // Format the date to 'YYYY-MM-DDTHH:MM' to match input[type="datetime-local"] format
  const formattedDate = today.toISOString().slice(0, 16);
  
  // Update the state with the formatted date
  setDefaultDate(formattedDate);
}, []);



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
              <th>Actions</th>
            </tr>
          </thead>
             <tbody>
               <tr>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td><button>Edit</button></td>
               </tr>
             </tbody>
          </table>

          <div className="add-inventory-item-form">
          <h3>{isEditingReminder ? 'Edit Appointment Remidner' : 'Add Appointment Remidner'}</h3>
          <input
            type="name"
            name="patient"
            placeholder="Patient's Name"
            value=""
            onChange={""}
          />
      
          <input
          type="datetime-local"
          name="scheduled"
          placeholder="Scheduled time"
          value={defaultDate}
          onChange={""}
          />
    

          <select name="confirmation" value="" onChange={""}>
            <option value="default">Appointment Confirmed</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <button onClick={""}>
            {isEditingReminder ? 'Update Patient Reminder' : 'Add Patient Reminder'}
          </button>
        </div>

          </div>
<br />

          <div className="task-table">
        <h2 className="main-title">Patient retention</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Status</th>
              <th>Scheduled</th>
              <th>Outreach</th>
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

          <div className="add-inventory-item-form">
          <h3>{isEditingReminder ? 'Edit Patient Status' : 'Add Patient Status'}</h3>

          <input
            type="name"
            name="patient"
            placeholder="Patient's Name"
            value=""
            onChange={""}
          />

        <select name="status" value=" " onChange={""} >
            <option value="">Status</option>
            <option value="Interested">Interested</option>
            <option value="Not Interested">Not Interested</option>
            <option value="Away">Away</option>
            <option value="Pending Insurance">Pending Insurance</option>
            <option value="Pending Referral">Pending Referral</option>
          </select>

          <select name="Scheduled" value="" onChange={""}>
            <option value="default">Appointment Scheduled</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <input
          type="date"
          name="conntacted"
          placeholder="Last outreach"
          value=""
          onChange={""}
          />

          <button onClick={""}>
            {isEditingReminder ? 'Update Patient Status' : 'Add Patient Status'}
          </button>
        </div>

          </div>

          <div className="task-table">
        <h2 className="main-title">Direct Access</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Initiated</th>
              <th>Visits Completed</th>
              <th>Referral</th>
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

          <div className="add-inventory-item-form">
          <h3>{isEditingReminder ? 'Edit Direct Access Status' : 'Add Direct Access Status'}</h3>

          <input
            type="name"
            name="patient"
            placeholder="Patient's Name"
            value=""
            onChange={""}
          />


          <input
          type="date"
          name="initiated"
          placeholder="Date Signed"
          value=""
          onChange={""}
          />

          <input
           type="number"
           name="count"
           placeholder="Number of Visits"
           value=""
           onChange={""}
          />

          <select name="status" value="" onChange={""}>
            <option value="">Patient Rx</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="pending">pending</option>
          </select>

          <button onClick={""}>
            {isEditingReminder ? 'Update Direct Access Status' : 'Add Direct Access Status'}
          </button>
        </div>
          </div>

          <div className="task-table">
        <h2 className="main-title">Referral Manager</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Referred</th>
              <th>Date</th>
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


          <div className="add-inventory-item-form">
          <h3>{isEditingReminder ? 'Edit Referral Status' : 'Add Referral Status'}</h3>

          <input
            type="name"
            name="patient"
            placeholder="Patient's Name"
            value=""
            onChange={""}
          />

          <select name="type" value="" onChange={""}>
            <option value="">Patient Referred</option>
            <option value="in">In</option>
            <option value="out">Out</option>
          </select>

          <input
          type="date"
          name="referred date"
          placeholder="Date of referral"
          value=""
          onChange={""}
          />

          <input
            type="name"
            name="MD name"
            placeholder="Mutual Doctor"
            value=""
            onChange={""}
          />
          
          <button onClick={""}>
            {isEditingReminder ? 'Update Referral Status' : 'Add Referral Status'}
          </button>
        </div>
          </div>

    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TasksMain)