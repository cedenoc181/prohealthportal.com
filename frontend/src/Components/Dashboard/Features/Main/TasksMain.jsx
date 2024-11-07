import React, {useState} from 'react'
import { connect } from 'react-redux'
import './taskMain.css'

export const TasksMain = (props) => {


const [taskList, setTaskList] = useState(null);

const [isEditingReminder, setIsEditingReminder] = useState(false);
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

          <div className="add-inventory-item-form">
          <h3>{isEditingReminder ? 'Edit Appointment Remidner' : 'Add Appointment Remidner'}</h3>
          <select name="type" value="" onChange={""}>
            <option value="">Select Type</option>
            <option value="Office Supply">pending</option>
            <option value="Medical Equipment">pending</option>
            <option value="Cleaning Supply">pending</option>
          </select>
          <input
            type="text"
            name="item"
            placeholder="Item"
            value=""
            onChange={""}
          />
          <input
          type="text"
          name="item"
          placeholder="Item"
          value=""
          onChange={""}
          />
          <select name="status" value="" onChange={""}>
            <option value="">Select Status</option>
            <option value="pending">pending</option>
            <option value="pending">pending</option>
            <option value="pending">pending</option>
          </select>
          <button onClick={""}>
            {isEditingReminder ? 'Update Patient Reminder' : 'Add Patient Reminder'}
          </button>
        </div>


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

          <div className="add-inventory-item-form">
          <h3>{isEditingReminder ? 'Edit Appointment Remidner' : 'Add Appointment Remidner'}</h3>
          <select name="type" value="" onChange={""}>
            <option value="">Select Type</option>
            <option value="Office Supply">pending</option>
            <option value="Medical Equipment">pending</option>
            <option value="Cleaning Supply">pending</option>
          </select>
          <input
            type="text"
            name="item"
            placeholder="Item"
            value=""
            onChange={""}
          />
          <input
          type="text"
          name="item"
          placeholder="Item"
          value=""
          onChange={""}
          />
          <select name="status" value="" onChange={""}>
            <option value="">Select Status</option>
            <option value="pending">pending</option>
            <option value="pending">pending</option>
            <option value="pending">pending</option>
          </select>
          <button onClick={""}>
            {isEditingReminder ? 'Update Patient Reminder' : 'Add Patient Reminder'}
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

          <div className="add-inventory-item-form">
          <h3>{isEditingReminder ? 'Edit Appointment Remidner' : 'Add Appointment Remidner'}</h3>
          <select name="type" value="" onChange={""}>
            <option value="">Select Type</option>
            <option value="Office Supply">pending</option>
            <option value="Medical Equipment">pending</option>
            <option value="Cleaning Supply">pending</option>
          </select>
          <input
            type="text"
            name="item"
            placeholder="Item"
            value=""
            onChange={""}
          />
          <input
          type="text"
          name="item"
          placeholder="Item"
          value=""
          onChange={""}
          />
          <select name="status" value="" onChange={""}>
            <option value="">Select Status</option>
            <option value="pending">pending</option>
            <option value="pending">pending</option>
            <option value="pending">pending</option>
          </select>
          <button onClick={""}>
            {isEditingReminder ? 'Update Patient Reminder' : 'Add Patient Reminder'}
          </button>
        </div>
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


          <div className="add-inventory-item-form">
          <h3>{isEditingReminder ? 'Edit Appointment Remidner' : 'Add Appointment Remidner'}</h3>
          <select name="type" value="" onChange={""}>
            <option value="">Select Type</option>
            <option value="Office Supply">pending</option>
            <option value="Medical Equipment">pending</option>
            <option value="Cleaning Supply">pending</option>
          </select>
          <input
            type="text"
            name="item"
            placeholder="Item"
            value=""
            onChange={""}
          />
          <input
          type="text"
          name="item"
          placeholder="Item"
          value=""
          onChange={""}
          />
          <select name="status" value="" onChange={""}>
            <option value="">Select Status</option>
            <option value="pending">pending</option>
            <option value="pending">pending</option>
            <option value="pending">pending</option>
          </select>
          <button onClick={""}>
            {isEditingReminder ? 'Update Patient Reminder' : 'Add Patient Reminder'}
          </button>
        </div>
          </div>

    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TasksMain)