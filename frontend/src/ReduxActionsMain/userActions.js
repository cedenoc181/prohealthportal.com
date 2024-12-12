// // userActions.js

// // Action to fetch users
// export const fetchUsers = () => {
//     return async (dispatch) => {
//       try {
//         const response = await fetch('http://127.0.0.1:3000/users');
//         const data = await response.json();
//         console.log('Fetched data:', data);
//         dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data });
//       } catch (error) {
//         dispatch({ type: 'FETCH_USERS_ERROR', payload: error.message });
//       }
//     };
//   };
  
//   // Action to create a user
//   export const createUser = (newUser) => {
//     return async (dispatch) => {
//       try {
//         const response = await fetch('http://127.0.0.1:3000/users', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newUser),
//         });
//         const data = await response.json();
//         dispatch({ type: 'CREATE_USER_SUCCESS', payload: data });
//       } catch (error) {
//         dispatch({ type: 'CREATE_USER_ERROR', payload: error.message });
//       }
//     };
//   };
  
//   // Action to update a user
//   export const updateUser = (userId, updatedInfo) => {
//     return async (dispatch) => {
//       try {
//         const response = await fetch(`http://127.0.0.1:3000/users/${userId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(updatedInfo),
//         });
//         const data = await response.json();
//         dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data });
//       } catch (error) {
//         dispatch({ type: 'UPDATE_USER_ERROR', payload: error.message });
//       }
//     };
//   };
  
//   // Action to delete a user
//   export const deleteUser = (userId) => {
//     return async (dispatch) => {
//       try {
//         await fetch(`http://127.0.0.1:3000/users/${userId}`, {
//           method: 'DELETE',
//         });
//         dispatch({ type: 'DELETE_USER_SUCCESS', payload: userId });
//       } catch (error) {
//         dispatch({ type: 'DELETE_USER_ERROR', payload: error.message });
//       }
//     };
//   };
  


//   // login functionality for user 

//   export const loginUser = (credentials) => {

//     console.log(credentials)
//     return async (dispatch) => {
//       try {
//         const response = await fetch('http://127.0.0.1:3000/account/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(credentials),
//         });
  
//         const data = await response.json();
//         console.log(data, 'received')
//         if (response.ok) {
//           dispatch({ type: 'LOGIN_SUCCESS', payload: data });
//           return data; // Return the user data for further handling
//         } else {
//           throw new Error(data.message || 'Login failed');
//         }
//       } catch (error) {
//         dispatch({ type: 'LOGIN_ERROR', payload: error.message });
//         throw error; // Re-throw the error to handle it in the component
//       }
//     };
//   };


// // Action to log out a user
// export const logoutUser = () => {
//   localStorage.removeItem("jwt"); // Clear the JWT on logout
//   return { type: 'LOGOUT' };
// };

// // my account 

// // Action to fetch user data (optional if needed later)
// export const fetchMyAccount = (token) => {
//   return async (dispatch) => {
//     if (!token) {
//       dispatch({ type: "FETCH_USER_DATA_FAILURE", payload: "Missing token" });
//       return;
//     }

//     try {
//       const response = await fetch(`http://127.0.0.1:3000/my-account`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the JWT
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch account data");
//       }

//       const data = await response.json();
//       console.log(data);
//       dispatch({ type: "FETCH_USER_DATA_SUCCESS", payload: data });
//     } catch (error) {
//       dispatch({ type: "FETCH_USER_DATA_FAILURE", payload: error.message });
//     }
//   };
// };




// userActions.js

// Helper function to fetch with Authorization
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    if (response.status === 401) {
      // Token has expired or is invalid
      localStorage.removeItem("jwt");
      throw new Error("Unauthorized. Please log in again.");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.json();
};

// Action to fetch users
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const data = await fetchWithAuth("http://127.0.0.1:3000/users");
      console.log("Fetched data:", data);
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_USERS_ERROR", payload: error.message });
    }
  };
};

// Action to create a user
export const createUser = (newUser) => {
  return async (dispatch) => {
    try {
      const data = await fetchWithAuth("http://127.0.0.1:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      dispatch({ type: "CREATE_USER_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "CREATE_USER_ERROR", payload: error.message });
    }
  };
};

// Action to update a user
export const updateUser = (userId, updatedInfo) => {
  return async (dispatch) => {
    try {
      const data = await fetchWithAuth(`http://127.0.0.1:3000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInfo),
      });
      dispatch({ type: "UPDATE_USER_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "UPDATE_USER_ERROR", payload: error.message });
    }
  };
};

// Action to delete a user
export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      await fetchWithAuth(`http://127.0.0.1:3000/users/${userId}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_USER_SUCCESS", payload: userId });
    } catch (error) {
      dispatch({ type: "DELETE_USER_ERROR", payload: error.message });
    }
  };
};

// Login functionality for user
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://127.0.0.1:3000/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        localStorage.setItem("jwt", data.token); // Store the token
        return data; // Return the user data for further handling
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR", payload: error.message });
      throw error; // Re-throw the error to handle it in the component
    }
  };
};

// Action to log out a user
export const logoutUser = () => {
  localStorage.removeItem("jwt"); // Clear the JWT on logout
  return { type: "LOGOUT" };
};

// Action to fetch user account
export const fetchMyAccount = () => {
  return async (dispatch) => {
    try {
      const data = await fetchWithAuth("http://127.0.0.1:3000/my-account");
      dispatch({ type: "FETCH_USER_DATA_SUCCESS", payload: data });
      console.log(data);
    } catch (error) {
      dispatch({ type: "FETCH_USER_DATA_FAILURE", payload: error.message });
    }
  };
};
