const initialTaskContentState = {
    data: [],
    loading: false,
    error: null
  };
  
  const taskContentReducer = (state = initialTaskContentState, action) => {
      switch (action.type) {
          case 'FETCH_TASK_CONTENT_SUCCESS':
              return {
                  ...state,
                  data: action.payload,
                  loading: false,
              };
          case 'FETCH_TASK_CONTENT_ERROR':
              return {
                  ...state,
                  loading: false,
                  error: action.payload,
              };
           case 'CREATE_TASK_CONTENT_SUCCESS':
               return {
                 ...state,
                 data: [...state.data, action.payload],
                 loading: false,
               };
           case 'CREATE_TASK_CONTENT_ERROR':
              return {
                ...state,
                error: action.payload,
                loading: false,
              };
           case 'UPDATE_TASK_CONTENT_SUCCESS': 
           return {
             ...state,
             data: state.data.map((taskContent) =>
                taskContent.id === action.payload.id ? action.payload : taskContent
             ),
             loading: false,
           };
           case 'UPDATE_TASK_CONTENT_ERROR': 
           return {
             ...state,
             error: action.payload,
             loading: false,
           };
           case 'DELETE_TASK_CONTENT_SUCCESS':
              return {
                ...state,
                data: state.data.filter((taskContent) => taskContent.id !== action.payload),
                loading: false,
              };
           case 'DELETE_TASK_CONTENT_ERROR':
             return {
               ...state,
               error: action.payload,
               loading: false,
             };
          default:
           return state;
      }
  };
  export default taskContentReducer;