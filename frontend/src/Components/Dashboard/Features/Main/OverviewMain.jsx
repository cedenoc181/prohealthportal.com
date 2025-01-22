import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './OverviewMain.css';
import './Main.css';
import MedicalMain from './MedicalMain.jsx';
import EmailMain from './EmailMain.jsx';
import { fetchUsers } from '../../../../ReduxActionsMain/userActions'

export const OverviewMain = ({user, fetchUsers}) => {
  const [userName, setUserName] = useState(''); // Set initial state to null

  const greet = "Hi";

  const token = localStorage.getItem('jwt');


  function capitalizeWords(str) {
    if (!str) return ""; // Handle undefined or null input
    return str
      .trim() // Remove extra spaces
      .toLowerCase() // Convert the entire string to lowercase first
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  useEffect(() => {

    if (user) {
      fetchUsers(token);
      const firstName = capitalizeWords(user.first_name); 
      setUserName(firstName); // Extract the first name
    }
  }, [fetchUsers, token, user]);

  return (
    <div className="main-container">
      <h1 className="welcome">{greet} {userName}!</h1>
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
  user: state.user.data,
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewMain);
