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
      </ul>

    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.data,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Account)