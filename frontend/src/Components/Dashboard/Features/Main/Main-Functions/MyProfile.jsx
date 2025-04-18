import React, {useEffect, useState}  from 'react'
import { connect } from 'react-redux'
import logo from "../../../../../images/prohealth-logo.png"
export const MyProfile = ({ user }) => {

    const [currentUser, setCurrentUser] = useState('');
    const [fullName, setFullName] = useState('');


        useEffect(() => {
          if (user) {
            let full_name = user.first_name + ' ' + user.last_name;
            setFullName(full_name)
            setCurrentUser(user);
          }
    
        }, [user]);

        console.log(currentUser);

        // const toggleEdit = () => {
        //     setIsEditable((prev) => !prev); // Toggle editable state
        //   };


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
            <h2 className="card-name">{fullName}</h2>
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
      {/* <button type="button" class="btn btn-light" onClick={toggleEdit}>{isEditable ? "save" : "edit"}</button> */}
      </div>
   <br />
       <div className="personal-info">

        <div className="credentials"> 
       <label>Full Name</label>
       <p>{fullName}</p>
       <label>Email</label>
       <p>{currentUser.email}</p>
       <label>Tenure</label>
       <p>2 years, 3 Months</p>
       </div>

       <div className="clinic-assc">
       <label>Extension</label>
       <p>{currentUser.phone_ext}</p>
       <label>Role</label>
       <p>{currentUser.role}</p>
       <label>Current Clinic</label>
       <p>{currentUser.clinic_location}</p>
       </div>

       </div>
    </div>
    <br />
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
</div> 
        )
    }
      </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)