import React from 'react'
import { connect } from 'react-redux'
import './Main.css'

export const AccountMain = (props) => {
  




  return (
    <div className="main-container">
      
      <h2 className="my-profile-heading">My profile</h2>

      <div className="account-card">
          <img className="card-img" alt="profile"/>
          <div className="card-info">
          <h2 className="card-name">Christian Cedeno</h2>
          <div className="card-role">Admin</div>
          <div className="card-location">Eastside Clinic</div>
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
       <p>Christian Cedeno</p>
       <label>Email</label>
       <p>ChristianCedeno@proHealthptot.com</p>
       <label>Tenure</label>
       <p>2 years, 3 Months</p>
       </div>

       <div className="clinic-assc">
       <label>Extension</label>
       <p>251</p>
       <label>Role</label>
       <p>Admin</p>
       <label>Current Clinic</label>
       <p>Eastside</p>
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

      <div className="settings-">
          <label></label>
          <p></p>
          <label></label>
          <p></p>
          <label></label>
          <p></p>
      </div>

      </div>
    </div>



    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMain)