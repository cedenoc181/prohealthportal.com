const initialInventoryState = {
  data: [],
  loading: false,
  error: null
};

const inventoryReducer = (state = initialInventoryState, action) => {
    switch (action.type) {
        case 'FETCH_INVENTORY_SUCCESS':
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        case 'FETCH_INVENTORY_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload || "failed to fetch inventory items",
            };
         case 'CREATE_INVENTORY_SUCCESS':
             return {
               ...state,
               data: [...state.data, action.payload],
               loading: false,
             };
         case 'CREATE_INVENTORY_ERROR':
            return {
              ...state,
              error: action.payload || "Failed to create inventory item",
              loading: false,
            };
         case 'UPDATE_INVENTORY_SUCCESS': 
         return {
           ...state,
           data: state.data.map((inventory) =>
            inventory.id === action.payload.id ? action.payload : inventory
           ),
           loading: false,
         };
         case 'UPDATE_INVENTORY_ERROR': 
         return {
           ...state,
           error: action.payload || "Failed to update inventory item",
           loading: false,
         };
         case 'DELETE_INVENTORY_SUCCESS':
            return {
              ...state,
              data: state.data.filter((inventory) => inventory.id !== action.payload),
              loading: false,
            };
         case 'DELETE_INVENTORY_ERROR':
           return {
             ...state,
             error: action.payload || "Failed to delete inventory item",
             loading: false,
           };
        default:
         return state;
    }
};
export default inventoryReducer;