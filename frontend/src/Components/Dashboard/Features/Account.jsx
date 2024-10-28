import React from 'react'
import { connect } from 'react-redux'

export const Account = (props) => {
  return (
    <div id="account-settings">Account</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Account)