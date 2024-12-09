import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Components/Login/Login.jsx";
import Nav from "./Components/Dashboard/Nav.jsx";
import { fetchMyAccount } from "./ReduxActionsMain/userActions.js";

// Importing features
import Overview from "./Components/Dashboard/Features/Overview.jsx";
import ETemplates from "./Components/Dashboard/Features/Email.jsx";
import Medifiles from "./Components/Dashboard/Features/Medical.jsx";
import TasksList from "./Components/Dashboard/Features/Task.jsx";
import Inventory from "./Components/Dashboard/Features/Inventory.jsx";
import Account from "./Components/Dashboard/Features/Account.jsx";

// Components for each main content area
import InventoryMain from "./Components/Dashboard/Features/Main/InventoryMain.jsx";
import OverviewMain from "./Components/Dashboard/Features/Main/OverviewMain.jsx";
import EmailMain from "./Components/Dashboard/Features/Main/EmailMain.jsx";
import MedicalMain from "./Components/Dashboard/Features/Main/MedicalMain.jsx";
import TasksMain from "./Components/Dashboard/Features/Main/TasksMain.jsx";
import AccountMain from "./Components/Dashboard/Features/Main/AccountMain.jsx";

function App({ fetchMyAccount, user }) {
  const location = useLocation();
  const [mainContent, setMainContent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt"));

  // Fetch user account when authenticated
  useEffect(() => {
    if (isAuthenticated && !user) {
      console.log(isAuthenticated, user)
      fetchMyAccount();

    }
  }, [isAuthenticated, fetchMyAccount, user]);

  console.log(isAuthenticated, user);
  // Update main content based on the route
  useEffect(() => {
    switch (location.pathname) {
      case "/inventory":
        setMainContent(<InventoryMain />);
        break;
      case "/overview":
        setMainContent(<OverviewMain />);
        break;
      case "/e-templates":
        setMainContent(<EmailMain />);
        break;
      case "/medical-forms":
        setMainContent(<MedicalMain />);
        break;
      case "/task-list":
        setMainContent(<TasksMain />);
        break;
      case "/account-settings":
        setMainContent(<AccountMain />);
        break;
      default:
        setMainContent(null);
    }
  }, [location]);

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options); // e.g., "November 5, 2024"

  // Conditionally render login or the main app
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div id="dashboard" className="App">
      <div className="nav-display">
        <Nav user={user} setIsAuthenticated={setIsAuthenticated} />
      </div>

      <div className="console-display">
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/medical-forms" element={<Medifiles />} />
          <Route path="/e-templates" element={<ETemplates />} />
          <Route path="/task-list" element={<TasksList />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/account-settings" element={<Account />} />
        </Routes>
      </div>

      <div id="main" className="main">
        <div className="header">
          <div className="date-time">{formattedDate}</div>
          <div className="user-info">{user?.name || "Username"}</div>
        </div>
        {mainContent}
      </div>
    </div>
  );
}

// Map Redux state to props
const mapStateToProps = (state) => ({
  user: state.user?.data || null, // Use optional chaining to avoid errors
});

// Map Redux actions to props
const mapDispatchToProps = {
  fetchMyAccount,
};

// Connect Redux to App
export default connect(mapStateToProps, mapDispatchToProps)(App);
