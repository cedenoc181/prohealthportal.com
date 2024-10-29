import React from 'react'
import { connect } from 'react-redux'
import "./Features.css"


export const Account = (props) => {
  return (
    <div id="account-settings" className="console">Account</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Account)