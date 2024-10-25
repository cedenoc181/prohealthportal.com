import './App.css';
// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Store.js';
import Login from './Components/Login/Login.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';

function App() {
  

  return (
    <Provider store={store}>
    <div className="App">
         <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={ <Dashboard />}/>
         </Routes>
    </div>
    </Provider>
  );
}

export default App;
