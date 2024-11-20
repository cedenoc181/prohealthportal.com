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
        const response = await fetch('/api/medifiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMedifile),
        });
        const data = await response.json();
        dispatch({ type: 'CREATE_MEDIFILE_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'CREATE_MEDIFILE_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to update a medical file
  export const updateMedifile = (medifileId, updatedInfo) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`/api/medifiles/${medifileId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedInfo),
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
        await fetch(`/api/medifiles/${medifileId}`, {
          method: 'DELETE',
        });
        dispatch({ type: 'DELETE_MEDIFILE_SUCCESS', payload: medifileId });
      } catch (error) {
        dispatch({ type: 'DELETE_MEDIFILE_ERROR', payload: error.message });
      }
    };
  };
  