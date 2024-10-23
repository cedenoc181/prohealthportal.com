// reducers.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  items: [],
};

// Use createSlice to create actions and reducers automatically
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

// Export the actions
export const { addItem, removeItem } = itemsSlice.actions;

// Export the reducer to be used in the store
export default itemsSlice.reducer;
