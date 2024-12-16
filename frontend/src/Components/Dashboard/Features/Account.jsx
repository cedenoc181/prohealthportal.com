import React from 'react'
import { connect } from 'react-redux'
import "./Features.css"


export const Account = ({user}) => {
  console.log(user)
  return (
    <div id="account-console" className="console">

    <h2 className="account-title">Account Settings</h2>

      <ul>
        <li>My profile</li>
        <li>Organization</li>
        <li>Calendar</li>
      </ul>


    <div className="clinical-operations">
    <label>Hours of operation</label>
        <div></div>
      <label>All clinics</label>
        <div></div>
        <div></div>
        <div></div>
        <label>ProHealth websites</label>
        <div><a href="https://prohealthptot.com/">ProHealth & Fitness</a></div>
        <div><a href="https://www.prohealthptot.info/">ProHealth & Fitness Feedback</a></div>
        <div><a href="https://www.prohealthptot.info/">ProHealth & Fitness Portal</a></div>
    </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.data,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Account)