import React from 'react'
import { connect } from 'react-redux'
import "./Features.css"


export const Medical = (props) => {
  return (
    <div id="medical-forms" className="console">Medical</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Medical)