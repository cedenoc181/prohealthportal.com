// patientEmailActions.js

// Action to fetch patient email templates
export const fetchPatientEmails = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://127.0.0.1:3000/patient_templates');
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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
             { 
              px_temp_title: newEmail.px_temp_title,
              px_temp_subject: newEmail.px_temp_subject,
              px_temp_content: newEmail.px_temp_content,
              category: newEmail.category,
              language: newEmail.language
              }),
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
        });
        dispatch({ type: 'DELETE_PATIENT_EMAIL_SUCCESS', payload: emailId });
      } catch (error) {
        dispatch({ type: 'DELETE_PATIENT_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  
