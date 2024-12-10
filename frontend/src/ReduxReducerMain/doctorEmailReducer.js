  // doctorEmailReducer.js
  
  const initialState = {
    data: [],
    loading: false,
    error: null,
    selectedDrEmail: null,
  };
  
  const doctorEmailReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DOCTOR_EMAILS_SUCCESS':
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      case 'FETCH_DOCTOR_EMAILS_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case 'CREATE_DOCTOR_EMAIL_SUCCESS':
        return {
          ...state,
          data: [...state.data, action.payload],
          loading: false,
        };
      case 'CREATE_DOCTOR_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case 'UPDATE_DOCTOR_EMAIL_SUCCESS':
        return {
          ...state,
          data: state.data.map((email) =>
            email.id === action.payload.id ? action.payload : email
          ),
          loading: false,
        };
      case 'UPDATE_DOCTOR_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case 'DELETE_DOCTOR_EMAIL_SUCCESS':
        return {
          ...state,
          data: state.data.filter((email) => email.id !== action.payload),
          loading: false,
        };
      case 'DELETE_DOCTOR_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
        case 'SET_SELECTED_DR_EMAIL':
          return {
            ...state,
            selectedDrEmail: action.payload,
            loading: false,
          };
      default:
        return state;
    }
  };
  
  export default doctorEmailReducer;