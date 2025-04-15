// taskContentActions.js

// Action to fetch the first 5 task content data per task table
export const fetchFiveTaskContents = (token) => {
    return async (dispatch) => {
      try {
        if (!token) {
          throw new Error("No token provided");
        }
        const response = await fetch('http://127.0.0.1:3000/first_five_clinical_task',{
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
        dispatch({ type: 'FETCH_TASK_CONTENT_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_TASK_CONTENT_ERROR', payload: error.message });
      }
    };
  };

  // Action to create a task content data
  export const createTaskContent = (taskContent, token) => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://127.0.0.1:3000/task_contents', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({taskContent}),
        });
        const data = await response.json();
        dispatch({ type: 'CREATE_TASK_CONTENT_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'CREATE_TASK_CONTENT_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to update task content data
  export const updateTaskContents = (taskContentId, updatedInfo, token) => {
    return async (dispatch) => {
      try {
        const updateTaskData = {
          ...updatedInfo.task_data
        };
  
        // remove any null values
        Object.keys(updateTaskData).forEach(key => {
          if (updateTaskData[key] === null) {
            delete updateTaskData[key];
          }
        });
  
        const payload = {
          task_id: updatedInfo.task_id,
          user_id: updatedInfo.user_id,
          task_data: updateTaskData
        };
  
        const response = await fetch(`http://127.0.0.1:3000/task_contents/${taskContentId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error('Task content update failed. Task may not exist.');
        }
  
        const data = await response.json();
        dispatch({ type: 'UPDATE_TASK_CONTENT_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'UPDATE_TASK_CONTENT_ERROR', payload: error.message });
      }
    };
  };
  
  
  // Action to delete a patient email template
  export const deleteTaskContent = (taskContentId, token) => {
    return async (dispatch) => {
      try {
        await fetch(`http://127.0.0.1:3000/task_contents/${taskContentId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        dispatch({ type: 'DELETE_TASK_CONTENT_SUCCESS', payload: taskContentId });
      } catch (error) {
        dispatch({ type: 'DELETE_TASK_CONTENT_ERROR', payload: error.message });
      }
    };
  };
  

  