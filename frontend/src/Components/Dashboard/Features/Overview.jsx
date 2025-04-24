import {React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from "../../../ReduxActionsMain/userActions.js";
import { fetchMedifiles } from '../../../ReduxActionsMain/medifilesActions.js';
import { fetchInsufficientItems } from "../../../ReduxActionsMain/inventoryItemsActions";

import "./Features.css"


export const Overview = ({ fetchUsers, fetchMedifiles, fetchInsufficientItems, inventoryItems, user }) => {

  const clinicMapping = {
    east: "1",
    west: "2",
    "upper west": "3",
  };

    const [selectedClinicKey, setSelectedClinicKey] = useState(clinicMapping[user?.clinic_location]);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    fetchUsers(); // Retrieve the token
    if (user) {
      fetchMedifiles(token);
      fetchInsufficientItems(token);
       // Pass the token to the fetchMedifiles function
    }
  }, [fetchUsers, user, fetchInsufficientItems, fetchMedifiles, token]);

  console.log("Overview:", fetchUsers);

  console.log("overview:", fetchMedifiles);

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




  return (
    <div id="overview-console" className="console">
        <h2 className="console-title">Overview</h2>
        {/* inventory items */}
        {selectedClinicKey && inventoryItems[selectedClinicKey]?.length > 0 ? (
          <div>
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
                  {inventoryItems[selectedClinicKey].slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td>{item.item_name}</td>
                      <td>{item.count}</td>
                      <td>
                        {item.item_requested === true && "Request sent"}
                        {item.item_requested === false && "Request Item"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="altMessage">Sufficient invenotry.</p>
        )}
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
  inventoryItems: state.inventoryItem.insufficient,
})

const mapDispatchToProps = {
  fetchUsers,
  fetchMedifiles,
  fetchInsufficientItems,
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)