import {React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from "../../../ReduxActionsMain/userActions.js";
import "./Features.css"


export const Overview = ({ user, fetchUsers }) => {

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  console.log("Overview:", fetchUsers)

  const entities = [
    {
      Entity: 'FDNY',
      Address: '320 E 204th St, Bronx, New York 10467',
      Phone: '123-384-2008'
    },
    {
      Entity: 'NYPD',
      Address: '675 White Plains Rd, Bronx, New York 10473',
      Phone: '347-874-3620'
    },
    {
      Entity: 'DSNY',
      Address: '450 Willis Ave, Bronx, New York 10455',
      Phone: '718-912-4821'
    },
    {
      Entity: 'HHC',
      Address: '920 Morrison Ave, Bronx, New York 10473',
      Phone: '646-384-6258'
    },
    {
      Entity: 'DOC',
      Address: '2250 Webster Ave, Bronx, New York 10457',
      Phone: '929-213-7458'
    }
  ];
  

  const [dailyOps, setDailyOps] = useState(['Appointment reminders', "Patient retention outreach", "Direct Access management", "referral management"]);

  let count = Math.floor(Math.random() * 10) + 1;


  return (
    <div id="overview-console" className="console">
        <h2 className="console-title">Overview</h2>
    
  
     <h2 className="low-inv-title">Insufficient Inventory</h2>
<div className="inventory-con">
  <table className="low-inv-table">
    <thead>
      <tr>
        <th>Item</th>
        <th>Count</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <span className="icon-warning"></span> Staples
        </td>
        <td>{count}</td>
        <td>Insufficient</td>
      </tr>
      <tr>
        <td>
          <span className="icon-warning"></span> Bio freeze
        </td>
        <td>{count}</td>
        <td>Low</td>
      </tr>
      <tr>
        <td>
          <span className="icon-warning"></span> Printing Paper
        </td>
        <td>{count}</td>
        <td>Insufficient</td>
      </tr>
      <tr>
        <td>
          <span className="icon-warning"></span> Paper Towels
        </td>
        <td>{count}</td>
        <td>Low</td>
      </tr>
    </tbody>
  </table>
</div>
<br />

<div className="apos-lead-preview">
        <h2 className="apos-title">APOS Leads</h2>
        <div className="inventory-con">
  <table className="low-inv-table">
    <thead>
      <tr>
        <th>Entity</th>
        <th>address</th>
        <th>phone</th>
      </tr>
    </thead>
    <tbody>
      {entities.map((ent, index) => (
      <tr key={index}>
      <td>{ent.Entity}</td>
      <td>{ent.Address}</td>
      <td>{ent.Phone}</td>
    </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>

    <br />


    <div className="task-previews">
    <table>
        <thead>
          <tr>
            <th >Daily Task</th>
          </tr>
        </thead>
        <tbody>

          {dailyOps.map((task, index)=> (
          <tr key={index}>
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
    
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.data,
})

const mapDispatchToProps = {
  fetchUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)