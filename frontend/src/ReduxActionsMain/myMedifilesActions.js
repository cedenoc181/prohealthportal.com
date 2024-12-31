// myMedifilesActions.js

// Action to fetch medical files
export const fetchMyMedifiles = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://127.0.0.1:3000/my_medifiles');
        const data = await response.json();
        console.log(data);
        dispatch({ type: 'FETCH_MY_MEDIFILES_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_MY_MEDIFILES_ERROR', payload: error.message });
      }
    };
  };


// load selected index on to Main UI

export const setSelectedMyMedifile = (file) => { 
  console.log(file)
  return  {
    type: 'SET_SELECTED_MY_MEDIFILE',
    payload: file,
  };
};


  // Action to create a medical file
  export const createMyMedifile = (newMyMedifile) => {
    return async (dispatch) => {
      try {

    // Create a new FormData object
    const formData = new FormData();
        formData.append('user_id',newMyMedifile.user_id);
        formData.append('medifile_id',newMyMedifile.medifile_id);
        formData.append('coworker_id',newMyMedifile.coworker_id ? newMyMedifile.coworker_id : null);
        formData.append('my_file_title', newMyMedifile.my_file_title);
        formData.append('my_file_description',newMyMedifile.my_file_description);

        const response = await fetch('http://127.0.0.1:3000/my_medifiles', {
          method: 'POST',
          body: formData,
        });

          // Error handling
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

        const data = await response.json();
        dispatch({ type: 'CREATE_MY_MEDIFILE_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'CREATE_MY_MEDIFILE_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to update a medical file
  export const updateMyMedifile = (myMedifileId, updatedInfo) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/my_medifiles${myMedifileId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedInfo),
        });
        const data = await response.json();
        dispatch({ type: 'UPDATE_MY_MEDIFILE_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'UPDATE_MY_MEDIFILE_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to delete a medical file
  export const deleteMyMedifile = (myMedifileId) => {
    return async (dispatch) => {
      try {
        await fetch(`http://127.0.0.1:3000/my_medifiles/${myMedifileId}`, {
          method: 'DELETE',
        });
        dispatch({ type: 'DELETE_MY_MEDIFILE_SUCCESS', payload: myMedifileId });
      } catch (error) {
        dispatch({ type: 'DELETE_MY_MEDIFILE_ERROR', payload: error.message });
      }
    };
  };
  