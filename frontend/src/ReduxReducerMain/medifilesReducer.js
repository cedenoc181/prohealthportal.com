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
        };
        case 'SET_SELECTED_MEDIFILE':
          return {
            ...state,
            selectedMedifile: action.payload,
          };
      // Add more actions here...
      default:
        return state;
    }
  };
  
  export default medifilesReducer;