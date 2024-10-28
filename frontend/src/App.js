import './App.css';
// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Store.js';
import Login from './Components/Login/Login.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';

// importing features 
import Overview from "./Components/Dashboard/Features/Overview.jsx";
import ETemplates from "./Components/Dashboard/Features/Email.jsx";
import Medifiles from "./Components/Dashboard/Features/Medical.jsx";
import TasksList from "./Components/Dashboard/Features/Task.jsx";
import Inventory from "./Components/Dashboard/Features/Inventory.jsx";
import Account from "./Components/Dashboard/Features/Account.jsx";


function App() {
  

  return (
    <Provider store={store}>
    <div className="App">
          <Dashboard />
         <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={ <Dashboard />}/>
          {/* routes for features */}
          <Route path="/overview-console" element={<Overview />} />
          <Route path="/medical-forms" element={<Medifiles />} />
          <Route path="/e-templates" element={<ETemplates />} />
          <Route path="/task-list" element={<TasksList />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/account-settings" element={<Account />} />
         </Routes>
    </div>
    </Provider>
  );
}

export default App;
