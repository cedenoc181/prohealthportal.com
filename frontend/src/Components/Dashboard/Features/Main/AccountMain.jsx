import React from 'react'
import { connect } from 'react-redux'
import './Main.css'

export const AccountMain = (props) => {
  return (
    <div className="main-container">
      
      <h2 className="my-profile-heading">My profile</h2>

      <div className="account-card">
          <h2 className="card-name"></h2>
          <div className="card-role"></div>
          <div className="card-location"></div>
      </div>
      <label></label>
   
      <label></label>

      <label></label>

      <label></label>

    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMain)