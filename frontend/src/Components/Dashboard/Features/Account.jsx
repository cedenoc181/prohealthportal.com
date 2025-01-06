 import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { setSelectedUser } from '../../../ReduxActionsMain/userActions'
import { fetchUsers } from '../../../ReduxActionsMain/userActions'
import "./Features.css"


export const Account = ({user, allUsers, setSelectedUser, fetchUsers}) => {

const token = localStorage.getItem('jwt');

useEffect(() => {
if (!allUsers) {
fetchUsers(token);
}
}, [fetchUsers, allUsers]);


const handleSelectedUser = (profile) => {
  setSelectedUser(profile);
}

console.log("all users with account", allUsers);


  console.log("only current user", user);

  return (
    <div id="account-console" className="console">

    <h2 className="account-title">Account Settings</h2>
    <h4 className="staffCardHeader">Clinical Staff</h4>
    <div className="staffCardContainer">
         { allUsers?.map((staffUser, index) => (
          <div className="staffCard" onClick={() => handleSelectedUser(staffUser)} key={index}>
            <label>Name:</label>
            <p>{staffUser.full_name}</p>
            <label>Clinic:</label>
            <p>{staffUser.clinic_location}</p>
          </div>
          ))}
    </div>
    
    <div className="clinical-operations">
    <label>Hours of operation</label>
        <div>Mon thru Fri: 9:00am-6:00pm</div>
      <label>All clinics</label>
        <div className="web-links-container">
          <div><a className="web-links" href="https://www.google.com/search?q=prohealth+and+fitness+1041+3rd+avenue&sca_esv=ec3d7e0719ee82fc&sxsrf=ADLYWIJRkWwWjqwVp_K_4o6EafEnXtDvaA%3A1734646880717&ei=YJxkZ8LGK43LkPIP5YKTkAQ&oq=prohealth+and+fitness&gs_lp=Egxnd3Mtd2l6LXNlcnAiFXByb2hlYWx0aCBhbmQgZml0bmVzcyoCCAUyChAjGIAEGCcYigUyBBAjGCcyBBAjGCcyERAuGIAEGJECGMcBGIoFGK8BMgsQLhiABBjHARivATIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB5I-x9QrQVYrQVwAngBkAEAmAFSoAFSqgEBMbgBAcgBAPgBAZgCA6ACYsICChAAGLADGNYEGEeYAwCIBgGQBgaSBwEzoAfYDw&sclient=gws-wiz-serp" >1041 3rd Avenue #204 NY, NY 10065</a></div>
          <div><a className="web-links" href="https://www.google.com/search?q=prohealth+and+fitness+nyc&sca_esv=ec3d7e0719ee82fc&sxsrf=ADLYWIL4435g6giQIaS3SpeeYxKOb8N4Mg%3A1734646417044&ei=kZpkZ4WqAt2lkPIPi93EsQw&ved=0ahUKEwjFtv677bSKAxXdEkQIHYsuMcYQ4dUDCBA&uact=5&oq=prohealth+and+fitness+nyc&gs_lp=Egxnd3Mtd2l6LXNlcnAiGXByb2hlYWx0aCBhbmQgZml0bmVzcyBueWMyBRAhGKABMgUQIRigATIFECEYoAEyBRAhGKABMgUQIRigATIFECEYnwVI1RBQlwdYqw9wAXgBkAEAmAFYoAG9AqoBATS4AQPIAQD4AQGYAgWgAtwCwgIHECMYsAMYJ8ICDRAuGLADGMcBGCcYrwHCAgoQABiwAxjWBBhHwgIEECMYJ8ICChAuGMcBGCcYrwHCAgsQLhiABBjHARivAcICBhAAGBYYHsICCxAAGIAEGIYDGIoFwgIIEAAYgAQYogTCAgUQABjvBZgDAIgGAZAGCpIHATWgB8cj&sclient=gws-wiz-serp" >180 West End Ave #1M NY, NY 10023</a></div>
          <div><a className="web-links" href="https://www.google.com/search?q=prohealth+and+fitness+150+west+end+&sca_esv=ec3d7e0719ee82fc&sxsrf=ADLYWILv-m5C9FEyVkHq98orF4BC4tSbVg%3A1734646584468&ei=OJtkZ8itHPa_kPIPhMKt-Aw&ved=0ahUKEwjIqemL7rSKAxX2H0QIHQRhC88Q4dUDCBA&uact=5&oq=prohealth+and+fitness+150+west+end+&gs_lp=Egxnd3Mtd2l6LXNlcnAiI3Byb2hlYWx0aCBhbmQgZml0bmVzcyAxNTAgd2VzdCBlbmQgMgUQIRigATIFECEYoAEyBRAhGKABMgUQIRigATIFECEYoAEyBRAhGKsCMgUQIRirAjIFECEYnwVI2CNQ9g9Y3SJwAngAkAEAmAFYoAH0B6oBAjE0uAEDyAEA-AEBmAIPoAL8B8ICChAAGLADGNYEGEfCAgoQLhjHARgnGK8BwgIGEAAYFhgewgILEAAYgAQYhgMYigXCAgUQABjvBcICCBAAGIAEGKIEwgIIEAAYogQYiQWYAwCIBgGQBgeSBwIxNaAHwlI&sclient=gws-wiz-serp&lqi=CiJwcm9oZWFsdGggYW5kIGZpdG5lc3MgMTUwIHdlc3QgZW5kSKv9uOOer4CACFo6EAAQARACEAMQBBAFGAAYAhgDGAQYBSIicHJvaGVhbHRoIGFuZCBmaXRuZXNzIDE1MCB3ZXN0IGVuZJIBBmRvY3RvcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOaU9GOVhVSEpCUlJBQqoBcxABKiYiInByb2hlYWx0aCBhbmQgZml0bmVzcyAxNTAgd2VzdCBlbmQoADIfEAEiG7bugOVIyGqB2ja0NsTaG8lj5wJoNPwXD1bY3jImEAIiInByb2hlYWx0aCBhbmQgZml0bmVzcyAxNTAgd2VzdCBlbmTgAQD6AQQIABAX#rlimm=10043709286748279538" >150 West End Ave #1M NY, NY 10023</a></div>
        </div>
        <label>ProHealth Websites</label>
        <div><a className="web-links" href="https://prohealthptot.com/">ProHealth & Fitness</a></div>
        <div><a className="web-links" href="https://www.prohealthptot.info/">ProHealth & Fitness Feedback</a></div>
        <div><a className="web-links" href="https://www.prohealthptot.info/">ProHealth & Fitness Portal</a></div>
    </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  allUsers: state.user.allUserData,
})

const mapDispatchToProps = {
  fetchUsers,
  setSelectedUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)