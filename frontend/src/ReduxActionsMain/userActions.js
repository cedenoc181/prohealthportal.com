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

// Action to fetch user account
export const fetchMyAccount = (token) => async (dispatch) => {
  dispatch({ type: "FETCH_USER_DATA_REQUEST" });
  try {
    const response = await fetch(`http://127.0.0.1:3000/my-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_USER_DATA_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_USER_DATA_FAILURE", payload: error.message });
  }
};

// Action to fetch users
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const data = await fetchWithAuth("http://127.0.0.1:3000/users");
      console.log("Fetched data from Redux:", data);
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_USERS_ERROR", payload: error.message });
    }
  };
};


// load selected index on to Main UI
export const setSelectedUser = (profile) => { 
  console.log(profile)
  return  {
    type: 'SET_SELECTED_USER',
    payload: profile,
  };
}; 

// Action to create a user
export const createUser = (newUser) => {
  return async (dispatch) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      throw new Error("Authorization token is missing.");
    }
    try {
      const data = await fetchWithAuth("http://127.0.0.1:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" , 
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newUser),
      });
      dispatch({ type: "CREATE_USER_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "CREATE_USER_ERROR", payload: error.message });
    }
  };
};


// create patient template 

export const createPatientTemplates = (px_temp) => {
  return async (dispatch) => {

    const token = localStorage.getItem("jwt");

    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    try {
      const data = await fetchWithAuth("http://127.0.0.1:3000/create-patient-template", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(px_temp),
      });
      dispatch({ type: "CREATE_USER_PATIENT_TEMP_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "CREATE_USER_PATIENT_TEMP_ERROR", payload: error.message });
    }
  };
};

// create doctor template 

export const createDrTemplates = (dr_temp) => {
  return async (dispatch) => {

    const token = localStorage.getItem("jwt");

    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    try {
      const data = await fetchWithAuth("http://127.0.0.1:3000/create-doctor-template", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(dr_temp),
      });
      dispatch({ type: "CREATE_USER_DOCTOR_TEMP_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "CREATE_USER_DOCTOR_TEMP_ERROR", payload: error.message });
    }
  };
};

// create medifiles 

export const createMedifile = (newMedifile) => {
  return async (dispatch) => {

    const token = localStorage.getItem("jwt");

    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append files to FormData
      if (newMedifile.file_link instanceof File) {
        formData.append('file_link', newMedifile.file_link);
      }

      if (newMedifile.file_cover instanceof File) {
        formData.append('file_cover', newMedifile.file_cover);
      }

      // Append the rest of the data as fields
      formData.append('title', newMedifile.title);
      formData.append('description', newMedifile.description);
      formData.append('instructions', newMedifile.instructions);
      formData.append('language', newMedifile.language);
      formData.append('file_cover_alt', newMedifile.category);
      formData.append('file_owner_id', newMedifile.owner_id);
      formData.append('file_receiver_id', newMedifile.receiver_id)


      // Make the POST request
      const response = await fetch('http://127.0.0.1:3000/create-medifiles-template', {
        method: 'POST',
        body: formData, // No Content-Type header manually set
      });

      // Error handling
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      dispatch({ type: 'CREATE_USER_MEDIFILE_SUCCESS', payload: data });
    } catch (error) {
      console.error('Error creating medifile through user:', error);
      dispatch({ type: 'CREATE_USER_MEDIFILE_ERROR', payload: error.message });
    }
  };
};




// Action to update a user
export const updateUser = (userId, updatedInfo) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Authorization token is missing.");
  }
  return async (dispatch) => {
    try {
      const data = await fetchWithAuth(`http://127.0.0.1:3000/users/${userId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}`
         },
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



