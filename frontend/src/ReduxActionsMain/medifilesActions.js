// medifilesActions.js

// Action to fetch medical files
export const fetchMedifiles = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://127.0.0.1:3000/medifiles');
        const data = await response.json();
        console.log(data);
        dispatch({ type: 'FETCH_MEDIFILES_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_MEDIFILES_ERROR', payload: error.message });
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
        formData.append('file_editable', newMedifile.file_editable);
        formData.append('file_cover_alt', newMedifile.category);
  
        // Make the POST request
        const response = await fetch('http://127.0.0.1:3000/medifiles', {
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
        const response = await fetch(`http://127.0.0.1:3000/medifiles/${medifileId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              title: updatedInfo.title,
              description: updatedInfo.description,
              instructions: updatedInfo.instructions,
              file_link: updatedInfo.file_link,
              file_cover: updatedInfo.file_cover,
              file_cover_alt: updatedInfo.category,
              language: updatedInfo.language,
              file_editable: updatedInfo.file_editable
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
        await fetch(`http://127.0.0.1:3000/medifiles/${medifileId}`, {
          method: 'DELETE',
        });
        dispatch({ type: 'DELETE_MEDIFILE_SUCCESS', payload: medifileId });
      } catch (error) {
        dispatch({ type: 'DELETE_MEDIFILE_ERROR', payload: error.message });
      }
    };
  };
  