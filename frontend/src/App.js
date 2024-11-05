import './App.css';
// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import InventoryMain from './Components/Dashboard/Features/Main/InventoryMain.jsx';


function App() {
  

  return (
    <Provider store={store}>
    <div id="dashboard" className="App">
     <div className="nav-display"><Nav /></div> 
      <div className="console-display">
      <Routes>
          <Route path="/login" element={<Login />} />
          {/* routes for features */}
          <Route path="/overview-console" element={<Overview />} />
          <Route path="/medical-forms" element={<Medifiles />} />
          <Route path="/e-templates" element={<ETemplates />} />
          <Route path="/task-list" element={<TasksList />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/account-settings" element={<Account />} />
         </Routes>

      </div>
        <div className="main">
          {/* http://localhost:4000/ */}
 {window.location.pathname === '/inventory' ? <InventoryMain /> : null}
        
        </div>


  
    </div>
    </Provider>
  );
}

export default App;
