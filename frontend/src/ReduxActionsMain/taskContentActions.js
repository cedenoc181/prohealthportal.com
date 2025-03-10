// taskContentActions.js
const token = localStorage.getItem("jwt");
// Action to fetch task content data
export const fetchTaskContents = (token) => {
    return async (dispatch) => {
      try {
        if (!token) {
          throw new Error("No token provided");
        }
        const response = await fetch('http://127.0.0.1:3000/task_contents',{
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
  export const createTaskContent = (taskContent) => {
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
  export const updateTaskContents = (taskContentId, updatedInfo) => {
    return async (dispatch, getState) => {
      try {

        const existingTaskContent = getState().taskContents.find(taskContent => taskContent.id === taskContentId);

        if (!existingTaskContent) {
          throw new Error(`Task content with ID ${taskContentId} not found`);
        }

        const updateTaskData = {
          ...existingTaskContent.task_data,
          ...updatedInfo.task_data
        };

        // remove any null values
        Object.keys(updateTaskData).forEach(key => {
          if (updateTaskData[key] === null) {
            delete updateTaskData[key];
          }
        });

        const payload = {
          task_id: updatedInfo.task_id || existingTask.task_id,
          user_id: updatedInfo.user_id || existingTask.user_id,
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

        const data = await response.json();
        dispatch({ type: 'UPDATE_TASK_CONTENT_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'UPDATE_TASK_CONTENT_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to delete a patient email template
  export const deleteTaskContent = (taskContentId) => {
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
  

  