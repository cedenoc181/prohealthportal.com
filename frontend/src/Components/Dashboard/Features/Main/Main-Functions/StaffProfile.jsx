import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import logo from "../../../../../images/prohealth-logo.png"

export const StaffProfile = ({ staffUser}) => {

    const [isEditable, setIsEditable] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState('');


    useEffect(() => {
        setSelectedStaff(staffUser);
        console.log(selectedStaff);
    }, [staffUser, selectedStaff]);

    const handleEdit = () => {
        setIsEditable((prev) => !prev); // Toggle editable state
      };

 
  return (
<div className="main-container">
       <h2 className="my-profile-heading">Staff profile</h2>
        <div className="account-card">
            <img className="card-img" src={logo} alt="profile"/>
            <div className="card-info">
              <label>User</label>
            <h2 className="card-name">{staffUser.full_name}</h2>
            <label>Role</label>
            <div className="card-role">{staffUser.role}</div>
            <label>Clinic Location</label>
            <div className="card-location">{staffUser.clinic_location}</div>
            </div>
        </div>
        <br />
    <div className="account-info">
      <div className="info-header">
       <h2 className="info-header-title">Personal Information</h2>
      {/* <button className="info-button" onClick={handleEdit}>{isEditable ? "save" : "edit"}</button> */}
      <button type="button" class="btn btn-light" onClick={handleEdit}>{isEditable ? "save" : "edit"}</button>
      </div>
   <br />
       <div className="personal-info">

        <div className="credentials"> 
       <label>Full Name</label>
       <p className={isEditable ? "edit-value" : "user-value"} contentEditable={isEditable}>{staffUser.full_name}</p>
       <label>Email</label>
       <p className={isEditable ? "edit-value" : "user-value"} contentEditable={isEditable}>{staffUser.email}</p>
     </div>

       <div className="clinic-assc">
       <label>Role</label>
       <p className={isEditable ? "edit-value" : "user-value"} contentEditable={isEditable}>{staffUser.role}</p>
       <label>Current Clinic</label>
       <p className={isEditable ? "edit-value" : "user-value"} contentEditable={isEditable}>{staffUser.clinic_location}</p>
       </div>

       </div>
    </div>
    <br />
</div> 
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(StaffProfile)