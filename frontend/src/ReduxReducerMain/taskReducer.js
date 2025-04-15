const initialTaskState = {
    data: [],
    loading: false,
    error: null
  };
  
  const taskReducer = (state = initialTaskState, action) => {
      switch (action.type) {
          case 'FETCH_TASK_SUCCESS':
              return {
                  ...state,
                  data: action.payload,
                  loading: false,
              };
          case 'FETCH_TASK_ERROR':
              return {
                  ...state,
                  loading: false,
                  error: action.payload || "Failed to fetch Task",
              };
           case 'CREATE_TASK_SUCCESS':
               return {
                 ...state,
                 data: [...state.data, action.payload],
                 loading: false,
               };
           case 'CREATE_TASK_ERROR':
              return {
                ...state,
                error: action.payload || "Failed to create Task",
                loading: false,
              };
           case 'UPDATE_TASK_SUCCESS': 
           return {
             ...state,
             data: state.data.map((task) =>
              task.id === action.payload.id ?  {
                ...task,
                column_names: {
                  ...task.column_names,
                  ...action.payload.column_names
                }
              } : task
             ),
             loading: false,
           };
           case 'UPDATE_TASK_ERROR': 
           return {
             ...state,
             error: action.payload || "Failed to update Task",
             loading: false,
           };
           case 'DELETE_TASK_SUCCESS':
              return {
                ...state,
                data: state.data.filter((task) => task.id !== action.payload),
                loading: false,
              };
           case 'DELETE_TASK_ERROR':
             return {
               ...state,
               error: action.payload || "Failed to delete Task",
               loading: false,
             };
          default:
           return state;
      }
  };
  export default taskReducer;