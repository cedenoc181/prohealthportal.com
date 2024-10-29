import React from 'react'
import { connect } from 'react-redux'
import InventoryMain from './Main/InventoryMain.jsx';
import "./Features.css"

export const Inventory = (props) => {
  return (
    <div id="inventory" className="console">Inventory
    
    <div>
        <InventoryMain />
    </div>
    
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)