import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import logo from "../../../../../images/prohealth-logo.png"

export const StaffProfile = ({ staffUser}) => {

    const [selectedStaff, setSelectedStaff] = useState('');
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        if (staffUser) {
          setSelectedStaff(staffUser);
          let full_name = staffUser.first_name + ' ' + staffUser.last_name;
          setFullName(full_name);
        console.log(selectedStaff);
        }
    }, [staffUser, selectedStaff]);


 
  return (
<div className="main-container">
       <h2 className="my-profile-heading">Staff profile</h2>
        <div className="account-card">
            <img className="card-img" src={logo} alt="profile"/>
            <div className="card-info">
              <label>User</label>
            <h2 className="card-name">{fullName}</h2>
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
      </div>
   <br />
       <div className="personal-info">

        <div className="credentials"> 
       <label>Full Name</label>
       <p>{fullName}</p>
       <label>Email</label>
       <p>{staffUser.email}</p>
       <label>Ext</label>
       <p>{staffUser.phone_ext}</p>
     </div>

       <div className="clinic-assc">
       <label>Role</label>
       <p>{staffUser.role}</p>
       <label>Current Clinic</label>
       <p>{staffUser.clinic_location}</p>
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