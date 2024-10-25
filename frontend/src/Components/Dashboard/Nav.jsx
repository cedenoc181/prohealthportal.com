
import React from 'react'
import { connect } from 'react-redux'
import Account from './Features/Account.jsx';
import Email_Template from './Features/Email.jsx';
import Inventory from './Features/Inventory.jsx';
import Medical from './Features/Medical.jsx';
import Overview from './Features/Overview.jsx';
import Task from './Features/Task.jsx';



export const Nav = (props) => {
  return (
    <div>

    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)