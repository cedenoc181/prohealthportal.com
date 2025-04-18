// taskActions.js

// export const fetchTasks = (token) => {
//     return async (dispatch) => {
//       try {
//         if (!token) {
//           throw new Error("No token provided");
//         }
//         const response = await fetch('http://127.0.0.1:3000/tasks',{
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//           },
//         } );
//         if (response.status === 401) {
//           localStorage.removeItem("jwt"); // Clear the token
//           window.location.href = "/login"; // Redirect to login
//           throw new Error("Unauthorized");
//         }
//         const data = await response.json();
//         dispatch({ type: 'FETCH_TASK_SUCCESS', payload: data });
//       } catch (error) {
//         dispatch({ type: 'FETCH_TASK_ERROR', payload: error.message });
//       }
//     };
//   };

// Action to fetch task table by clinic
  export const groupedClinicTasksTables = (token) => {
    return async (dispatch) => {
      try {
        if (!token) {
          throw new Error("No token provided");
        }
        const response = await fetch('http://127.0.0.1:3000/all_clinical_task_tables',{
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
  export const createTasks = (task, token) => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://127.0.0.1:3000/tasks', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({task}),
        });
        const data = await response.json();
        dispatch({ type: 'CREATE_TASK_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'CREATE_TASK_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to update task table
  export const updateTasks = (taskId, updatedInfo, token) => {
    return async (dispatch, getState) => {
      try {


        const existingTask = getState().tasks.find(task => task.id === taskId);

        if (!existingTask) {
          throw new Error(`Task with ID ${taskId} not found`);
        }

        const updateColumnNames = {
          ...existingTask.column_names,
          ...updatedInfo.column_names
        };

        // remove any null values
        Object.keys(updateColumnNames).forEach(key => {
          if (updateColumnNames[key] === null) {
            delete updateColumnNames[key];
          }
        });

        const payload = {
          task_table_title: updatedInfo.task_table_title || existingTask.task_table_title,
          clinic_id: updatedInfo.clinic_id || existingTask.clinic_id,
          column_names: updateColumnNames
        };

        const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'UPDATE_TASK_ERROR', payload: error.message });
      }
    };
  };
  
  // Action to delete a patient email template
  export const deleteTasks = (taskId, token) => {
    return async (dispatch) => {
      try {
        await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        dispatch({ type: 'DELETE_TASK_SUCCESS', payload: taskId });
      } catch (error) {
        dispatch({ type: 'DELETE_TASK_ERROR', payload: error.message });
      }
    };
  };
  

  