  // patientEmailReducer.js
  
  const initialState = {
    data: [],
    loading: false,
    error: null,
    selectedPxEmail: null,
  };
  
  const patientEmailReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PATIENT_EMAILS_SUCCESS':
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      case 'FETCH_PATIENT_EMAILS_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'CREATE_PATIENT_EMAIL_SUCCESS':
        return {
          ...state,
          data: [...state.data, action.payload],
          loading: false,
        };
      case 'CREATE_PATIENT_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case 'UPDATE_PATIENT_EMAIL_SUCCESS':
        return {
          ...state,
          data: state.data.map((email) =>
            email.id === action.payload.id ? action.payload : email
          ),
          loading: false,
        };
      case 'UPDATE_PATIENT_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case 'DELETE_PATIENT_EMAIL_SUCCESS':
        return {
          ...state,
          data: state.data.filter((email) => email.id !== action.payload),
          loading: false,
        };
      case 'DELETE_PATIENT_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
        case 'SET_SELECTED_PX_EMAIL':
          return {
            ...state,
            selectedPxEmail: action.payload,
            loading: false,
          };
      default:
        return state;
    }
  };
  
  export default patientEmailReducer;