// userReducer.js

const initialState = {
  data: null,
  medifileData: [],
  loading: false,
  error: null,
  selectedUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        allUserData: action.payload,
        loading: false,
      };
    case "FETCH_USERS_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "CREATE_USER_SUCCESS":
      return {
        ...state,
        data: [...state, action.payload],
        loading: false,
      };
    case "CREATE_USER_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "CREATE_USER_PATIENT_TEMP_SUCCESS":
      return {
        ...state,
        error: [...state, action.payload],
        loading: false,
      };
    case "CREATE_USER_PATIENT_TEMP_ERROR":
      return {
        ...state,
        error: action.payload,
        laoding: false,
      };
    case "CREATE_USER_DOCTOR_TEMP_SUCCESS":
      return {
        ...state,
        error:[...state, action.payload],
        loading: false,
      };
    case "CREATE_USER_DOCTOR_TEMP_ERROR":
      return {
        ...state,
        error: action.payload,
        laoding: false,
      };
      case "CREATE_USER_MEDIFILE_SUCCESS":
        return {
          ...state,
          medifileData: [...state.medifileData, action.payload],
          loading: false,
        };
      case "CREATE_USER_MEDIFILE_ERROR":
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        data: state.data.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        loading: false,
      };
    case "UPDATE_USER_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        data: state.data.filter((user) => user.id !== action.payload),
        loading: false,
      };
    case "DELETE_USER_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // user account login
    case "FETCH_USER_DATA_SUCCESS":
      console.log(action.payload);
      return {
        ...state,
        data: action.payload, // Ensure this updates the `user` data correctly
        loading: false,
      };

    case "FETCH_USER_DATA_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState, // Reset to initial state
      };
    case "SET_SELECTED_USER":
      return {
        ...state,
        selectedUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
