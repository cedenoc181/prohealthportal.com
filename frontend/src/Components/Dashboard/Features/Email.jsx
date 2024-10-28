import React from 'react'
import { connect } from 'react-redux'

export const Email = (props) => {
  return (
    <div id="e-templates">Email</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Email)