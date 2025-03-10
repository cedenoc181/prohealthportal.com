// orderedItemsAction.js
const token = localStorage.getItem("jwt")

  export const fetchOrderedItems = (token) => {
    return async (dispatch) => {
        try {
            if (!token) {
                throw new Error("No token provided")
            }
            const response = await fetch('http://123.0.0.1:3000/ordered_items', {
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
            dispatch({ type: "FETCH_ORDERED_ITEMS_SUCCESS", payload: data })
        } catch (error) {
            dispatch({ type: "FETCH_ORDERED_ITEMS_ERROR", payload: error.message})
        }
    };
  };

   export const createOrderedItems = (newOrderedItems) => {
      return async (dispatch) => {
        try {
       
          const response = await fetch('http://127.0.0.1:3000/ordered_items', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({newOrderedItems}),
          });
          const data = await response.json();
          dispatch({ type: 'CREATE_ORDERED_ITEMS_SUCCESS', payload: data });
        } catch (error) {
          dispatch({ type: 'CREATE_ORDERED_ITEMS_ERROR', payload: error.message });
        }
      };
    };

    export const updateOrderedItems = (orderedItemsId, updatedInfo) => {
      return async (dispatch) => {
        try {
          const response = await fetch(`http://127.0.0.1:3000/ordered_items/${orderedItemsId}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInfo),
          });
          const data = await response.json();
          dispatch({ type: 'UPDATE_ORDERED_ITEMS_SUCCESS', payload: data });
        } catch (error) {
          dispatch({ type: 'UPDATE_ORDERED_ITEMS_ERROR', payload: error.message });
        }
      };
    };

    export const deleteOrderedItems = (orderedItemsId) => {
      return async (dispatch) => {
        try {
          await fetch(`http://127.0.0.1:3000/ordered_items/${orderedItemsId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          dispatch({ type: 'DELETE_ORDERED_ITEMS_SUCCESS', payload: orderedItemsId });
        } catch (error) {
          dispatch({ type: 'DELETE_ORDERED_ITEMS_ERROR', payload: error.message });
        }
      };
    };
    
  
    