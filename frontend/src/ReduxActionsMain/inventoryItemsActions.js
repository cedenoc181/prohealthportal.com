// inventoryItemsActions.js
  
const token = localStorage.getItem("jwt")

export const fetchInventoryItems = (token) => {
    return async (dispatch) => {
        try {
            if (!token) {
                throw new Error("No token provided")
            }
            const response = await fetch('http://127.0.0.1:3000/inventory_items', {
              method: 'GET',
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

            console.log(`fetch inventoryItems: ${data}`)

            dispatch({ type: "FETCH_INVENTORY_SUCCESS", payload: data })
        } catch (error) {
            dispatch({ type: "FETCH_INVENTORY_ERROR", payload: error.message})
        }
    };
  };

  export const fetchInsufficientItems = (token) => {
    return async (dispatch) => {
      console.log("Dispatching fetchInsufficientItems...");
      try {
          if (!token) {
              console.log("token failure")
              throw new Error("No token provided")
          }

          console.log(token)
          
          const response = await fetch('http://127.0.0.1:3000/low_inv_items', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
          });
          const data = await response.json();

          console.log(`fetch inventoryItems: ${data}`)

          dispatch({ type: "FETCH_LOW_STOCK", payload: data })
      } catch (error) {
          dispatch({ type: "FETCHING_LOW_STOCK_ERROR", payload: error.message})
      }
    };
  };


  export const inventoryByClinic = (token) => {
      return async (dispatch) => {
        console.log("dispatching inventory by clinic")
        try {
          if (!token) {
            console.log("token failure")
            throw new Error("No token provided")
           }

        const response = await fetch('http://127.0.0.1:3000/inventory_by_clinic', {
          method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();

        dispatch({ type: "INVENTORY_BY_GROUP_SUCCESS", payload: data })
      } catch (error) {
          dispatch({ type: "INVENTORY_BY_GROUP_ERROR", payload: error.message})
      }
    };
  };

   export const createInventoryItems = (newInventoryItems) => {
      return async (dispatch) => {
        try {
       
          const response = await fetch('http://127.0.0.1:3000/inventory_items', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({newInventoryItems}),
          });
          const data = await response.json();
          dispatch({ type: 'CREATE_INVENTORY_SUCCESS', payload: data });
        } catch (error) {
          dispatch({ type: 'CREATE_INVENTORY_ERROR', payload: error.message });
        }
      };
    };

    export const updateInventoryItems = (inventoryId, updatedInfo) => {
      return async (dispatch) => {
        try {
          const response = await fetch(`http://127.0.0.1:3000/inventory_items/${inventoryId}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInfo),
          });
          const data = await response.json();
          dispatch({ type: 'UPDATE_INVENTORY_SUCCESS', payload: data });
        } catch (error) {
          dispatch({ type: 'UPDATE_INVENTORY_ERROR', payload: error.message });
        }
      };
    };

    export const deleteInventoryItems = (inventoryId) => {
      return async (dispatch) => {
        try {
          await fetch(`http://127.0.0.1:3000/inventory_items/${inventoryId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          dispatch({ type: 'DELETE_INVENTORY_SUCCESS', payload: inventoryId });
        } catch (error) {
          dispatch({ type: 'DELETE_INVENTORY_ERROR', payload: error.message });
        }
      };
    };
    
  
    