import React from 'react'
import { connect } from 'react-redux'

export const InventoryMain = (props) => {
  return (
    <div>InventoryMain
        <div>
            hello 
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryMain)