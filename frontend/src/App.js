import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Components/Login/Login.jsx";
import Nav from "./Components/Dashboard/Nav.jsx";
import { jwtDecode } from "jwt-decode";
import { fetchMyAccount } from "./ReduxActionsMain/userActions.js"

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

function App({ user, loading, error, fetchMyAccount }) {

  const token = localStorage.getItem("jwt");

  const location = useLocation();

  const [mainContent, setMainContent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("jwt"));
  const [userName, setUserName] = useState("");

 // Fetch user account when authenticated
useEffect(() => {

  let logoutTimeout;

  if (isAuthenticated && token && !user) {
    console.log(isAuthenticated);
    fetchMyAccount(token);

    // Decode the token to get the expiration time
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
console.log({decodedToken, expirationTime, currentTime, timeUntilExpiration});
    if (timeUntilExpiration > 0) {
      // Set a timeout to log the user out when the token expires
      logoutTimeout = setTimeout(() => {
        localStorage.removeItem("jwt");
        setIsAuthenticated(false); // Ensure the app knows the user is logged out
  
        console.log("Token expired. User logged out.");
      }, timeUntilExpiration);
    } else {
      // If the token is already expired, log the user out immediately
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
    
    }
  }
  // Cleanup the timeout on component unmount or re-render
  return () => {
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }
  };
}, [isAuthenticated, user]);


  console.log(isAuthenticated);
  console.log(user);


  useEffect(() => {
    function capitalizeWords(str) {
      if (str) {
        return str
          .split(" ") // Split the string into an array of words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
          .join(" "); // Join the array back into a single string
      }
      return ""; // Return an empty string if no input
    }
  
    if (user) {
      const name = capitalizeWords(user.full_name);
      setUserName(name);
    } else {
      setUserName("loading user...");
    }
  }, [user]);
  


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
        setMainContent(<AccountMain user={user}/>);
        break;
      default:
        setMainContent(null);
    }
  }, [location, user]);


  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options); // e.g., "November 5, 2024"


  console.log(userName);

  // Conditionally render login or the main app
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  };

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
          <Route path="/account-settings" element={<Account user={user}/>} />
        </Routes>
      </div>

      <div id="main" className="main">
        <div className="header">
          <div className="date-time">{formattedDate}</div>
          <div className="user-info">{userName}</div> 
        </div>
        {mainContent}
      </div>
    </div>
  );
}

// Map Redux state to props
const mapStateToProps = (state) => ({
  user: state.user.data, // Ensure `user` points to the correct data
  loading: state.user?.loading, // Track loading state for user fetch
  error: state.user?.error, // Track error state for user fetch
});

// Map Redux actions to props
const mapDispatchToProps = {
  fetchMyAccount,
};

// Connect Redux to App
export default connect(mapStateToProps, mapDispatchToProps)(App);
