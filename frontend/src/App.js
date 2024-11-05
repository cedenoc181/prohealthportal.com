import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Store.js';
import Login from './Components/Login/Login.jsx';
import Nav from './Components/Dashboard/Nav.jsx';

// importing features 
import Overview from "./Components/Dashboard/Features/Overview.jsx";
import ETemplates from "./Components/Dashboard/Features/Email.jsx";
import Medifiles from "./Components/Dashboard/Features/Medical.jsx";
import TasksList from "./Components/Dashboard/Features/Task.jsx";
import Inventory from "./Components/Dashboard/Features/Inventory.jsx";
import Account from "./Components/Dashboard/Features/Account.jsx";

// Components for each main content area
import InventoryMain from './Components/Dashboard/Features/Main/InventoryMain.jsx';
import OverviewMain from './Components/Dashboard/Features/Main/OverviewMain.jsx';
import EmailMain from './Components/Dashboard/Features/Main/EmailMain.jsx';
import MedicalMain from './Components/Dashboard/Features/Main/MedicalMain.jsx';
import TasksMain from './Components/Dashboard/Features/Main/TasksMain.jsx';
import AccountMain from './Components/Dashboard/Features/Main/AccountMain.jsx';

function App() {
  const location = useLocation();
  const [mainContent, setMainContent] = useState(null);

  useEffect(() => {
    // Check the pathname and set the corresponding component
    switch (location.pathname) {
      case '/inventory':
        setMainContent(<InventoryMain />);
        break;
      case '/overview-console':
        setMainContent(<OverviewMain />);
        break;
      case '/e-templates':
        setMainContent(<EmailMain />);
        break;
      case '/medical-forms':
        setMainContent(<MedicalMain />);
        break;
      case '/task-list':
        setMainContent(<TasksMain />);
        break;
      case '/account-settings':
        setMainContent(<AccountMain />);
        break;
      default:
        setMainContent(null);
    }
  }, [location]);

  return (
    <Provider store={store}>
      <div id="dashboard" className="App">
        <div className="nav-display"><Nav /></div> 
        <div className="console-display">
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Routes for features */}
            <Route path="/overview-console" element={<Overview />} />
            <Route path="/medical-forms" element={<Medifiles />} />
            <Route path="/e-templates" element={<ETemplates />} />
            <Route path="/task-list" element={<TasksList />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/account-settings" element={<Account />} />
          </Routes>
        </div>
        <div id="main" className="main">
          {mainContent}
        </div>
      </div>
    </Provider>
  );
}

export default App;
