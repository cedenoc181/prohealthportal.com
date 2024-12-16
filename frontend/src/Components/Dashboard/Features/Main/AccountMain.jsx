import React, {useEffect, useState} from 'react'
import logo from "../../../../images/prohealth-logo.png"
import "./AccMain.css"
import { connect } from 'react-redux'
import './Main.css'

export const AccountMain = ({user}) => {
  
const [currentUser, setCurrentUser] = useState(false);


useEffect(() => {
  setCurrentUser(user);
}, [user]);

console.log(currentUser);

if (currentUser) {
console.log(true);
} else {
  console.log(false);
}

  return (

    <div className="main-container">
      
      { currentUser ? 

      ( 
     <div>
       <h2 className="my-profile-heading">My profile</h2>
        <div className="account-card">
            <img className="card-img" src={logo} alt="profile"/>
            <div className="card-info">
              <label>User</label>
            <h2 className="card-name">{currentUser.full_name}</h2>
            <label>Role</label>
            <div className="card-role">{currentUser.role}</div>
            <label>Clinic Location</label>
            <div className="card-location">{currentUser.clinic_location}</div>
            </div>
        </div>
        <br />
    <div className="account-info">
      <div className="info-header">
       <h2 className="info-header-title">Personal Information</h2>
      <button className="info-button">Edit</button>
      </div>
   <br />
       <div className="personal-info">

        <div className="credentials"> 
       <label>Full Name</label>
       <p>{currentUser.full_name}</p>
       <label>Email</label>
       <p>{currentUser.email}</p>
       <label>Tenure</label>
       <p>2 years, 3 Months</p>
       </div>

       <div className="clinic-assc">
       <label>Extension</label>
       <p>251</p>
       <label>Role</label>
       <p>{currentUser.role}</p>
       <label>Current Clinic</label>
       <p>{currentUser.clinic_location}</p>
       </div>

       </div>
    </div>
    <br />
    <div className="account-settings">
      <div className="info-header">
        <h2 className="settings-title">My Settings</h2>
        <button className="info-button">Edit</button>
      </div>
      <br />
      <div className="settings">
      <div className="settings-alerts">
          <label>Theme</label>
          <p>Light</p>
          <label>Inventory Alerts</label>
          <p>On</p>
          <label>Task Alerts</label>
          <p>On</p>
      </div>
    </div> 
 </div> 
</div> 
        ) 
        : 
        (
        <div>
         <h2 className="my-profile-heading">My profile</h2>
          <div className="account-card">
              <img className="card-img" src={logo} alt="profile"/>
              <div className="card-info">
                <label>User</label>
              <h2 className="card-name">loading... </h2>
              <label>Role</label>
              <div className="card-role">loading...</div>
              <label>Clinic Location</label>
              <div className="card-location">loading...</div>
              </div>
          </div>
<br />
<div className="account-info">
      <div className="info-header">
       <h2 className="info-header-title">Personal Information</h2>
      <button className="info-button">Edit</button>
      </div>
   <br />
       <div className="personal-info">

        <div className="credentials"> 
       <label>Full Name</label>
       <p>loading...</p>
       <label>Email</label>
       <p>loading...</p>
       <label>Tenure</label>
       <p>loading...</p>
       </div>

       <div className="clinic-assc">
       <label>Extension</label>
       <p>loading...</p>
       <label>Role</label>
       <p>loading...</p>
       <label>loading...</label>
       <p></p>
       </div>
       </div>
    </div>
    <br />
    <div className="account-settings">
      <div className="info-header">
        <h2 className="settings-title">My Settings</h2>
        <button className="info-button">Edit</button>
      </div>
      <br />
      <div className="settings">
      <div className="settings-alerts">
          <label>Theme</label>
          <p>Light</p>
          <label>Inventory Alerts</label>
          <p>On</p>
          <label>Task Alerts</label>
          <p>On</p>
      </div>
    </div> 
 </div> 
</div> 
        )
    }

     
      {/* <div className="settings-">
          <label></label>
          <p></p>
          <label></label>
          <p></p>
          <label></label>
          <p></p>
      </div> */}

      </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.data,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMain)