import React from 'react';
import { connect } from 'react-redux'
import './OverviewMain.css'
import './Main.css'
import MedicalMain from './MedicalMain.jsx'
import EmailMain from './EmailMain.jsx'


export const OverviewMain = (props) => {
  // console.log(user)
  return (
    <div className="main-container">
      <h1 className="welcome">Hello Christian!</h1>
      <br />
      <h2 className="overview-sub-titles">Continue working on email </h2>
      <EmailMain />
      <br />
        <h2 className="overview-sub-titles">Continue working on medical file </h2>
        <div className="medical-comp">
        <MedicalMain />
        </div>
        <br />
    </div>
  )
}

const mapStateToProps = (state) => ({
  // user: state.user.data,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewMain)