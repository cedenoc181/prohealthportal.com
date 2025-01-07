const token = localStorage.getItem('jwt)');

export const setSelectedMyEmail = (file) => { 
    console.log(file)
    return  {
      type: 'SET_SELECTED_MY_EMAIL',
      payload: file,
    };
  };

  
// Actin to fetch my email templates 
  export const fetchMyEmails = () => {
    if (!token) {
      throw new Error("Authorization token is missing.");
    }
    return async (dispatch) => {
      try {
        const response = await fetch('http://127.0.0.1:3000/my_templates', {
          headers: { 
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
           },
        });
        const data = await response.json();
        dispatch({ type: 'FETCH_MY_EMAILS_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_MY_EMAILS_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to create a patient email template
  export const createMyEmail = (newEmail) => {
    return async (dispatch) => {
      if (!token) {
        throw new Error("Authorization token is missing.");
      }
      try {
        const response = await fetch('http://127.0.0.1:3000/my_templates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newEmail),
        });
        const data = await response.json();
        dispatch({ type: 'CREATE_MY_EMAIL_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'CREATE_MY_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to update a patient email template
  export const updatePatientEmail = (emailId, updatedEmail) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/my_templates/${emailId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEmail),
        });
        const data = await response.json();
        dispatch({ type: 'UPDATE_MY_EMAIL_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'UPDATE_MY_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to delete a patient email template
  export const deletePatientEmail = (emailId) => {
    return async (dispatch) => {
      if (!token) {
        throw new Error("Authorization token is missing.");
      }
      try {
        await fetch(`http://127.0.0.1:3000/my_templates/${emailId}`, {
          method: 'DELETE',
          Authorization: `Bearer ${token}`
        });
        dispatch({ type: 'DELETE__MY_EMAIL_SUCCESS', payload: emailId });
      } catch (error) {
        dispatch({ type: 'DELETE_MY_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  
