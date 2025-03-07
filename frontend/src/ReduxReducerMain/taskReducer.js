const initialTaskState = {
    tasks: [],
    loading: false,
    error: null
  };
  
  const taskReducer = (state = initialTaskState, action) => {
      switch (action.type) {
          case 'FETCH_TASK_SUCCESS':
              return {
                  ...state,
                  tasks: action.payload,
                  loading: false,
              };
          case 'FETCH_TASK_ERROR':
              return {
                  ...state,
                  loading: false,
                  error: action.payload,
              };
           case 'CREATE_TASK_SUCCESS':
               return {
                 ...state,
                 tasks: [...state.data, action.payload],
                 loading: false,
               };
           case 'CREATE_TASK_ERROR':
              return {
                ...state,
                error: action.payload,
                loading: false,
              };
           case 'UPDATE_TASK_SUCCESS': 
           return {
             ...state,
             tasks: state.tasks.map((task) =>
              task.id === action.payload.id ? action.payload : task
             ),
             loading: false,
           };
           case 'UPDATE_TASK_ERROR': 
           return {
             ...state,
             error: action.payload,
             loading: false,
           };
           case 'DELETE_TASK_SUCCESS':
              return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
                loading: false,
              };
           case 'DELETE_TASK_ERROR':
             return {
               ...state,
               error: action.payload,
               loading: false,
             };
          default:
           return state;
      }
  };
  export default taskReducer;