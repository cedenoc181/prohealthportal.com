// userActions.js

// Action to fetch users
export const fetchUsers = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        console.log('Fetched data:', data);
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_USERS_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to create a user
  export const createUser = (newUser) => {
    return async (dispatch) => {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
        const data = await response.json();
        dispatch({ type: 'CREATE_USER_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'CREATE_USER_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to update a user
  export const updateUser = (userId, updatedInfo) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedInfo),
        });
        const data = await response.json();
        dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'UPDATE_USER_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to delete a user
  export const deleteUser = (userId) => {
    return async (dispatch) => {
      try {
        await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });
        dispatch({ type: 'DELETE_USER_SUCCESS', payload: userId });
      } catch (error) {
        dispatch({ type: 'DELETE_USER_ERROR', payload: error.message });
      }
    };
  };
  