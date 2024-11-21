  // myEmailTemplateReducer.js
  
  const initialState = {
    data: [],
    loading: false,
    error: null,
    selectedMyEmail: null,
  };
  
  const myEmailTemplateReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_MY_EMAILS_SUCCESS':
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      case 'FETCH_MY_EMAILS_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'CREATE_MY_EMAIL_SUCCESS':
        return {
          ...state,
          data: [...state.data, action.payload],
        };
      case 'CREATE_MY_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      case 'UPDATE_MY_EMAIL_SUCCESS':
        return {
          ...state,
          data: state.data.map((email) =>
            email.id === action.payload.id ? action.payload : email
          ),
        };
      case 'UPDATE_MY_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      case 'DELETE__MY_EMAIL_SUCCESS':
        return {
          ...state,
          data: state.data.filter((email) => email.id !== action.payload),
        };
      case 'DELETE_MY_EMAIL_ERROR':
        return {
          ...state,
          error: action.payload,
        };
        case 'SET_SELECTED_MY_EMAIL':
          return {
            ...state,
            selectedMyEmail: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default myEmailTemplateReducer;