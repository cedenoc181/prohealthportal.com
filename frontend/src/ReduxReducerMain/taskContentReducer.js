const initialTaskContentState = {
    taskContents: [],
    loading: false,
    error: null
  };
  
  const taskContentReducer = (state = initialTaskContentState, action) => {
      switch (action.type) {
          case 'FETCH_TASK_CONTENT_SUCCESS':
              return {
                  ...state,
                  taskContents: action.payload,
                  loading: false,
              };
          case 'FETCH_TASK_CONTENT_ERROR':
              return {
                  ...state,
                  loading: false,
                  error: action.payload || "Failed to fetch Task Content"
              };
           case 'CREATE_TASK_CONTENT_SUCCESS':
               return {
                 ...state,
                 taskContents: [...state.taskContents, action.payload],
                 loading: false,
               };
           case 'CREATE_TASK_CONTENT_ERROR':
              return {
                ...state,
                error: action.payload || "Failed to create Task Content",
                loading: false,
              };
           case 'UPDATE_TASK_CONTENT_SUCCESS': 
           return {
             ...state,
             taskContents: state.taskContents.map((taskContent) =>
                taskContent.id === action.payload.id ? {
                  ...taskContent,
                  task_data: {
                    ...taskContent.task_data,
                    ...action.payload.task_data
                  }
                }  : taskContent
             ),
             loading: false,
           };
           case 'UPDATE_TASK_CONTENT_ERROR': 
           return {
             ...state,
             error: action.payload || "Failed to update Task Content",
             loading: false,
           };
           case 'DELETE_TASK_CONTENT_SUCCESS':
              return {
                ...state,
                taskContents: state.taskContents.filter((taskContent) => taskContent.id !== action.payload),
                loading: false,
              };
           case 'DELETE_TASK_CONTENT_ERROR':
             return {
               ...state,
               error: action.payload || "Failed to delete Task Content",
               loading: false,
             };
          default:
           return state;
      }
  };
  export default taskContentReducer;