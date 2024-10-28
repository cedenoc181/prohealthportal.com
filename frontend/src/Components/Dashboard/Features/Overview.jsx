import React from 'react'
import { connect } from 'react-redux'

export const Overview = (props) => {
  return (
    <div id="overview">Overview</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)