// store.js
import { configureStore } from '@reduxjs/toolkit';
import medifilesReducer from './ReduxReducerMain/medifilesReducer.js';
import userReducer from './ReduxReducerMain/userReducer.js'; 
import taskReducer from './ReduxReducerMain/taskReducer.js';
import emailReducer from './ReduxReducerMain/emailReducer.js';
import inventoryReducer from './ReduxReducerMain/inventoryReducer.js';




// import rootReducer from 'reducers.js/rootReducer';

const store = configureStore({
  reducer: {
    medifiles: medifilesReducer,
    users: userReducer,
    task: taskReducer,
    email: emailReducer,
    inventory: inventoryReducer,
  }, // Combine all reducers
});

export default store;
