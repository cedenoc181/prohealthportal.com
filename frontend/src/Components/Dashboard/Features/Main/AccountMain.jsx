import React, {useEffect, useState} from 'react'
import logo from "../../../../images/prohealth-logo.png"
import "./AccMain.css"
import { connect } from 'react-redux'
import './Main.css'

export const AccountMain = ({ user }) => {
  

  console.log(user)
const [currentUser, setCurrentUser] = useState('');
const [editActive, setEditActive] = useState(true);


useEffect(() => {
  setCurrentUser(user);
}, [user]);

console.log(currentUser);



const handleEdit = () => {
  const editableElements = document.getElementsByClassName('user-value');
  
  Array.from(editableElements).forEach(element => {
    const isEditable = element.getAttribute('contenteditable') === 'true';
    element.setAttribute('contenteditable', !isEditable); // Toggle between true and false
    setEditActive(!editActive);
    console.log(editActive);
  });
};





if (!user) {
  return <div>Loading user data...</div>;
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
      <button className="info-button" onClick={handleEdit}>Edit</button>
      </div>
   <br />
       <div className="personal-info">

        <div className="credentials"> 
       <label>Full Name</label>
       <p className="user-value" contenteditable="false">{currentUser.full_name}</p>
       <label>Email</label>
       <p className="user-value" contenteditable="false">{currentUser.email}</p>
       <label>Tenure</label>
       <p className="user-value" contenteditable="false">2 years, 3 Months</p>
       </div>

       <div className="clinic-assc">
       <label>Extension</label>
       <p className="user-value" contenteditable="false">251</p>
       <label>Role</label>
       <p className="user-value" contenteditable="false">{currentUser.role}</p>
       <label>Current Clinic</label>
       <p className="user-value" contenteditable="false">{currentUser.clinic_location}</p>
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
       <label>Current Clinic</label>
       <p>loading...</p>
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMain)