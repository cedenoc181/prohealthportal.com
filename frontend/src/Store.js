import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers.js'; // Your root reducer

const store = configureStore({
  reducer: rootReducer, // specify your root reducer here
});

export default store;