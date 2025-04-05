// requestedItemsAction.js

  export const fetchRequestedItems = (token) => {
    return async (dispatch) => {
        try {
            if (!token) {
                throw new Error("No token provided")
            }
            const response = await fetch('http://127.0.0.1:3000/requested_items', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 401) {
                localStorage.removeItem("jwt");
                window.location.href = "/login";
                throw new Error("Unauthorized");
            }
            const data = await response.json();
            dispatch({ type: "FETCH_REQUESTED_ITEMS_SUCCESS", payload: data })
        } catch (error) {
            dispatch({ type: "FETCH_REQUESTED_ITEMS_ERROR", payload: error.message})
        }
    };
  };


  export const requestedItemsGroupedByClinics = (token) => {
    return async (dispatch) => {
        try {
            if (!token) {
                throw new Error("No token provided")
            }
            const response = await fetch('http://127.0.0.1:3000/requested_items_for_clinics', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            dispatch({ type: "FETCH_ALL_REQUESTED_ITEMS_BY_CLINICS_SUCCESS", payload: data })
        } catch (error) {
            dispatch({ type: "FETCH_ALL_REQUESTED_ITEMS_BY_CLINICS_ERROR", payload: error.message})
        }
    };
  };

   export const createRequestedItems = (newRequestedItems) => {
      return async (dispatch) => {
        try {
       
          console.log(newRequestedItems)

          const response = await fetch('http://127.0.0.1:3000/requested_items', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRequestedItems),
          });
          const data = await response.json();
          dispatch(requestedItemsGroupedByClinics(token));
          dispatch({ type: 'CREATE_REQUESTED_ITEMS_SUCCESS', payload: data });
        } catch (error) {
          dispatch({ type: 'CREATE_REQUESTED_ITEMS_ERROR', payload: error.message });
        }
      };
    };


    export const deleteRequestedItems = (requestedItemsId) => {
      return async (dispatch) => {
        try {
          await fetch(`http://127.0.0.1:3000/requested_items/${requestedItemsId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          dispatch(requestedItemsGroupedByClinics(token));
          dispatch({ type: 'DELETE_REQUESTED_ITEMS_SUCCESS', payload: requestedItemsId });
        } catch (error) {
          dispatch({ type: 'DELETE_REQUESTED_ITEMS_ERROR', payload: error.message });
        }
      };
    };
    
    export const updateRequestedItems = (requestedItemsId, updatedInfo) => {
      return async (dispatch) => {
        try {
          const response = await fetch(`http://127.0.0.1:3000/requested_items/${requestedItemsId}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInfo),
          });
          const data = await response.json();
          dispatch(requestedItemsGroupedByClinics(token));
          // add delete function to this request
          dispatch({ type: 'UPDATE_REQUESTED_ITEMS_SUCCESS', payload: data });
        } catch (error) {
          dispatch({ type: 'UPDATE_REQUESTED_ITEMS_ERROR', payload: error.message });
        }
      };
    };


    
  
    