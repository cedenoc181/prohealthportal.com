// medifilesActions.js

// Action to fetch medical files
export const fetchMedifiles = (token) => {
    return async (dispatch) => {
      try {
        if (!token) {
          throw new Error("No token provided");
        }
  
        const response = await fetch("http://127.0.0.1:3000/medifiles", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
  
        if (response.status === 401) {
          localStorage.removeItem("jwt"); // Clear the token
          window.location.href = "/login"; // Redirect to login
          throw new Error("Unauthorized");
        }
  
        const data = await response.json();
        dispatch({ type: "FETCH_MEDIFILES_SUCCESS", payload: data });
      } catch (error) {
        console.error("Error fetching medifiles:", error);
        dispatch({ type: "FETCH_MEDIFILES_FAILURE", payload: error.message });
      }
    };
  };


// load selected index on to Main UI
export const setSelectedMedifile = (file) => { 
  console.log(file)
  return  {
    type: 'SET_SELECTED_MEDIFILE',
    payload: file,
  };
};

  
  // Action to create a medical file

  export const createMedifile = (newMedifile) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('jwt');
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
        formData.append('file_receiver_id', newMedifile.receiver_id);
  
        // Make the POST request
        const response = await fetch('http://127.0.0.1:3000/medifiles', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          method: 'POST',
          body: formData, // No Content-Type header manually set
        });
  
        // Error handling
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        dispatch({ type: 'CREATE_MEDIFILE_SUCCESS', payload: data });
      } catch (error) {
        console.error('Error creating medifile:', error);
        dispatch({ type: 'CREATE_MEDIFILE_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to update a medical file
  export const updateMedifile = (medifileId, updatedInfo) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('jwt');

        const response = await fetch(`http://127.0.0.1:3000/medifiles/${medifileId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              title: updatedInfo.title,
              description: updatedInfo.description,
              instructions: updatedInfo.instructions,
              file_cover_alt: updatedInfo.category,
              language: updatedInfo.language,
            }
          ),
        });
        const data = await response.json();
        dispatch({ type: 'UPDATE_MEDIFILE_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'UPDATE_MEDIFILE_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to delete a medical file
  export const deleteMedifile = (medifileId) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`http://127.0.0.1:3000/medifiles/${medifileId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          method: 'DELETE',
        });
        if (response.ok) {
          dispatch({ type: 'DELETE_MEDIFILE_SUCCESS', payload: medifileId });
          console.log("selected file has been deleted:", medifileId);
        } else {
          throw new Error('Failed to delete the medifile');
        }
      } catch (error) {
        dispatch({ type: 'DELETE_MEDIFILE_ERROR', payload: error.message });
      }
    };
  };

  