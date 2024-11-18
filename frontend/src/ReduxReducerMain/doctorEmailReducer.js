  // doctorEmailReducer.js
  
  const initialState = {
    data: [],
    loading: false,
    error: null,
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
          loading: false,
          error: action.payload,
        };
      case 'CREATE_DOCTOR_EMAIL_SUCCESS':
        return {
          ...state,
          data: [...state.data, action.payload],
        };
      case 'CREATE_DOCTOR_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      case 'UPDATE_DOCTOR_EMAIL_SUCCESS':
        return {
          ...state,
          data: state.data.map((email) =>
            email.id === action.payload.id ? action.payload : email
          ),
        };
      case 'UPDATE_DOCTOR_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      case 'DELETE_DOCTOR_EMAIL_SUCCESS':
        return {
          ...state,
          data: state.data.filter((email) => email.id !== action.payload),
        };
      case 'DELETE_DOCTOR_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default doctorEmailReducer;