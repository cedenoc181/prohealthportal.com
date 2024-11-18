// doctorEmailActions.js

// Action to fetch doctor email templates
export const fetchDoctorEmails = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://127.0.0.1:3000/dr_templates');
        const data = await response.json();
        dispatch({ type: 'FETCH_DOCTOR_EMAILS_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_DOCTOR_EMAILS__ERROR', payload: error.message });
      }
    };
  };
  
  // Action to create a doctor email template
  export const createDoctorEmail = (newEmail) => {
    return async (dispatch) => {
      try {
        const response = await fetch('/api/dr-emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEmail),
        });
        const data = await response.json();
        dispatch({ type: 'CREATE_DOCTOR_EMAIL_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'CREATE_DOCTOR_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to update a doctor email template
  export const updateDoctorEmail = (emailId, updatedInfo) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`/api/dr-emails/${emailId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedInfo),
        });
        const data = await response.json();
        dispatch({ type: 'UPDATE_DOCTOR_EMAIL_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'UPDATE_DOCTOR_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to delete a patient email template
  export const deleteDoctorEmail = (emailId) => {
    return async (dispatch) => {
      try {
        await fetch(`/api/dr-emails/${emailId}`, {
          method: 'DELETE',
        });
        dispatch({ type: 'DELETE_DOCTOR_EMAIL_SUCCESS', payload: emailId });
      } catch (error) {
        dispatch({ type: 'DELETE_DOCTOR_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  

  