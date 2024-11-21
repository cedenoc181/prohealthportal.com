// store.js
import { configureStore } from '@reduxjs/toolkit';
import medifilesReducer from './ReduxReducerMain/medifilesReducer.js';
import userReducer from './ReduxReducerMain/userReducer.js'; 
import taskReducer from './ReduxReducerMain/taskReducer.js';
import patientEmailReducer from './ReduxReducerMain/patientEmailReducer.js';
import doctorEmailReducer from './ReduxReducerMain/doctorEmailReducer.js';
import inventoryReducer from './ReduxReducerMain/inventoryReducer.js';
import myEmailTemplateReducer from './ReduxReducerMain/myEmailTemplateReducer.js';
import myMedifilesReducer from './ReduxReducerMain/myMedifilesReducer.js';


// import rootReducer from 'reducers.js/rootReducer';

const store = configureStore({
  reducer: {
    medifiles: medifilesReducer,
    myMedifiles : myMedifilesReducer,
    users: userReducer,
    task: taskReducer,
    myEmail: myEmailTemplateReducer,
    patient: patientEmailReducer,
    doctor: doctorEmailReducer,
    inventory: inventoryReducer,
  }, // Combine all reducers
});

export default store;
