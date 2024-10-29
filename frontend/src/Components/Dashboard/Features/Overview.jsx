import React from 'react'
import { connect } from 'react-redux'
import "./Features.css"


export const Overview = (props) => {
  return (
    <div id="overview-console" className="console">
        <h2>Overview</h2>
    <div className="display-1">
            testing 
    </div>
    
     <div className="display-2">
        testing
    </div>
    
    <div className="display-3">
        testing
    </div>
    
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)