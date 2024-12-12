import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './OverviewMain.css';
import './Main.css';
import MedicalMain from './MedicalMain.jsx';
import EmailMain from './EmailMain.jsx';

export const OverviewMain = () => {
  // const [userName, setUserName] = useState(null); // Set initial state to null

  // const greet = "Hi";

  // function capitalizeWords(str) {
  //   if (!str) return ""; // Handle undefined or null input
  //   return str
  //     .split(' ')
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(' ');
  // }

  // useEffect(() => {
  //   if (user && user.full_name) {
  //     const name = capitalizeWords(user.full_name); // Capitalize the full name
  //     setUserName(name.split(' ')[0]); // Extract the first name
  //   }
  // }, [user]);

  // if (!userName) {
  //   // Show a loading state until the userName is available
  //   return <div className="loading-message">Loading user information...</div>;
  // }

  return (
    <div className="main-container">
      {/* <h1 className="welcome">{greet} {userName}!</h1> */}
      <br />
      <h2 className="overview-sub-titles">Continue working on email</h2>
      <EmailMain />
      <br />
      <h2 className="overview-sub-titles">Continue working on medical file</h2>
      <div className="medical-comp">
        <MedicalMain />
      </div>
      <br />
    </div>
  );
};

const mapStateToProps = (state) => ({
  // user: state.user.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewMain);
