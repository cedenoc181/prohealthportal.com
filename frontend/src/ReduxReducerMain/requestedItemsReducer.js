const initialRequestedItemsState = {
    data: [],
    loading: false,
    error: null
  };
  
  const requestedItemsReducer = (state = initialRequestedItemsState, action) => {
      switch (action.type) {
          case 'FETCH_REQUESTED_ITEMS_SUCCESS':
              return {
                  ...state,
                  data: action.payload,
                  loading: false,
              };
          case 'FETCH_REQUESTED_ITEMS_ERROR':
              return {
                  ...state,
                  loading: false,
                  error: action.payload,
              };
           case 'CREATE_REQUESTED_ITEMS_SUCCESS':
               return {
                 ...state,
                 data: [...state.data, action.payload],
                 loading: false,
               };
           case 'CREATE_REQUESTED_ITEMS_ERROR':
              return {
                ...state,
                error: action.payload,
                loading: false,
              };
           case 'UPDATE_REQUESTED_ITEMS_SUCCESS': 
           return {
                 ...state,
                 data: state.data.map((requestedItems) =>
                 requestedItems.id === action.payload.id ? action.payload : requestedItems
             ),
             loading: false,
           };
           case 'UPDATE_REQUESTED_ITEMS_ERROR': 
           return {
             ...state,
             error: action.payload,
             loading: false,
           };
           case 'DELETE_REQUESTED_ITEMS_SUCCESS':
              return {
                ...state,
                data: state.data.filter((requestedItems) => requestedItems.id !== action.payload),
                loading: false,
              };
           case 'DELETE_REQUESTED_ITEMS_ERROR':
             return {
               ...state,
               error: action.payload,
               loading: false,
             };
          default:
           return state;
      }
  };
  export default requestedItemsReducer;