import React from 'react'
import { connect } from 'react-redux'

export const Medical = (props) => {
  return (
    <div id="medical-forms">Medical</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Medical)