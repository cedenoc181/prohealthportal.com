import React from 'react'
import { connect } from 'react-redux'
import "./Features.css"


export const Task = (props) => {
  return (
    <div id="task-list" className="console">Task</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Task)