
import React, {useState, useEffect} from 'react'
import "./AccMain.css"
import { connect } from 'react-redux'
import './Main.css'
import MyProfile from './Main-Functions/MyProfile.jsx'
import StaffProfile from './Main-Functions/StaffProfile.jsx'
import { ChevronLeftIcon } from '@chakra-ui/icons'

export const AccountMain = ({ user, selectedUser }) => {

  const [staffInfo, setStaffInfo] = useState(false);
  

  useEffect(() => {
      if (selectedUser) {
        setStaffInfo(true);
      }
  }, [selectedUser]);
  

  const handleUIClick = () => {
    setStaffInfo(false);
    console.log("set staff info:", staffInfo);
    // staffUser = false;
    console.log(selectedUser);
  };


if (!selectedUser) {
  // setStaffInfo(false);
  return  (   
    <div className="acc-ui">
        <MyProfile user={user}/>
    </div>
    );
} 

return (
  <div>

     { staffInfo ? 
      
      (    
      <div >
        <div className="createUI-button">
          <button onClick={handleUIClick}>
          <ChevronLeftIcon />
          My profile
          </button>
        </div>
        <StaffProfile staffUser={selectedUser}/>
      </div>
      )
      :
      
      (
      <div>
    <div>
        <MyProfile user={user}/>
    </div>
    </div>
    )
    } 
</div>
)

}

const mapStateToProps = (state) => ({
  selectedUser: state.user.selectedUser,
});

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMain)


// { currentUser ? 

//   ( 
//  <div>
//    <h2 className="my-profile-heading">My profile</h2>
//     <div className="account-card">
//         <img className="card-img" src={logo} alt="profile"/>
//         <div className="card-info">
//           <label>User</label>
//         <h2 className="card-name">{currentUser.full_name}</h2>
//         <label>Role</label>
//         <div className="card-role">{currentUser.role}</div>
//         <label>Clinic Location</label>
//         <div className="card-location">{currentUser.clinic_location}</div>
//         </div>
//     </div>
//     <br />
// <div className="account-info">
//   <div className="info-header">
//    <h2 className="info-header-title">Personal Information</h2>
//   {/* <button className="info-button" onClick={handleEdit}>{isEditable ? "save" : "edit"}</button> */}
//   <button type="button" class="btn btn-light" onClick={handleEdit}>{isEditable ? "save" : "edit"}</button>
//   </div>
// <br />
//    <div className="personal-info">

//     <div className="credentials"> 
//    <label>Full Name</label>
//    <p className={isEditable ? "edit-value" : "user-value"} contentEditable={isEditable}>{currentUser.full_name}</p>
//    <label>Email</label>
//    <p className={isEditable ? "edit-value" : "user-value"} contentEditable={isEditable}>{currentUser.email}</p>
//    <label>Tenure</label>
//    <p className={isEditable ? "edit-value" : "user-value"} contentEditable={isEditable}>2 years, 3 Months</p>
//    </div>

//    <div className="clinic-assc">
//    <label>Extension</label>
//    <p className={isEditable ? "edit-value" : "user-value"} contentEditable={isEditable}>251</p>
//    <label>Role</label>
//    <p className={isEditable ? "edit-value" : "user-value"} contentEditable={isEditable}>{currentUser.role}</p>
//    <label>Current Clinic</label>
//    <p className={isEditable ? "edit-value" : "user-value"} contentEditable={isEditable}>{currentUser.clinic_location}</p>
//    </div>

//    </div>
// </div>
// <br />
// </div> 
//     ) 
//     : 
//     (
//     <div>
//      <h2 className="my-profile-heading">My profile</h2>
//       <div className="account-card">
//           <img className="card-img" src={logo} alt="profile"/>
//           <div className="card-info">
//             <label>User</label>
//           <h2 className="card-name">loading... </h2>
//           <label>Role</label>
//           <div className="card-role">loading...</div>
//           <label>Clinic Location</label>
//           <div className="card-location">loading...</div>
//           </div>
//       </div>
// <br />
// <div className="account-info">
//   <div className="info-header">
//    <h2 className="info-header-title">Personal Information</h2>
//   <button className="info-button">Edit</button>
//   </div>
// <br />
//    <div className="personal-info">

//     <div className="credentials"> 
//    <label>Full Name</label>
//    <p>loading...</p>
//    <label>Email</label>
//    <p>loading...</p>
//    <label>Tenure</label>
//    <p>loading...</p>
//    </div>

//    <div className="clinic-assc">
//    <label>Extension</label>
//    <p>loading...</p>
//    <label>Role</label>
//    <p>loading...</p>
//    <label>Current Clinic</label>
//    <p>loading...</p>
//    </div>
//    </div>
// </div>
// <br />
// <div className="account-settings">
//   <div className="info-header">
//     <h2 className="settings-title">My Settings</h2>
//     <button className="info-button">Edit</button>
//   </div>
//   <br />
//   <div className="settings">
//   <div className="settings-alerts">
//       <label>Theme</label>
//       <p>Light</p>
//       <label>Inventory Alerts</label>
//       <p>On</p>
//       <label>Task Alerts</label>
//       <p>On</p>
//   </div>
// </div> 
// </div> 
// </div> 
//     )
// }

