// store.js
import { configureStore } from '@reduxjs/toolkit';
import medifilesReducer from './ReduxReducerMain/medifilesReducer.js';
import userReducer from './ReduxReducerMain/userReducer.js'; 
import taskReducer from './ReduxReducerMain/taskReducer.js';
import patientEmailReducer from './ReduxReducerMain/patientEmailReducer.js';
import doctorEmailReducer from './ReduxReducerMain/doctorEmailReducer.js';
import inventoryItemsReducer from './ReduxReducerMain/inventoryItemsReducer.js';
import myEmailTemplateReducer from './ReduxReducerMain/myEmailTemplateReducer.js';
import myMedifilesReducer from './ReduxReducerMain/myMedifilesReducer.js';
import taskContentReducer from './ReduxReducerMain/taskContentReducer.js';
import orderedItemsReducer from './ReduxReducerMain/orderedItemsReducer.js';
import requestedItemsReducer from './ReduxReducerMain/requestedItemsReducer.js';


// import rootReducer from 'reducers.js/rootReducer';

const store = configureStore({
  reducer: {
    medifiles: medifilesReducer,
    myMedifiles : myMedifilesReducer,
    user: userReducer,
    task: taskReducer,
    taskContent: taskContentReducer,
    myEmail: myEmailTemplateReducer,
    patient: patientEmailReducer,
    doctor: doctorEmailReducer,
    inventoryItem: inventoryItemsReducer,
    requestedItem: requestedItemsReducer,
    orderedItem: orderedItemsReducer
  }, // Combine all reducers
});

export default store;
