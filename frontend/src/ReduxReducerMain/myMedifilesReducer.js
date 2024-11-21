const initialMyMedifilesState = {
    data: [],
    loading: false,
    errror: null,
    selectedMyMedifile: null,
};

const medifilesReducer = (state = initialMyMedifilesState, action) => {
    switch (action.type) {
      case 'FETCH_MY_MEDIFILES_SUCCESS':
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      case 'FETCH_MY_MEDIFILES_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'CREATE_MY_MEDIFILE_SUCCESS':
        return {
          ...state,
          data: [...state.data, action.payload],
        };
        case 'CREATE_MY_MEDIFILE_ERROR':
            return {
              ...state,
              error: action.payload,
            };
          case 'UPDATE_MY_MEDIFILE_SUCCESS':
            return {
              ...state,
              data: state.data.map((myMedifile) =>
                myMedifile.id === action.payload.id ? action.payload : myMedifile
              ),
            };
          case 'UPDATE_MY_MEDIFILE_ERROR':
            return {
              ...state,
              error: action.payload,
            };
          case 'DELETE__MY_MEDIFILE_SUCCESS':
            return {
              ...state,
              data: state.data.filter((myMedifile) => myMedifile.id !== action.payload),
            };
          case 'DELETE_MY_MEDIFILE_ERROR':
            return {
              ...state,
              error: action.payload,
            };
        case 'SET_SELECTED_MY_MEDIFILE':
          return {
            ...state,
            selectedMyMedifile: action.payload,
          };
      // Add more actions here...
      default:
        return state;
    }
  };
  
  export default medifilesReducer;