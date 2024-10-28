import React from 'react'
import { connect } from 'react-redux'

export const Inventory = (props) => {
  return (
    <div id="inventory">Inventory</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)