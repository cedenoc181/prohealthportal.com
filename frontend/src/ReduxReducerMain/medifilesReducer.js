const initialMedifilesState = {
    data: [],
    loading: false,
    errror: null,
    selectedMedifile: null,
};

const medifilesReducer = (state = initialMedifilesState, action) => {
    switch (action.type) {
      case 'FETCH_MEDIFILES_SUCCESS':
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      case 'FETCH_MEDIFILES_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'CREATE_MEDIFILE_SUCCESS':
        return {
          ...state,
          data: [...state.data, action.payload],
          loading: false,
        };
        case 'CREATE_MEDIFILE_ERROR':
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
          case 'UPDATE_MEDIFILE_SUCCESS': 
          return {
            ...state,
            data: state.data.map((medifile) =>
              medifile.id === action.payload.id ? action.payload : medifile
            ),
            loading: false,
          };
          case 'UPDATE_MEDIFILE_ERROR': 
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
          case 'DELETE_MEDIFILE_SUCCESS':
            return {
              ...state,
              data: state.data.filter((medifile) => medifile.id !== action.payload),
              loading: false,
            };
            case 'DELETE_MEDIFILE_ERROR':
              return {
                ...state,
                error: action.payload,
                loading: false,
              }
        case 'SET_SELECTED_MEDIFILE':
          return {
            ...state,
            selectedMedifile: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default medifilesReducer;