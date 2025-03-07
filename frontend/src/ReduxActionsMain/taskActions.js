// taskActions.js
const token = localStorage.getItem("jwt");
// Action to fetch task table
export const fetchTasks = (token) => {
    return async (dispatch) => {
      try {
        if (!token) {
          throw new Error("No token provided");
        }
        const response = await fetch('http://127.0.0.1:3000/tasks',{
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
        dispatch({ type: 'FETCH_TASK_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_TASK_ERROR', payload: error.message });
      }
    };
  };

  // Action to create a task table
  export const createTasks = (task) => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://127.0.0.1:3000/tasks', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clinic_id: task.clinic_id,
            task_table_title: task.task_title,
            column_names: task.column_names || {},
          }),
        });
        const data = await response.json();
        dispatch({ type: 'CREATE_TASK_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'CREATE_TASK_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to update task table
  export const updateTasks = (taskId, updatedInfo) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedInfo),
        });
        const data = await response.json();
        dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'UPDATE_TASK_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to delete a patient email template
  export const deleteDoctorEmail = (emailId) => {
    return async (dispatch) => {
      try {
        await fetch(`http://127.0.0.1:3000/dr_templates/${emailId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        dispatch({ type: 'DELETE_DOCTOR_EMAIL_SUCCESS', payload: emailId });
      } catch (error) {
        dispatch({ type: 'DELETE_DOCTOR_EMAIL_ERROR', payload: error.message });
      }
    };
  };
  

  