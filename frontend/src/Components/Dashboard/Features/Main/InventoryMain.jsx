import React from 'react'
import { connect } from 'react-redux'

export const InventoryMain = (props) => {
  return (

        <div  className="main-title">
         inventory 

        </div>
   
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryMain)