// patientEmailActions.js
const token = localStorage.getItem("jwt");
// Action to fetch patient email templates
export const fetchPatientEmails = (token) => {
    return async (dispatch) => {
      try {
        if (!token) {
          throw new Error("No token provided");
        }

        const response = await fetch('http://127.0.0.1:3000/patient_templates', {
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
        dispatch({ type: 'FETCH_PATIENT_EMAILS_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_PATIENT_EMAILS_ERROR', payload: error.message });
      }
    };
  };

// select email and render on Main ui 

export const setSelectedPatientEmail = (file) => { 
  console.log(file)
  return  {
    type: 'SET_SELECTED_PX_EMAIL',
    payload: file,
  };
};

  
  // Action to create a patient email template
  export const createPatientEmail = (newEmail) => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://127.0.0.1:3000/patient_templates', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({newEmail}),
        });
        const data = await response.json();
        dispatch({ type: 'CREATE_PATIENT_EMAIL_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'CREATE_PATIENT_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to update a patient email template
  export const updatePatientEmail = (emailId, updatedInfo) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/patient_templates/${emailId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedInfo),
        });
        const data = await response.json();
        dispatch({ type: 'UPDATE_PATIENT_EMAIL_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'UPDATE_PATIENT_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to delete a patient email template
  export const deletePatientEmail = (emailId) => {
    return async (dispatch) => {
      try {
        await fetch(`http://127.0.0.1:3000/patient_templates/${emailId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        dispatch({ type: 'DELETE_PATIENT_EMAIL_SUCCESS', payload: emailId });
      } catch (error) {
        dispatch({ type: 'DELETE_PATIENT_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  
