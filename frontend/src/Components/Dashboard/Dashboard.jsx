import React from 'react'
import { connect } from 'react-redux'
import Nav from './Nav.jsx';
// import Console from './Console.jsx';
// import MainView from './Main.jsx';

export const Dashboard = (props) => {
  return (
    <div>
        <Nav />
        {/* <Console />
        <MainView /> */}
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)