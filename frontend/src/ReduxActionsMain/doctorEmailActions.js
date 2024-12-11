// doctorEmailActions.js

// Action to fetch doctor email templates
export const fetchDoctorEmails = (token) => {
    return async (dispatch) => {
      try {
        if (!token) {
          throw new Error("No token provided");
        }
        const response = await fetch('http://127.0.0.1:3000/dr_templates',{
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        } );
        if (response.status === 401) {
          localStorage.removeItem("jwt"); // Clear the token
          window.location.href = "/login"; // Redirect to login
          throw new Error("Unauthorized");
        }
        const data = await response.json();
        dispatch({ type: 'FETCH_DOCTOR_EMAILS_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_DOCTOR_EMAILS__ERROR', payload: error.message });
      }
    };
  };


// select email and render on Main ui 

export const setSelectedDoctorEmail = (file) => { 
  console.log(file)
  return  {
    type: 'SET_SELECTED_DR_EMAIL',
    payload: file,
  };
};

  // Action to create a doctor email template
  export const createDoctorEmail = (newEmail) => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://127.0.0.1:3000/dr_templates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dr_temp_title: newEmail.dr_temp_title,
            dr_temp_subject: newEmail.dr_temp_subject,
            dr_temp_content: newEmail.dr_temp_content,
            category: newEmail.category,
          }),
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
        const response = await fetch(`http://127.0.0.1:3000/dr_templates/${emailId}`, {
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
        await fetch(`http://127.0.0.1:3000/dr_templates/${emailId}`, {
          method: 'DELETE',
        });
        dispatch({ type: 'DELETE_DOCTOR_EMAIL_SUCCESS', payload: emailId });
      } catch (error) {
        dispatch({ type: 'DELETE_DOCTOR_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  

  