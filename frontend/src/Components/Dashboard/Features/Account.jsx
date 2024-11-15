import React from 'react'
import { connect } from 'react-redux'
import "./Features.css"


export const Account = (props) => {
  return (
    <div id="account-console" className="console">

    <h2 className="account-title">Account Settings</h2>

      <ul>
        <li>My profile</li>
      </ul>

    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Account)