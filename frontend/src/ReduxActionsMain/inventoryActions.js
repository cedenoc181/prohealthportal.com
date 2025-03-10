// inventoryActions.js
const token = localStorage.getItem("jwt")

  export const fetchInventoryItems = (token) => {
    return async (dispatch) => {
        try {
            if (!token) {
                throw new Error("No token provided")
            }
            const response = await fetch('http://123.0.0.1:3000/inventory_items', {
                headers: {
                    Authroization: `Bearer ${token}`,
                },
            });
            if (response.status === 401) {
                localStorage.removeItem("jwt");
                window.location.href = "/login";
                throw new Error("Unauthorized");
            }
            const data = await response.json();
            dispatch({ type: "FETCH_INVENTORY_SUCCESS", payload: data })
        } catch (error) {
            dispatch({ type: "FETCH_INVENTORY_ERROR", payload: error.message})
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
    
  
    